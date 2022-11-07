const fetch = require('node-fetch');
const {phyLogin} = require('./login');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;

async function phyExpt(username, password='123456') {
    const cookie = await phyLogin(username, password);
    const url = "http://phy.hdu.edu.cn/phymember/expt_schedule_student.jspx";
    const request = await fetch(url, {
      credentials: 'include',//允许携带cookie but node-fetch does not support mode, cache or credentials options
      headers: {
        'Host': 'phy.hdu.edu.cn',
        'Origin': 'http://phy.hdu.edu.cn',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
        'Referer': ' http://phy.hdu.edu.cn/phymember/expt_schedule_student.jspx',
        'Cookie': cookie
      }
    });
    let html = await request.text();
    html = html.replace(/<html\s.*?>/g, "<html>");
    const doc = new dom().parseFromString(html, 'text/xml');

    const expts = xpath.select("/html/body/div[2]/div[2]/div[4]/table/tbody/tr/td", doc);
    const courses = [];
    let course={};
    expts.forEach((items, indexs) => {
        const dictNames = ['id','course','teacher','group','place','time','status','score','detail','option'];
        course[dictNames[(indexs)%10]] = items.textContent;
        if(indexs%10==9){
          courses.push(course); 
          course = {};
        }
    });

    return courses
}

module.exports={
  phyExpt
}
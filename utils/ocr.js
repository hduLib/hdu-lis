const fetch = require('node-fetch');
const FormData = require('form-data');     

async function ocr(img){
    const form = new FormData();
    form.append("file", img, "img.jpg");
    const request = await fetch('https://aicode.my-youth.cn/up_file',{
      method: 'POST',
      body: form,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
        'Authorization': 'Basic YWRtaW46MTc0NDQzNzMzMw==',
      }
    });
    const res = await request.json();
    return res;
}

module.exports = {
  ocr
}
const { sklLogin } = require("./login.js");
const { getRandomString } = require("../utils/random.js");
const fetch = require('node-fetch');


async function sklCourses(username,password) {
  const token = await sklLogin(username,password)
  const date = new Date(new Date().getTime()-(3600*1000*24* (new Date().getDay()-1)));
  const url = "https://skl.hdu.edu.cn/api/course?startTime="+date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString();
  console.log(url);
  const res = await fetch(url,{
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
      'skl-ticket': getRandomString(21)
    }
  })
  let courses = await res.json();
  let map = new Map();
  (courses.list).forEach((item,index)=>{
    if (!map.has(item.courseName) && item.weekDay!=6 && item.weekDay!=7) {
      map.set(item.courseName,item)
    }
  })
  courses.list = [...map.values()];
  return courses
}

async function sklTodayCourses(username,password) {
  const cousers = (await sklCourses(username,password)).list;
  const todayCourse = [];
  cousers.forEach((course) => {
    if(course.weekDay==new Date().getDay()){
      todayCourse.push(course);
    }
  })
  return todayCourse
}

async function sklNowCourses(username,password) {
  const cousers = await sklTodayCourses(username,password);
  const NowCourse = [];
  const startTime = [[8,5],[8,55],[10,0],[10,50],[11,40],[13,30],[14,20],[15,15],[16,5],[18,30]];
  cousers.forEach((course) => {
    if(compareNowTime(startTime[course.startSection-1])){
      NowCourse.push(course);
    }
  })
  return NowCourse
}

function compareNowTime(time){
  const nowTime = new Date();
  const time2 = nowTime.getHours()*60+nowTime.getMinutes();
  const time1 = time[0]*60+time[1];
  if(time1<time2){
    return false;
  }else{
    return true;
  }
}

module.exports = {
  sklCourses,
  sklTodayCourses,
  sklNowCourses
}


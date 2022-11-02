const { sklLogin } = require("./login.js");
const { getRandomString } = require("../utils/random.js");
const fetch = require('node-fetch');
const {phyExpt} = require('../hdu/phy/expt.js');
const getChineseDate = require('../utils/date.js');

async function sklCourses(username,password,withExpt=false,exptPwd="123456") {
  try{
    const token = await sklLogin(username,password)
    const date = new Date(getChineseDate().getTime()-(3600*1000*24* (getChineseDate().getDay()-1)));
    const url = "https://skl.hdu.edu.cn/api/course?startTime="+date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString();
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
    // 集成大物实验课程
    if(!!withExpt){
      
      for(let i in courses.list) {
        if(courses.list[i].classRoom=="大学物理实验中心"){
          const expts = await phyExpt(username,exptPwd);
          const reg = /第(.*)周：/;
          expts.forEach((expt,index)=>{
            const weekDay = (reg.exec(expt.time))[1];
            if(weekDay==courses.week.toString()){
              courses.list[i].courseName = expt.course;
              courses.list[i].teacherName = expt.teacher;
              courses.list[i].classRoom = expt.place;
            }
          })
        }
      }
    }
    return courses
  }catch(err){
    console.log(err)
    return err
  }
}

async function sklTodayCourses(username,password,withExpt=false,exptPwd="123456") {
  try{
    const cousers = (await sklCourses(username,password,withExpt,exptPwd)).list;
    const todayCourse = [];
    cousers.forEach((course) => {
      if(course.weekDay==getChineseDate().getDay()){
        todayCourse.push(course);
      }
    })
    return todayCourse
  }catch(err){
    console.log(err)
    return err
  }
}

async function sklNowCourses(username,password,withExpt=false,exptPwd="123456") {
  try{
    const cousers = await sklTodayCourses(username,password,withExpt,exptPwd);
    const NowCourse = [];
    const startTime = [[8,5],[8,55],[10,0],[10,50],[11,40],[13,30],[14,20],[15,15],[16,5],[18,30]];
    cousers.forEach((course) => {
      if(compareNowTime(startTime[course.startSection-1])){
        NowCourse.push(course);
      }
    })
    return NowCourse
  }catch(err){
    console.log(err)
    return err
  }
}

function compareNowTime(time){
  const nowTime = getChineseDate();
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


const { sklLogin } = require("./login.js");
const { getRandomString } = require("../utils/random.js");
const fetch = require('node-fetch');
const getChineseDate = require('../utils/date.js');

async function sklCourses(username,password) {
    const token = await sklLogin(username,password)
    const date = new Date(getChineseDate().getTime()-(3600*1000*24* ((getChineseDate().getDay()==0?7:getChineseDate().getDay())-1)));
    const url = "https://skl.hdu.edu.cn/api/course?startTime="+date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString();
    const res = await fetch(url,{
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
        'skl-ticket': getRandomString(21)
      }
    })
    let i = await res.json();
    return i;
}

async function sklTodayCourses(username,password) {
    const i = (await sklCourses(username,password));
    let l = {};
    i.list.forEach(o=>{
        l[o.courseId] = o
    })

    let classes =[]
    let detail={}
    let active= getChineseDate().getDay()==0?6:getChineseDate().getDay()-1;
    
    function forenoon() {
      return classes.filter(t=>t.startSection <= 5 && t.weekDay - 1 === active).sort((t,e)=>t.startSection - e.startSection)
    }
    function afternoonClasses() {
      return classes.filter(t=>t.startSection >= 6 && t.startSection <= 9 && t.weekDay - 1 === active).sort((t,e)=>t.startSection - e.startSection)
    }
    function nightClasses() {
      return classes.filter(t=>t.startSection > 9 && t.weekDay - 1 === active).sort((t,e)=>t.startSection - e.startSection)
    }

    detail = i;



    classes = setCurrentClass(i);
    i.list = [...forenoon(),...afternoonClasses(),...nightClasses()];
    return i
}

async function sklNowCourses(username,password) {
    const cousers = await sklTodayCourses(username,password);
    const NowCourse = [];
    const startTime = [[8,5],[8,55],[10,0],[10,50],[11,40],[13,30],[14,20],[15,15],[16,5],[18,30]];
    cousers.list.forEach((course) => {
      if(compareNowTime(startTime[course.startSection-1])){
        NowCourse.push(course);
      }
    })
    cousers.list = NowCourse;
    return cousers
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

function setCurrentClass(t) {
  const e = t.week;
  return t.list.filter(s=>{
      let r = !0;
      return s.period === "\u5355" ? r = e % 2 !== 0 : s.period === "\u53CC" && (r = e % 2 === 0),
      e >= s.startWeek && e <= s.endWeek && r
  }
  )
}

module.exports = {
  sklCourses,
  sklTodayCourses,
  sklNowCourses
}


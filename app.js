import { getSchoolCode, setSchoolCode } from './db.mjs';
import { getDateStr, getDate, parseDateStr } from './utils.mjs';
import { getMealInfo } from './api.mjs';
import { printGeupsik } from './printgeupsik.mjs';
import {
  getNextDate,
  getDateNStr,
  getPrevDate,
  getDatePStr,
} from './dates.mjs';
let dateInput = document.querySelector('#select-date');
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
function getSchoolQuery() {
  if (params['schoolcode'] != undefined) {
    let schoolQuery = params['schoolcode'];
    return schoolQuery;
  }
  return getSchoolCode();
}
function getOfficeQuery() {
  if (params['officecode'] != undefined) {
    let officeQuery = params['officecode'];
    return officeQuery;
  }
  return localStorage.getItem('officecode');
}
function getDateQuery() {
  if (params['date'] != undefined) {
    let dateQuery = params['date'].split('-');
    const year = dateQuery[0];
    const month = dateQuery[1];
    const date = dateQuery[2];
    dateInput.value = `${year}-${month}-${date}`;
    return { year, month, date };
  }
  return getDate();
}
//document.documentElement.classList.add('dark');
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.toggle('dark');
}

let schoolCode = getSchoolCode();
let officeCode = localStorage.getItem('officecode');
if (!schoolCode && getOfficeQuery() === localStorage.getItem('officecode')) {
  location.href = '/first';
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

var agent = navigator.userAgent.toLowerCase();
if (
  (navigator.appName == 'Netscape' &&
    navigator.userAgent.search('Trident') != -1) ||
  agent.indexOf('msie') != -1
) {
  console.error('ieieieieieieieieieieieieieieieie');
  alert('익스플로러 쓰지마세요');
  window.location = 'microsoft-edge:' + window.location.href;
}

printGeupsik();

if (typeof navigator.share === 'undefined') {
  // 공유하기 버튼을 지원하지 않는 경우에 대한 폴백 처리
  document.getElementById('sharebutton').disabled = true;
  document.getElementById('sharebutton').innerHTML = 'ㅤ';
}
document.getElementById('sharebutton').addEventListener('click', async () => {
  try {
    share();
  } catch (e) {
    console.log('공유 실패' + e);
  }
});
function share() {
  let shortSchool = document
    .getElementById('school-name')
    .innerText.replace(/\🎉/g, '')
    .replace('등', '')
    .replace('학교', '');
  if (shortSchool.includes('초')) {
    shortSchool = shortSchool.replace('서울', '');
  }
  let { year, month, date } = parseDateStr(dateInput.value);
  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }
  window.navigator.share({
    text: `${year}년 ${month}월 ${date}일 ${shortSchool} 급식`, // 공유될 설명
    url: `https://급식.ml/?date=${year}-${month}-${date}&schoolcode=${schoolCode}&officecode=${officeCode}`, // 공유될 URL
  });
}

dateInput.value = getDateStr();

// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};
// Detects if device is in standalone mode
const isInStandaloneMode = () =>
  'standalone' in window.navigator && window.navigator.standalone;

// Checks if should display install popup notification:
if (
  isIos() &&
  !isInStandaloneMode() &&
  localStorage.getItem('homescreenbanner') !== 'true'
) {
  localStorage.setItem('homescreenbanner', 'true');
  document.getElementsByTagName('footer')[0].innerHTML = `${
    document.getElementsByTagName('footer')[0].innerHTML
  }<style>
  @keyframes colorChange{
    0%  { color: #8BC34A;}
    25%  { color: #03A9F4;}
    50%  { color: #FF5722;}
    100%{ color: #607D8B;}
  }
  .descAnim765 {
    animation: colorChange 1s ease-out 0s infinite alternate none running;
  }
  </style>
  <div style="margin: 200 auto;text-align:center;overflow:hidden;border-radius:0px;border:0px solid #ff0000;padding:8px;max-width:calc(100% - 16px);width:700px" height:30px;>
    <div class="descAnim765" style="height:20px; display:inline-block;position:relative;vertical-align: middle;padding:3px;font-size:20px;color:#000000;font-weight:normal">앱을 홈 화면에 추가하세요!</div>
    <div class="descAnim765"  style="display:inline-block;position:relative;vertical-align: middle;padding:3px;font-size:11px;color:#000000;font-weight:bold">공유 버튼을 누르고 홈 화면에 추가 버튼을 누르세요!</div>
  </div>`;
}

let geupsik = localStorage.getItem('geupsik');
localStorage.setItem('geupsik', geupsik * 1 + 1);

document.querySelector('#select-date').onchange = function () {
  let dayChosen = parseDateStr(dateInput.value);
  getMealInfo(schoolCode, officeCode, dayChosen);
};

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;
var yDown = null;
function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      /* left swipe */
      let datesplit = dateInput.value.split('-');
      getMealInfo(
        schoolCode,
        officeCode,
        getNextDate(datesplit[0], datesplit[1], datesplit[2]),
      );
      dateInput.value = getDateNStr(datesplit[0], datesplit[1], datesplit[2]);
    } else {
      /* right swipe */
      let datesplit = dateInput.value.split('-');
      getMealInfo(
        schoolCode,
        officeCode,
        getPrevDate(datesplit[0], datesplit[1], datesplit[2]),
      );
      dateInput.value = getDatePStr(datesplit[0], datesplit[1], datesplit[2]);
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}
getMealInfo(getSchoolQuery(), getOfficeQuery(), getDateQuery());

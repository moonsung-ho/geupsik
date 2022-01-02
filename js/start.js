import { getSchoolCode } from '/js/localstorage.mjs';
import { getDateStr, parseDateStr } from '/js/date_utilities.mjs';
import { getMealInfo } from '/js/api.mjs';
import { printNASAPicture } from './printNASAPicture.mjs';
import { getOfficeQuery, getSchoolQuery, getDateQuery } from '/js/getQuery.js';

if (!localStorage.getItem("experimental_beta")) {
  if ((Math.random() * (10 - 1) + 1) === 2) {
    Toastify({
      text: "실험적 베타 기능 대상입니다.",
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: false, // Prevents dismissing of toast on hover
      style: {
        background: "wheat",
      },
      onClick: function () { } // Callback after click
    }).showToast();
    localStorage.setItem("experimental_beta", "true");
  } else {
    localStorage.setItem("experimental_beta", "false");
  }
}

if (localStorage.getItem("experimental_beta") === "true") {
  document.querySelector("head").remove()
  document.querySelector("body").remove()
  document.querySelector("html").innerHTML = `
  <head>
  <link rel="stylesheet" href="/css/style.css" /></head>
  <body>
  <iframe
  src="https://beta-geupsik.netlify.app/"
  frameborder="0"
  allowfullscreen="true"
  allow="web-share"
  sandbox="allow-same-origin allow-scripts"></iframe></body>`
}

if (localStorage.getItem('schoolcode')) {
  var schoolCode = getSchoolCode();
  var officeCode = localStorage.getItem('officecode');
} else {
  var schoolCode = sessionStorage.getItem('schoolcode');
  var officeCode = sessionStorage.getItem('officecode');
}

if (!localStorage.getItem('geupsik')) {
  Toastify({
    text: "스와이프로 날짜를 전환할 수 있습니다!",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "wheat",
    },
    onClick: function () { } // Callback after click
  }).showToast();
}

printNASAPicture();

//url params
export let dateInput = document.querySelector('#select-date');
const urlSearchParams = new URLSearchParams(window.location.search);
export const params = Object.fromEntries(urlSearchParams.entries());

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

dateInput.value = getDateStr();

let geupsik = localStorage.getItem('geupsik');
localStorage.setItem('geupsik', geupsik * 1 + 1);

document.querySelector('#select-date').onchange = function () {
  let dayChosen = parseDateStr(dateInput.value);
  getMealInfo(schoolCode, officeCode, dayChosen);
  window.history.pushState({}, document.title, `?date=${dateInput.value}&schoolcode=${schoolCode}&officecode=${officeCode}`);
};

getMealInfo(getSchoolQuery(), getOfficeQuery(), getDateQuery());

if (schoolCode && officeCode) {
  sessionStorage.setItem('schoolcode', schoolCode);
  sessionStorage.setItem('officecode', officeCode);
} else {
  sessionStorage.setItem('schoolcode', getSchoolQuery());
  sessionStorage.setItem('officecode', getOfficeQuery());
}

export { schoolCode, officeCode };
import { getSchoolCode } from '/js/localstorage.mjs';
import { getDateStr, parseDateStr } from '/js/date_utilities.mjs';
import { getMealInfo } from '/js/api.mjs';
import { printNASAPicture } from './printNASAPicture.mjs';
import { getOfficeQuery, getSchoolQuery, getDateQuery } from '/js/getQuery.js';

export let schoolCode = getSchoolCode();
export let officeCode = localStorage.getItem('officecode');



if (document.querySelector("html").className === "dark") {
  document.querySelector("#github").innerHTML = '<a href="https://github.com/sungho0205/geupsik"><img src="images/github.png" alt="깃허브"></a>'
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

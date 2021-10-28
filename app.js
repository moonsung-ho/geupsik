import { getSchoolCode } from './db.mjs';
import { getDateStr, parseDateStr } from './utils.mjs';
import { getMealInfo } from './api.mjs';
import { printNASAPicture } from './printNASAPicture.mjs';
import { getOfficeQuery, getSchoolQuery, getDateQuery } from './getQuery.js';

printNASAPicture();

//url params
export let dateInput = document.querySelector('#select-date');
const urlSearchParams = new URLSearchParams(window.location.search);
export const params = Object.fromEntries(urlSearchParams.entries());

//다크모드 감지
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.toggle('dark');
}

export let schoolCode = getSchoolCode();
export let officeCode = localStorage.getItem('officecode');
if (!schoolCode && getOfficeQuery() === localStorage.getItem('officecode')) {
  location.href = '/first';
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

dateInput.value = getDateStr();

let geupsik = localStorage.getItem('geupsik');
localStorage.setItem('geupsik', geupsik * 1 + 1);

document.querySelector('#select-date').onchange = function () {
  let dayChosen = parseDateStr(dateInput.value);
  getMealInfo(schoolCode, officeCode, dayChosen);
};

getMealInfo(getSchoolQuery(), getOfficeQuery(), getDateQuery());

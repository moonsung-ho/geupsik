import { getSchoolCode } from './localstorage.mjs';
import { getDateStr, parseDateStr } from './date_utilities.mjs';
import { getMealInfo } from './api.mjs';
import { printNASAPicture } from './printNASAPicture.mjs';
import { getOfficeQuery, getSchoolQuery, getDateQuery } from './getQuery.js';

if (!localStorage.getItem('schoolcode')) {
  location.href = './first';
}

export let schoolCode = getSchoolCode();
export let officeCode = localStorage.getItem('officecode');

printNASAPicture();

//url params
export let dateInput = document.querySelector('#select-date');
const urlSearchParams = new URLSearchParams(window.location.search);
export const params = Object.fromEntries(urlSearchParams.entries());

//다크모드 감지
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.toggle('dark');
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

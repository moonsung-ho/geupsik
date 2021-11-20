import { getSchoolCode } from './localstorage.mjs';
import { getDateStr, parseDateStr } from './date_utilities.mjs';
import { getMealInfo } from './api.mjs';
import { printNASAPicture } from './printNASAPicture.mjs';
import { getOfficeQuery, getSchoolQuery, getDateQuery } from './getQuery.js';
import toast from './toast.js';

export let schoolCode = getSchoolCode();
export let officeCode = localStorage.getItem('officecode');



if (document.querySelector("html").className === "dark") {
  document.querySelector("#github").innerHTML = '<a href="https://github.com/sungho0205/geupsik"><img src="images/github.png" alt="깃허브"></a>'
}

if (location.host.includes('xn--kj0b080b')) {
  Toastify({
    text: "이 도메인은 이제 사용되지 않습니다. 이 팝업을 클릭하면 새로 바뀐 도메인으로 이동합니다.",
    duration: 6000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "tomato",
    },
    onClick: function () { location.href = "https://geupsik.ml" } // Callback after click
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

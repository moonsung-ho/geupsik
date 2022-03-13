import { getSchoolCode } from "/js/localstorage.mjs";
import { getDateStr, parseDateStr } from "/js/date_utilities.mjs";
import { getMealInfo } from "/js/api.mjs";
import { printNASAPicture } from "./printNASAPicture.mjs";
import { getOfficeQuery, getSchoolQuery, getDateQuery } from "/js/getQuery.js";

if (!localStorage.getItem("experimental_beta")) {
  if (Math.random() * (10 - 1) + 1 === 2) {
    Toastify({
      text: "실험적 베타 기능 대상입니다.",
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: false, // Prevents dismissing of toast on hover
      style: {
        background: "wheat"
      },
      onClick: function () {} // Callback after click
    }).showToast();
    localStorage.setItem("experimental_beta", "true");
  } else {
    localStorage.setItem("experimental_beta", "false");
  }
}

if (navigator.userAgent.match(/iPad/i)) {
  Toastify({
    text: "급식 아이패드 앱이 출시되었습니다! (여기를 터치해서 App Store로 이동)",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "wheat"
    },
    onClick: function () {
      location.href =
        "https://apps.apple.com/kr/app/%EA%B8%89%EC%8B%9D/id1613044393?platform=iphone";
    } // Callback after click
  }).showToast();
} else if (navigator.userAgent.match(/Tablet/i)) {
  Toastify({
    text: "급식 안드로이드 앱이 출시되었습니다! (여기를 터치해서 Play Store로 이동)",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "wheat"
    },
    onClick: function () {
      location.href =
        "https://play.google.com/store/apps/details?id=com.sungho0205.geupsik";
    } // Callback after click
  }).showToast();
} else if (navigator.userAgent.match(/Android/i)) {
  Toastify({
    text: "급식 안드로이드 앱이 출시되었습니다! (여기를 터치해서 Play Store로 이동)",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "wheat"
    },
    onClick: function () {
      location.href =
        "https://play.google.com/store/apps/details?id=com.sungho0205.geupsik";
    } // Callback after click
  }).showToast();
} else if (navigator.userAgent.match(/iPhone | iPod/i)) {
  Toastify({
    text: "급식 아이폰 앱이 출시되었습니다! (여기를 터치해서 App Store로 이동)",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "wheat"
    },
    onClick: function () {
      location.href =
        "https://apps.apple.com/kr/app/%EA%B8%89%EC%8B%9D/id1613044393?platform=iphone";
    } // Callback after click
  }).showToast();
}

if (localStorage.getItem("schoolcode")) {
  var schoolCode = getSchoolCode();
  var officeCode = localStorage.getItem("officecode");
} else {
  var schoolCode = sessionStorage.getItem("schoolcode");
  var officeCode = sessionStorage.getItem("officecode");
}

if (!localStorage.getItem("geupsik")) {
  Toastify({
    text: "스와이프 또는 방향키로 날짜를 전환할 수 있습니다!",
    duration: 3000,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: false, // Prevents dismissing of toast on hover
    style: {
      background: "wheat"
    },
    onClick: function () {} // Callback after click
  }).showToast();
}

printNASAPicture();

//url params
export let dateInput = document.querySelector("#select-date");
const urlSearchParams = new URLSearchParams(window.location.search);
export const params = Object.fromEntries(urlSearchParams.entries());

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

dateInput.value = getDateStr();

let geupsik = localStorage.getItem("geupsik");
localStorage.setItem("geupsik", geupsik * 1 + 1);

document.querySelector("#select-date").onchange = function () {
  let dayChosen = parseDateStr(dateInput.value);
  getMealInfo(schoolCode, officeCode, dayChosen);
  window.history.pushState(
    {},
    document.title,
    `?date=${dateInput.value}&schoolcode=${schoolCode}&officecode=${officeCode}`
  );
};

getMealInfo(getSchoolQuery(), getOfficeQuery(), getDateQuery());

if (schoolCode && officeCode) {
  sessionStorage.setItem("schoolcode", schoolCode);
  sessionStorage.setItem("officecode", officeCode);
} else {
  sessionStorage.setItem("schoolcode", getSchoolQuery());
  sessionStorage.setItem("officecode", getOfficeQuery());
}

export { schoolCode, officeCode };

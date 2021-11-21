import { parseDateStr } from '/js/date_utilities.mjs';
import { dateInput, schoolCode, officeCode } from '/js/start.js';

if (typeof navigator.share === 'undefined') {
  // 공유하기 버튼을 지원하지 않는 경우에 대한 폴백 처리
  document.getElementById('sharebutton').disabled = true;
  document.getElementById('sharebutton').innerHTML = 'ㅤ';
} else {
  if (Math.random() * (7 - 1) + 1 <= 2) {
    Toastify({
      text: "🔗 버튼을 눌러서 오늘의 급식 메뉴를 공유해 보세요",
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: false, // Prevents dismissing of toast on hover
      style: {
        background: "wheat",
      },
      onClick: function () { share() } // Callback after click
    }).showToast();
  }
}
document.getElementById('sharebutton').addEventListener('click', async () => {
  try {
    share();
  } catch (e) {
    Toastify({
      text: "공유 실패",
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: false, // Prevents dismissing of toast on hover
      style: {
        background: "tomato",
      },
      onClick: function () { share() } // Callback after click
    }).showToast();
  }
});
function shortenSchoolName() {
  let shortSchool = document
    .getElementById('school-name')
    .innerText.replace(/\🎉/g, '')
    .replace('등', '')
    .replace('학교', '');
  if (shortSchool.includes('초')) {
    shortSchool = shortSchool.replace('서울', '');
  }
  return shortSchool;
}
localStorage.setItem("SHORT_SCHOOL_NAME", shortenSchoolName());
function share() {
  let shortSchool = shortenSchoolName();
  let { year, month, date } = parseDateStr(dateInput.value);
  if (month < 10) {
    month = `${month}`;
  }
  if (date < 10) {
    date = `${date}`;
  }
  window.navigator.share({
    text: `${year}년 ${month}월 ${date}일 ${shortSchool} 급식`,
    url: `https://${window.location.host}/?date=${year}-${month}-${date}&schoolcode=${schoolCode}&officecode=${officeCode}`, // 공유될 URL
  });
}

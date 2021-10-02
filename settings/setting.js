import { schools } from '/schools.mjs';
let schoolCode = null;
let officeCode = null;
function click() {
  while (!schoolCode) {
    const input = prompt(
      '학교 이름을 입력하세요. (ex.답십리초, 신길중, 이화여고)',
    );
    schoolCode = schools[input][0];
    officeCode = schools[input][1];
    if (schoolCode) {
      localStorage.setItem('schoolcode', schoolCode);
    }
    if (officeCode) {
      localStorage.setItem('officecode', officeCode);
    }
  }
  history.back()
}
document
  .getElementById('school-change-button')
  .addEventListener('click', click);

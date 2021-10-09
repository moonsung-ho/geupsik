let schoolCode = null;
let officeCode = null;
function click() {
  let school = prompt('학교 이름을 입력해 주세요');
  fetch(
    `https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${school}&Type=json&KEY=a9a5367947564a1aa13e46ba545de634`,
  )
    .then((res) => res.json())
    .then((json) => {
      schoolCode = json['schoolInfo'][1].row[0]['SD_SCHUL_CODE'];
      officeCode = json['schoolInfo'][1].row[0]['ATPT_OFCDC_SC_CODE'];
      if (schoolCode) {
        localStorage.setItem('schoolcode', schoolCode);
      }
      if (officeCode) {
        localStorage.setItem('officecode', officeCode);
      }
    })
    .catch((err) => {
      click()
    });
}
window.onload = function () {
  document
    .getElementById('school-change-button')
    .addEventListener('click', click);
};

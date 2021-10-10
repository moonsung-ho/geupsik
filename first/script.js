function get() {
  let school = document.getElementById('school').value;
  fetch(
    `https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${school}&Type=json&KEY=a9a5367947564a1aa13e46ba545de634`,
  )
    .then((res) => res.json())
    .then((json) => {
      if (json['schoolInfo'][0].head[0]['list_total_count'] >= 2) {
        document.getElementById('select').hidden = false;
        document.getElementById('select').innerHTML = '';
        let n = 0;
        while (n + 1 <= json['schoolInfo'][0].head[0]['list_total_count']) {
          document.getElementById('select').innerHTML = `${
            document.getElementById('select').innerHTML
          }<option>${json['schoolInfo'][1].row[n]['SCHUL_NM']}</option>`;
          n = n + 1;
        }
        let schoolCode = json['schoolInfo'][1].row[0]['SD_SCHUL_CODE'];
        let officeCode = json['schoolInfo'][1].row[0]['SATPT_OFCDC_SC_CODE'];
        if (schoolCode) {
          localStorage.setItem('schoolcode', schoolCode);
        }
        if (officeCode) {
          localStorage.setItem('officecode', officeCode);
        }
      } else {
        let schoolCode = json['schoolInfo'][1].row[0]['SD_SCHUL_CODE'];
        let officeCode = json['schoolInfo'][1].row[0]['SATPT_OFCDC_SC_CODE'];
        if (schoolCode) {
          localStorage.setItem('schoolcode', schoolCode);
        }
        if (officeCode) {
          localStorage.setItem('officecode', officeCode);
        }
        document.getElementById('select').hidden = true;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
const selectElement = document.querySelector('#select');

selectElement.addEventListener('change', (event) => {
  fetch(
    `https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${event.target.value}&Type=json&KEY=a9a5367947564a1aa13e46ba545de634`,
  )
    .then((res) => res.json())
    .then((json) => {
      let schoolCode = json['schoolInfo'][1].row[0]['SD_SCHUL_CODE'];
      let officeCode = json['schoolInfo'][1].row[0]['SATPT_OFCDC_SC_CODE'];
      if (schoolCode) {
        localStorage.setItem('schoolcode', schoolCode);
      }
      if (officeCode) {
        localStorage.setItem('officecode', officeCode);
      }
    });
});

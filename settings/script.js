window.addEventListener("load", () => {
  if (localStorage.getItem('alergy') === 'true') {
    $(".checkbox").trigger("click");
    localStorage.setItem('alergy', 'true');
    console.log("start")
  }
})

if (localStorage.getItem("alergy_in")) {
  $("#alergyselect").val(localStorage.getItem("alergy_in")).prop("selected", true);
}

document.querySelector(".checkbox").addEventListener("click", () => {
  if (localStorage.getItem("alergy") === "false" || !localStorage.getItem("alergy")) {
    localStorage.setItem("alergy", "true");
  } else if (localStorage.getItem("alergy") === "true") {
    localStorage.setItem("alergy", "false");
  }
})

Toastify({
  text: "'완료'버튼을 누르시면 급식을 보실 수 있습니다!",
  duration: 0,
  close: true,
  gravity: "bottom", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: false, // Prevents dismissing of toast on hover
  style: {
    background: "wheat",
  },
  onClick: function () { } // Callback after click
}).showToast();

document.querySelector("#search").addEventListener("click", get);

function get() {
  let school = document.getElementById('school').value;
  fetch(
    `https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${school}&Type=json&KEY=a9a5367947564a1aa13e46ba545de634`,
  )
    .then((res) => res.json())
    .then((json) => {
      if (json['schoolInfo'][0].head[0]['list_total_count'] >= 2) {
        let schoolCode = json['schoolInfo'][1].row[0]['SD_SCHUL_CODE'];
        let officeCode = json['schoolInfo'][1].row[0]['ATPT_OFCDC_SC_CODE'];
        localStorage.setItem('schoolcode', schoolCode);
        localStorage.setItem('officecode', officeCode);
        document.getElementById('select').hidden = false;
        document.getElementById('select').innerHTML = '';
        let n = 0;
        while (n + 1 <= json['schoolInfo'][0].head[0]['list_total_count']) {
          let officeName = json['schoolInfo'][1].row[n][
            'ATPT_OFCDC_SC_NM'
          ].substr(0, 4);
          if (officeName.includes('북') || officeName.includes('남')) {
            if (officeName === '충청남도') {
              officeName = '충남';
            }
            if (officeName === '충청북도') {
              officeName = '충북';
            }
            if (officeName === '전라남도') {
              officeName = '전남';
            }
            if (officeName === '전라북도') {
              officeName = '전북';
            }
            if (officeName === '경상남도') {
              officeName = '경남';
            }
            if (officeName === '경상북도') {
              officeName = '경북';
            }
          } else {
            officeName = officeName.substr(0, 2);
          }
          document.getElementById('select').innerHTML = `${document.getElementById('select').innerHTML
            }<option>${json['schoolInfo'][1].row[n]['SCHUL_NM']
            }(${officeName})</option>`;
          n = n + 1;
        }

      } else {
        let schoolCode = json['schoolInfo'][1].row[0]['SD_SCHUL_CODE'];
        let officeCode = json['schoolInfo'][1].row[0]['ATPT_OFCDC_SC_CODE'];
        let officeName = json['schoolInfo'][1].row[0][
          'ATPT_OFCDC_SC_NM'
        ].substr(0, 4);
        if (officeName.includes('북') || officeName.includes('남')) {
          if (officeName === '충청남도') {
            officeName = '충남';
          }
          if (officeName === '충청북도') {
            officeName = '충북';
          }
          if (officeName === '전라남도') {
            officeName = '전남';
          }
          if (officeName === '전라북도') {
            officeName = '전북';
          }
          if (officeName === '경상남도') {
            officeName = '경남';
          }
          if (officeName === '경상북도') {
            officeName = '경북';
          }
        } else {
          officeName = officeName.substr(0, 2);
        }
        if (schoolCode) {
          localStorage.setItem('schoolcode', schoolCode);
        }
        if (officeCode) {
          localStorage.setItem('officecode', officeCode);
        }
        document.getElementById('select').innerHTML = `<option>${json['schoolInfo'][1].row[0]['SCHUL_NM']
          }(${officeName})</option>`;
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
const selectElement = document.querySelector('#select');

document.querySelector("#alergyselect").addEventListener("change", (event) => {
  let alergy = event.target.value;
  localStorage.setItem("alergy_in", alergy)
})

selectElement.addEventListener('change', (event) => {
  let school = event.target.value.replace(event.target.value.slice(-4), '');
  let office = event.target.value.slice(-4).replace('(', '').replace(')', '');
  if (office === '경기') {
    office = '경기도';
  }
  if (office === '서울') {
    office = '서울특별시';
  }
  if (office === '인천') {
    office = '인천광역시';
  }
  if (office === '대전') {
    office = '대전광역시';
  }
  if (office === '대구') {
    office = '대구광역시';
  }
  if (office === '울산') {
    office = '울산광역시';
  }
  if (office === '부산') {
    office = '부산광역시';
  }
  if (office === '광주') {
    office = '광주광역시';
  }
  if (office === '세종') {
    office = '세종특별자치시';
  }
  if (office === '강원') {
    office = '강원도';
  }
  if (office === '충남') {
    office = '충청남도';
  }
  if (office === '충북') {
    office = '충청북도';
  }
  if (office === '전북') {
    office = '전라북도';
  }
  if (office === '전남') {
    office = '전라남도';
  }
  if (office === '경북') {
    office = '경상북도';
  }
  if (office === '경남') {
    office = '경상남도';
  }
  fetch(
    `https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${school}&LCTN_SC_NM=${office}&Type=json&KEY=a9a5367947564a1aa13e46ba545de634`,
  )
    .then((res) => res.json())
    .then((json) => {
      let schoolCode = json['schoolInfo'][1].row[0]['SD_SCHUL_CODE'];
      let officeCode = json['schoolInfo'][1].row[0]['ATPT_OFCDC_SC_CODE'];
      if (schoolCode) {
        localStorage.setItem('schoolcode', schoolCode);
      }
      if (officeCode) {
        localStorage.setItem('officecode', officeCode);
      }
    });
});
if (
  window.matchMedia('(prefers-color-scheme: dark)').matches === true &&
  !localStorage.getItem('theme')
) {
  localStorage.setItem('theme', 'dark');
  document.documentElement.classList.add('dark');
  document.documentElement.classList.toggle('dark');
}
if (localStorage.getItem('theme') === 'dark') {
  document.querySelector('label').click();
  localStorage.setItem('theme', 'dark');
}
function darkModeToggle() {
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.toggle('dark');
  } else {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.toggle('dark');
  }
}

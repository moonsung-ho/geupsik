import findBirthday from './displaybirthday.mjs';

function removeUnusedThings(str) {
  str = str.replace('우유2.', ''); // 우유는 표시 X
  if (str.includes('밥')) {
    str =
      str.slice(0, str.indexOf('밥') + 1) +
      '🍚' +
      str.slice(str.indexOf('밥') + 1, str.length);
  }
  //밥 뒤에 이모지 표시

  str = str.replace(/\*/g, ''); //별표 제거
  str = str.replace('()', ''); // 빈 괄호는 표시 X
  displayAlergy();
  return str;

  function displayAlergy() {
    if (localStorage.getItem("alergy") === 'false' || !localStorage.getItem("alergy")) {
      str = str.replace(
        /[0-9]/g,
        ''
      ); //숫자 제거
      str = str.replace(/\./g, ''); // 불필요한 마침표 제거
    } else if (localStorage.getItem("alergy") === 'true') {
      document.getElementsByClassName('zeroKcal')[0].style.display = 'none';
      console.log(str);
      let menus = str.replaceAll(".", "").split(/[0-9]/g);
      menus = menus.filter(function (item) {
        return item !== null && item !== undefined && item !== '';
      });
      let n = 0;
      while (n < menus.length) {
        str = str.replace(menus[n], menus[n] + "<span>  - </span>");
        n++;
      }
      str = str.replaceAll(".", " ");
      str = str.replaceAll("18", "<span>조개류</span>");
      str = str.replaceAll("17", "<span>오징어</span>");
      str = str.replaceAll("16", "<span>쇠고기</span>");
      str = str.replaceAll("15", "<span>닭고기</span>");
      str = str.replaceAll("14", "<span>호두</span>");
      str = str.replaceAll("13", "<span>아황산염</span>");
      str = str.replaceAll("12", "<span>토마토</span>");
      str = str.replaceAll("11", "<span>복숭아</span>");
      str = str.replaceAll("10", "<span>돼지고기</span>");
      str = str.replaceAll("9", "<span>새우</span>");
      str = str.replaceAll("8", "<span>게</span>");
      str = str.replaceAll("7", "<span>고등어</span>");
      str = str.replaceAll("6", "<span>밀</span>");
      str = str.replaceAll("5", "<span>대두</span>");
      str = str.replaceAll("4", "<span>땅콩</span>");
      str = str.replaceAll("3", "<span>메밀</span>");
      str = str.replaceAll("2", "<span>우유</span>");
      str = str.replaceAll("1", "<span>난류</span>");
    }
  }
}
const getMealInfo = (schoolCode, officeCode, { year, month, date }) => {
  const input = document.querySelector('#select-date');
  findBirthday({ month: input.value.split('-')[1], day: input.value.split('-')[2] })
  //이스터에그
  let easterEgg = 0;
  //og 링크 설정
  let meta = document.createElement('meta');
  meta.property = "og:url";
  meta.id = "og-url";
  meta.content = `${location.protocol}//${location.host}/?date=${year}-${month}-${date}&schoolcode=${schoolCode}&officecode=${officeCode}`;
  //이미 있던 태그 삭제
  if (document.getElementById('og-url')) {
    document.getElementById('og-url').remove();
  }
  document.getElementsByTagName('head')[0].appendChild(meta);

  const requestUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=4c1690204c08404ca7f1775720f17054&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${year}${month}${date}`;
  console.log(requestUrl);
  const mealElement = document.getElementsByClassName('mealElement')[0];
  const kcalElement = document.getElementsByClassName('zeroKcal')[0];
  const schoolNameElement = document.getElementById('school-name');

  fetch(requestUrl)
    .then((res) => res.json())
    .then((json) => {
      //급식이 없을 경우
      if (!('mealServiceDietInfo' in json)) {
        (mealElement.innerHTML = `<br>급식이 <br>없는 날입니다.`),
          (document.title = `급식`);
        kcalElement.innerText = ``;
        schoolNameElement.innerText = localStorage.getItem('schoolname');
        document.title = localStorage.getItem('schoolname') + "의 급식";
      }
      //급식이 있을 경우
      else {
        let meal = json['mealServiceDietInfo'][1].row[0].DDISH_NM
        meal = removeUnusedThings(meal);
        meal = meal.replace("우유<span>  - </span><span>우유</span>", "")
        let index = 0;
        //급식 정보 출력
        document.title = `${json['mealServiceDietInfo'][1].row[0].SCHUL_NM}의 급식`;
        mealElement.innerHTML = meal;
        //칼로리 정보 출력
        kcalElement.innerText = `${json[
          'mealServiceDietInfo'
        ][1].row[0].CAL_INFO.replace('Kcal', '칼로리')}`;
        //학교 이름 출력
        localStorage.setItem('schoolname', json['mealServiceDietInfo'][1].row[0].SCHUL_NM);
        schoolNameElement.innerHTML = `${json['mealServiceDietInfo'][1].row[0].SCHUL_NM}`;
        //이스터 에그
        if (
          json['mealServiceDietInfo'][1].row[0].SCHUL_NM === '서울은평초등학교'
        ) {
          schoolNameElement.onclick = function () {
            easterEgg = easterEgg + 1;
            if (easterEgg * 1 >= 10) {
              swal("무야호!", "success");
            }
          };
        }
      }
    })
    .catch((err) => {
      console.error(err);
      Toastify({
        text: "에러가 발생했습니다.",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        style: {
          background: "tomato",
        },
        onClick: function () { location.reload() } // Callback after click
      }).showToast();
    });
};
export { getMealInfo, removeUnusedThings };

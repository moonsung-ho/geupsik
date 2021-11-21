import { getMealInfo } from './api.mjs';
import {
  getNextDate,
  getNextdateStr,
  getPrevDate,
  getPrevdateStr
} from './date_utilities.mjs';
import { dateInput, schoolCode, officeCode } from '/js/start.js';

window.addEventListener('keyup', checkKey);
function checkKey(e) {
  if (e.keyCode === 39) {
    //left
    let datesplit = dateInput.value.split('-');
    dateInput.value = getNextdateStr(datesplit[0], datesplit[1], datesplit[2]);
    getMealInfo(
      schoolCode,
      officeCode,
      getNextDate(datesplit[0], datesplit[1], datesplit[2])
    );
    window.history.pushState({}, document.title, `?date=${dateInput.value}&schoolcode=${schoolCode}&officecode=${officeCode}`);
  }
  if (e.keyCode === 37) {
    //right
    let datesplit = dateInput.value.split('-');
    dateInput.value = getPrevdateStr(datesplit[0], datesplit[1], datesplit[2]);
    getMealInfo(
      schoolCode,
      officeCode,
      getPrevDate(datesplit[0], datesplit[1], datesplit[2])
    );
    window.history.pushState({}, document.title, `?date=${dateInput.value}&schoolcode=${schoolCode}&officecode=${officeCode}`);
  }
}

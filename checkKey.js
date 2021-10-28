import { getMealInfo } from './api.mjs';
import {
  getNextDate,
  getNextdateStr,
  getPrevDate,
  getPrevdateStr
} from './dates.mjs';
import { dateInput, schoolCode, officeCode } from './app.js';

window.addEventListener('keyup', checkKey);
function checkKey(e) {
  if (e.keyCode === 39) {
    //left
    let datesplit = dateInput.value.split('-');
    getMealInfo(
      schoolCode,
      officeCode,
      getNextDate(datesplit[0], datesplit[1], datesplit[2])
    );
    dateInput.value = getNextdateStr(datesplit[0], datesplit[1], datesplit[2]);
  }
  if (e.keyCode === 37) {
    //right
    let datesplit = dateInput.value.split('-');
    getMealInfo(
      schoolCode,
      officeCode,
      getPrevDate(datesplit[0], datesplit[1], datesplit[2])
    );
    dateInput.value = getPrevdateStr(datesplit[0], datesplit[1], datesplit[2]);
  }
}

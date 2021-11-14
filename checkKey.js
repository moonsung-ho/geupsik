import {
  getNextdateStr,
  getPrevdateStr
} from './date_utilities.mjs';
import { dateInput } from './start.js';

window.addEventListener('keyup', checkKey);
function checkKey(e) {
  if (e.keyCode === 39) {
    //left
    let datesplit = dateInput.value.split('-');
    location.href = `${location.protocol}//${location.host}?date=${getNextdateStr(datesplit[0], datesplit[1], datesplit[2])}`;
  }
  if (e.keyCode === 37) {
    //right
    let datesplit = dateInput.value.split('-');
    location.href = `${location.protocol}//${location.host}?date=${getPrevdateStr(datesplit[0], datesplit[1], datesplit[2])}`;
  }
}

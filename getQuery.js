import { getSchoolCode } from './db.mjs';
import { getDate } from './utils.mjs';
import { params, dateInput } from './app.js';

export function getSchoolQuery() {
  if (params['schoolcode'] != undefined) {
    let schoolQuery = params['schoolcode'];
    return schoolQuery;
  }
  return getSchoolCode();
}
export function getOfficeQuery() {
  if (params['officecode'] != undefined) {
    let officeQuery = params['officecode'];
    return officeQuery;
  }
  return localStorage.getItem('officecode');
}
export function getDateQuery() {
  if (params['date'] != undefined) {
    let dateQuery = params['date'].split('-');
    const year = dateQuery[0];
    const month = dateQuery[1];
    const date = dateQuery[2];
    dateInput.value = `${year}-${month}-${date}`;
    return { year, month, date };
  }
  return getDate();
}

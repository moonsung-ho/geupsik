const getPrevDate = (pyear, pmonth, pdate) => {
  let thisDay = new Date(pyear, pmonth - 1, pdate);
  Date.prototype.subDay = function (days) {
    var day = new Date(this.valueOf());
    day.setDate(day.getDate() - days);
    return day;
  };
  let prevDay = thisDay.subDay(1);
  let year = prevDay.getFullYear();
  let month = `${prevDay.getMonth() + 1}`;
  if (month < 10) {
    month = `0${month}`;
  }
  let date = prevDay.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  return { year, month, date };
};

const getPrevdateStr = (pyear, pmonth, pdate) => {
  const { year, month, date } = getPrevDate(pyear, pmonth, pdate);
  return `${year}-${month}-${date}`;
};

const getNextDate = (nyear, nmonth, ndate) => {
  Date.prototype.addDay = function (days) {
    var day = new Date(this.valueOf());
    day.setDate(day.getDate() + days);
    return day;
  };
  let thisDay = new Date(nyear, nmonth - 1, ndate);
  let nextDay = thisDay.addDay(1);

  let year = nextDay.getFullYear();
  let month = `${nextDay.getMonth() + 1}`;
  if (month < 10) {
    month = `0${month}`;
  }
  let date = nextDay.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  return { year, month, date };
};

const getNextdateStr = (nyear, nmonth, ndate) => {
  const { year, month, date } = getNextDate(nyear, nmonth, ndate);
  return `${year}-${month}-${date}`;
};
const getDate = () => {
  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  if (month < 10) {
    month = `0${month}`;
  }
  let date = today.getDate(); // 날짜
  if (date < 10) {
    date = `0${date}`;
  }
  return { year, month, date };
};
const getDateStr = () => {
  const { year, month, date } = getDate();
  return `${year}-${month}-${date}`;
};

const parseDateStr = (s) => {
  const splitted = s.split('-');
  const year = splitted[0] * 1;
  let month = splitted[1];
  let date = splitted[2];
  return { year, month, date };
};


export { getDate, getDateStr, parseDateStr, getNextDate, getNextdateStr, getPrevDate, getPrevdateStr };

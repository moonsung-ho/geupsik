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
export { getDate, getDateStr, parseDateStr };

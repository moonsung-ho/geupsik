const SCHOOL_CODE = "schoolcode";

const getSchoolCode = () => localStorage.getItem(SCHOOL_CODE);
const setSchoolCode = (schoolCode) =>
  localStorage.setItem(SCHOOL_CODE, schoolCode);
const removeSchoolCode = () => localStorage.removeItem(SCHOOL_CODE);

export {
  getSchoolCode,
  setSchoolCode,
  removeSchoolCode,
};

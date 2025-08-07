const filterOut = (arr, val) =>
  arr.filter((el) => el.toString() !== val?.toString());
export default filterOut;

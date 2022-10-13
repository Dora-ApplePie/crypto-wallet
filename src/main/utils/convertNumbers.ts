const convertNumber = (number: string | number | undefined) => {
  number = Number(number).toFixed(2);
  if (+number >= 1000000000) {
    return (+number / 1000000000).toFixed(1).replace(/\.0$/, "") + "b";
  }
  if (+number >= 1000000) {
    return (+number / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  return number;
};

export default convertNumber;

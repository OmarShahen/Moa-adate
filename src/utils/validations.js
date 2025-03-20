export const isValidURL = (str) => {
    const pattern = /^(https?:\/\/)?([\w\d.-]+)\.([a-z.]{2,6})([/\w\d.-]*)*\/?$/;
    return pattern.test(str);
  }
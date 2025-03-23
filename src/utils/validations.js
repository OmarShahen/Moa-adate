export const isValidURL = (str) => {
    const pattern = /^(https?:\/\/)?([\w\d.-]+)\.([a-z.]{2,6})([/\w\d.-]*)*\/?$/
    return pattern.test(str)
  }

export const isManufactureYearValid = (year) => {

  if (!year || isNaN(year)) {
    return false
  }

  return true 
}


export const isPriceValid = (price) => {
  if (!price || isNaN(price)) return false
  if (price <= 0) return false

  return true
}

export const isNumber = (value) => {
  if (value === "" || value === null || value === undefined) {
    return false
  }

  if (isNaN(value)) {
    return false
  }

  return true
}

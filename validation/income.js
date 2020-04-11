const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateIncome(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.incomeSource = !isEmpty(data.incomeSource) ? data.incomeSource : "";
  data.incomeAmount = !isEmpty(data.incomeAmount) ? data.incomeAmount : "";
// Income Source checks
  if (Validator.isEmpty(data.incomeSource)) {
    errors.incomeSource = "Income Source field is required";
  }  
// Password checks
  if (Validator.isEmpty(data.incomeAmount)) {
    errors.incomeAmount ="Income Amount field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
    };
};
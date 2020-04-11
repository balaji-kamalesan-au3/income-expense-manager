const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateExpense(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.expenseCategory = !isEmpty(data.expenseCategory) ? data.expenseCategory : "";
  data.expenseAmount = !isEmpty(data.expenseAmount) ? data.expenseAmount : "";
// expense Category checks
  if (Validator.isEmpty(data.expenseCategory)) {
    errors.expenseCategory = "expense Category field is required";
  }  
// Password checks
  if (Validator.isEmpty(data.expenseAmount)) {
    errors.expenseAmount ="expense Amount field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
    };
};
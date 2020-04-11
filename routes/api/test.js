const express = require('express');
const router = express.Router();


const ValidateIncome = require('../../validation/income');
const ValidateExpense = require('../../validation/expense');
const User = require('../../models/Users')
const income ={
    incomeSource : "Salary",
    incomeAmount : "400000"
}

const expense = {
    expenseCategory : "Movie",
    expenseAmount : "50000"
}
router.post("/addIncome",(req,res) => {

    const {errors,isValid} = ValidateIncome(income);
    if(!isValid){
        console.log(errors);
        res.status(400).json(errors);
    }

    
    User.findOneAndUpdate({email : req.body.email},{"$push" : {"income" : income }},{"useFindAndModify": false}).then(
        (user)=>{
            
          
                if(!user){
                    res.status(404).json({emailnotfound : "Email Not found"})
                }
                
                else{
                    
                    res.status(200).json({
                        message : "Income Added",
                        success : true,
                        user : user
                    })
                }
             
            
        })
    
})


router.post("/addExpense",(req,res) => {

    const {errors,isValid} = ValidateExpense(expense);
    if(!isValid){
        console.log(errors);
        res.status(400).json(errors);
    }

    
    User.findOneAndUpdate({email : req.body.email},{"$push" : {"expense" : expense }},{"useFindAndModify": false}).then(
        (user)=>{
           
           
                if(!user){
                    res.status(404).json({emailnotfound : "Email Not found"})
                }
                
                else{
                    
                    res.status(200).json({
                        message : "Expense Added",
                        success : true,
                        user : user
                    })
                }
             
            
        })
    
})

module.exports = router
const express = require('express');
const router = express.Router();


const ValidateIncome = require('../../validation/income');
const ValidateExpense = require('../../validation/expense');
const ValidateToken = require("../../validation/validateToken")
const User = require('../../models/Users')


router.post("/getdata",(req,res)=> {

    const {errors,isValid,user} = ValidateToken(req);
    if(!isValid){
        res.status(400).json(errors)
    }
    console.log(user)
    User.findById(user.id).select({"income": 1,"expense" : 1, "_id":0}).then(result => {
        res.status(200).json(result)
    })
    .catch(
        (err) => {
            res.status(400).json(err)
        }
    )
})


router.post("/addIncome",(req,res) => {
    
    
    const {errors,isValid,user} = ValidateToken(req);
    
    let email = null;
    
    if(!isValid){
        console.log(errors);
        res.status(400).json(errors);
    }
    else {

        const {errors,isValid} = ValidateIncome(req.body)

        if(!isValid){
            res.status(400).json({error : "Income data is Invalid"})
        }
        User.findById(user.id).then((user) => {
            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }
            email = user.email
        })
        .then( () => {
            User.findOneAndUpdate({email : email},{"$push" : {"income" : req.body }},{"useFindAndModify": false}).then(
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
    }    
 })

 router.post("/addExpense",(req,res) => {
    
    
    const {errors,isValid,user} = ValidateToken(req);
    
    let email = null;
    
    if(!isValid){
        console.log(errors);
        res.status(400).json(errors);
    }
    else {
        console.log(req.body)
        const {errors,isValid} = ValidateExpense(req.body)
        console.log(isValid,errors)
        if(!isValid){
            res.status(400).json({error : "Income data is Invalid"})
        }
        User.findById(user.id).then((user) => {
            if (!user) {
                res.status(404).json({ emailnotfound: "Email not found" });
            }
            email = user.email
        })
        .then( () => {
            User.findOneAndUpdate({email : email},{"$push" : {"expense" : req.body }},{"useFindAndModify": false}).then(
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
                .catch(
                    (err) => {
                        res.status(400).json({error : err})
                    }
                )
        })
        .catch(
            (err) => {
                res.status(400).json({error : "Cant add",err})
            }
        )
    }    
 })


 

module.exports = router
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports ={
    register:(req,res)=>{
        User.findOne({email: req.body.email})
            .then((result) =>{
                console.log(result)
                if(result){
                    if(result.email === req.body.email){
                        res.status(400).json({errors: {email: {message: "email already in use"}}});
                        return
                    }
                }
                else{
                    const user = new User(req.body);
                    user.save()
                        .then(result =>{
                            const userToken = jwt.sign({id: result.id}, process.env.SECRET_KEY)
                                res.cookie("userToken", userToken, process.env.SECRET_KEY,{
                                httpOnly: true,
                                expires: new Date(Date.now() + 90000000)
                            })
                            res.json({
                                msg: "registration successful",
                                email: result.email
                            })
                        })
                        .catch(err =>{
                            console.log("error saving new user")
                            res.status(400).json(err);
                        })
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(400).json(err);
            })
    },
    login:(req,res) =>{
        if(!req.body.email){
            res.status(400).json({error: "please enter email"})
            return;
        }
        if(!req.body.password){
            res.status(400).json({error: "please enter password"})
            return;
        }
        User.findOne({email: req.body.email})
            .then((result) =>{
                if(result === null){
                    res.status(400).json({error: "No User Found"})
                    return;
                }
                const passwordValid = bcrypt.compareSync(req.body.password, result.password)
                if(passwordValid !== true){
                    res.status(400).json({error: "invalid pass"})
                    return
                }
                else{
                    const userToken = jwt.sign({id: result.id}, process.env.SECRET_KEY)
                    res.cookie("userToken", userToken, process.env.SECRET_KEY,{
                        httpOnly: true,
                        expires: new Date(Date.now() + 90000000)
                    })
                    res.json({
                        msg: "login successful",
                        email: result.email
                    })
                }
            })
            .catch((err) =>{
                res.status(400).json({error: "email not found"})
                console.log(err)
            })
    },
    logout:(req,res)=>{
        res.clearCookie("userToken");
        res.json({msg: "logout successful"})
    },
    getLoggedUser: (req,res) =>{
        // const decodedJWT = jwt.decode(req.cookies.userToken,{
        //     complete: true
        // })
        User.findOne({_id: req.jwtpayload.id})
            .then(result =>{
                res.json(result);
            })
            .catch(err=>{
                console.log(err);
            })
    },
    getOneUserById:(req,res)=>{
        User.findById(req.params.id)
            .then((result)=>{
                res.json(result)
            })
            .catch((err)=>{
                console.log(err)
                res.json(err)
            })
    },
    deleteAllUsers:(req,res)=>{
        User.deleteMany({})
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
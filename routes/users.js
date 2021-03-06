const express=require('express');
const router=express.Router();

const User=require('../models/user');
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const nodemailer = require('nodemailer');


const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

var download = require('download-file')

var fs = require("fs");


/*router.get('/register',function(req,res){
    res.render('regist');
});*/
//Register
router.post('/register',function(req,res){
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    })
    User.getUserByUsername(newUser.username,function(err,user)
    {
       if(err) throw err;
        if(!user){
           const output=`
                        <b>You've been registered succesfully.</b>
                        <br><h>Contact Details:
                        </h>
                        <ul>
                        <li>Name: ${newUser.name}
                        </li>
                        <li>Email: ${newUser.email}
                        </li>
                        <li>Username: ${newUser.username}
                        </li>
                        </ul>
                        `;
           User.addUser(newUser,function(err,user){
           if(err){
            res.json({success:false,msg:'Something went wrong.'});
            console.log('Failed to register');
           }
            else{
            console.log('User registered.')
            res.json({success:true,msg:'Successfully Registered.'});
            //res.redirect('authenticate');

            //nodemailer
                // create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 465,
    auth: {
        user: 'romedy65i@gmail.com',
        pass: 'Anu@123456'
    },
tls:{
    rejectUnauthorized:false
}
});


    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Anant Rungta" <romedy65i@gmail.com>', // sender address
        to: `${newUser.email}`, // list of receivers
        subject: 'Registered Successfully', // Subject line
        text: "You've been registered succesfully.", // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });


           }
         });
        }
        else{
            if(user){
                console.log('user already exist.')
                res.json({success:false,msg:'Username already exist.'});
            }
        }
    });
});


/*router.get('/authenticate',function(req,res){
   res.render('login2');
});*/
//Authenticate 1( Angular JWT Security )
router.post('/authenticate',function(req,res){
   const username=req.body.username;
   const password=req.body.password;

    User.getUserByUsername(username,function(err,user){
        if(err) throw err;
        if(!user){
            return res.json({success:false,msg:'User not found'});
        }
        User.comparePassword(password, user.password,function(err,isMatch){
            if(err) throw err;
            if(isMatch){
                console.log('yayayaya');
                const token=jwt.sign(user.toJSON(),config.secret,{expiresIn:604800});

                res.json({success:true,
                          token:'JWT '+token,
                          user:{
                                 id:user._id,
                                 name:user.name,
                                 username:user.username,
                                 email:user.email
                               }
                         });
                       }
            else{
                return res.json({sucess:false,msg:'Wrong Password'});
            }
        });
    });
});



//AYTHENTICATE 2
/*
router.get('/profile',function(req,res){
   res.render('login2');
});
*/
//Profile
/*
router.post('/profile',function(req,res,next){
        passport.authenticate('local', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/login',
        //failureFlash: true
    })(req, res, next);
});
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.get('/pro',passport.authenticate('jwt',{session:false}),(req,res)=>{
   res.json({user:req.user});
});


router.post('/deleted',function(req,res){
    const username=req.body.username;
    console.log(username);
    User.delUser(username,function(err){

       if(err){
           res.json({"sucess":false,"msg":"Error. Account not deleted. "});
       }
       else{
           res.json({"sucess":true,"msg":" Account deleted. "});
       }
   })
});


router.post('/passchange',function(req,res){

        username=req.body.username;
        password1=req.body.password1;
    const nuser={
        username:username,
        password:password1
      }

      User.updatepass(nuser,function(err){
          if(err){
              res.json({"success":flase,"msg":"Error Occured."});
          }
          else{
            res.json({"success":true,"msg":"Password changed successfully"});
          }
      });
});

router.get('/download',function(req,res){
    var url = "http://i.imgur.com/G9bDaPH.jpg"
 
        var options = {
            directory: "C:/Users/anant/Downloads/images/cats/",
            filename: "cat.gif"
        }

        download(url, options, function(err){
            if (err) throw err
            console.log("meow")
        });
    fs.writeFile("about.html", "About", function(err) {
        if (err) {
            res.json({"success":flase,"msg":"Error Downloading File."});
        }
        res.json({"success":true,"msg":"File Downloaded."});
    }); 
    
});


module.exports=router;

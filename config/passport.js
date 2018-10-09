const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
const config=require('../config/database');


module.exports=function(passport){
    var opts={}
        //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        opts.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme('JWT');
        opts.secretOrKey=config.secret;
        passport.use(new JwtStrategy(opts,function(jwt_payload,done){
           //console.log(jwt_payload);
        User.getUserById(jwt_payload._id,function(err,user){
        if(err){
             console.log('reached3');
           return done(err,false);
        }
        if(user){
            return done(null,user);
        }
    else{
         console.log('reached5');
        return done(null,false);
    }
    })
    }));

}

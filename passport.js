const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// const User = require('../models/User');
// var data=require('./scores_rest')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
let dt=[];
module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "392875221611-nrg3gbiddn3fag31ksaf925gil676pg8.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
        //   firstName: profile.name.givenName,
        //   lastName: profile.name.familyName,
        //   image: profile.photos[0].value,
          email: profile.emails[0].value
        };

        try {
        //   let user = await User.findOne({ googleId: profile.id });
        // console.log(dt)
        let user=dt.filter((e)=>{return e.googleId===profile.id})
        console.log(user)

          if (user.length!==0) {
            console.log("hi")
            return done(null, user);
          } else {
            // user = await User.create(newUser);
            user=newUser
            dt.push(user)
            console.log(dt)
            return done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
    
  );
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "IloveCatsandDogs",
      },
      async (jwtPayload, done) => {
        console.log('JWT Strategy Callback Executed');
        console.log('JWT Payload:', jwtPayload);
  
        try {
          const user = dt.find(user => user.email === jwtPayload.email);
          console.log(user)
          console.log('User from JWT Payload:', user);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          console.error('Error in JWT Strategy:', err);
          return done(err, false);
        }
      }
    )
  );
  
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => done(err, user));
//   });

};


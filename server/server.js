const express = require('express');
const session = require('express-session');
const fs = require('fs');
const cors = require('cors');
const app = express();
var hasher = require('pbkdf2-password')();
const morgan = require('morgan');
const route_api = require('./routes/apirouter')();
const port = 5050;

global.sampleCarList = [];
global.userData = [];

if (fs.existsSync('./data/carlist.json')) {
   let rawdata = fs.readFileSync('./data/carlist.json');
   sampleCarList = JSON.parse(rawdata);
}
if (fs.existsSync('./data/userlist.json')) {
   let rawdata = fs.readFileSync('./data/userlist.json');
   userData = JSON.parse(rawdata);
}
app.use(express.urlencoded({
   extended: false
}));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/api', route_api);
app.use(session({
   secret: '1A@W#E$E',
   resave: false,
   saveUninitialized: true
}))

app.post('/api/SignUp', (req, res) => {

   console.log(req.body);
   res.json(req.body);
   let userid = req.body.email;
   let password = req.body.password;
   let name = req.body.firstname + req.body.lastname;

   hasher({
      password: req.body.password
   }, (err, pass, salt, hash) => {
      if (err) {
         console.log('ERR: ', err);
         res.redirect('/signup_form');
      }
      let user = {
         userid: userid,
         password: hash,
         salt: salt,
         name: name
      }

      // userData[userid] = user;
      userData.push(user);
      console.log('user added : ', userData);
      fs.writeFileSync('data/userlist.json', JSON.stringify(userData, null, 2));
   });
})

app.post('/api/Regist', (req, res) => {

   console.log(req.body);
   res.json(req.body);

   let carNumber = req.body.Carnumber;
   let owner = req.body.Owner;
   let model = req.body.Model;
   let company = req.body.Manufacturer;
   let numOfAccident = req.body.Numberofaccidents;
   let numOfOwnerChange = req.body.Ownerchanges;

   let car = {
      carNumber: carNumber,
      owner: owner,
      model: model,
      company: company,
      numOfAccident: numOfAccident,
      numOfOwnerChange: numOfOwnerChange
      }

      // userData[userid] = user;
      sampleCarList.push(car);
      console.log('user added : ', sampleCarList);
      fs.writeFileSync('data/carlist.json', JSON.stringify(sampleCarList, null, 8));
});

app.post('/api/login', (req, res) => {

   console.log(req.body);
   let userid = req.body.email;
   let password = req.body.password;
   let user = userData

   let bFound = false;

   for (let i = 0; i < userData.length; i++) {

      let user = userData[i];
      console.log(userData[i]);
      if (userid === user.userid) {
         console.log('[found] userid = ', userid);
         bFound = true;

         return hasher({
            password: password,
            salt: user.salt
         }, function (err, pass, salt, hash) {
            if (err) {
               console.log('ERR : ', err);
            }
            if (hash === user.password) {
               console.log('INFO : ', userid, ' 로그인 성공')

               req.session.user = userData[i];
               req.session.save(function () {
               })
               return;
            } else {

            }
         });
      }
      if (bFound) break;


      
      

      //    if (userid) {

      //        hasher({
      //            password: password,
      //            salt: user.salt

      //        }, function (err, pass, salt, hash) {
      //            if (err) {
      //                console.log('ERR : ', err);
      //                res.redirect('login_form')

      //            }
      //            if (hash === user.password) {
      //                console.log('INFO : ', userid, ' 로그인 성공')

      //                req.session.user = sampleUserList[userid];
      //                req.session.save(function () {
      //                    res.redirect('/carlist2');
      //                })
      //                return;
      //            } else {
      //                console.log('Password error');
      //            }
      //        });
   }
});

app.listen(port, () => {
   console.log('Listening port...', port);
});
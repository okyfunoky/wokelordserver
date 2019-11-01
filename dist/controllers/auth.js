"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var router = express.Router();
var db = require('../dbmodels');
const bcrypt = require('bcrypt');
//get route for secret clubhouse, if logged in will elt you in, otherwise will fail
router.get('/secret', function (req, res) {
    if (req.session.user) {
        res.status(200).send('secretssssssssssssss');
    }
    else {
        res.status(401).send('log in first jabroni!');
    }
});
//creates new instance of user
router.post('/signup', function (req, res) {
    console.log(req.body);
    db.User.create({
        name: req.body.name,
        password: req.body.password
    }).then(function (newUser) {
        console.log(newUser);
        res.json(newUser);
    });
});
//route for user login
router.post('/login', function (req, res) {
    db.User.findOne({
        where: {
            name: req.body.name
        }
    }).then(function (dbUser) {
        if (!dbUser) {
            res.status(500).send("no such user");
        }
        else {
            //compares password send in req.body to one in database, will return true if matched.
            if (bcrypt.compareSync(req.body.password, dbUser.password)) {
                //create new session property "user", set equal to logged in user
                req.session.user = { id: dbUser.id, name: dbUser.name };
                req.session.error = null;
                res.status(200).json(req.session);
            }
            else {
                //delete existing user, add error
                req.session.user = false;
                req.session.error = 'auth failed bro';
                res.status(401).send("password incorrect");
            }
        }
    });
});
router.get('/logout', function (req, res) {
    //delete session user, logging you out
    req.session.destroy(function () {
        res.send('successfully logged out');
    });
});
//developer route to see all the session variables.
router.get('/readsessions', function (req, res) {
    res.json(req.session);
});
module.exports = router;
//# sourceMappingURL=auth.js.map
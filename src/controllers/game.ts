import * as express from "express";
var router = express.Router();


router.get('/test', function (req: any, res) {
    res.status(200).send('secretssssssssssssss')
})

module.exports = router;
const express = require('express');
const router = express.Router();
const myMiddleware = require('../Middleware/ProfileMiddleware'); 
const {  myProfile, getMyProfile, getProfileById } = require('../Controller/createProfileAuth');

router.post('/myProfile',myMiddleware, myProfile);
router.get('/getMyProfile',myMiddleware,getMyProfile);
router.get("/profile/:id", myMiddleware, getProfileById);




module.exports = router;
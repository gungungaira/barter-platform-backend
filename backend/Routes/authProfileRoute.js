const express = require('express');
const router = express.Router();
const myMiddleware=require('../Middleware/MiddlewareAuth')
const {getProfile,updateProfile,deleteProfile}=require('../Controller/authProfileController');

router.get('/profile',myMiddleware,getProfile);
router.put('/profile',myMiddleware,updateProfile);
router.delete('/profile',myMiddleware,deleteProfile);

module.exports=router;
// routes file
const express = require('express');
const router = express.Router();
const authFindMatchMiddleware =require ('../Middleware/findMatchMiddleware')
const { sendRequest, getMyRequests, acceptRequest, deleteRequest,findMatch,getFriends } = require("../Controller/findMatchController");

router.post("/sendRequest", authFindMatchMiddleware, sendRequest);
router.get("/myRequests", authFindMatchMiddleware, getMyRequests);
router.patch("/request/:requestId/accept", authFindMatchMiddleware, acceptRequest);
router.delete("/request/:requestId", authFindMatchMiddleware, deleteRequest);
router.get("/findMatch", authFindMatchMiddleware, findMatch);
router.get("/friends", authFindMatchMiddleware, getFriends);

module.exports=router;
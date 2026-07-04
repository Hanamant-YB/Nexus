const express = require("express");
const router = express.Router();
const checkRole = require("../middlewares/checkRole");
const{create,getTasksAll,getOneTaskById,taskUpdate,taskDelete} = require("../controllers/taskController");
const {verifyToken} = require("../middlewares/verifyToken");
const {createIntelligent} = require("../controllers/aiController");

//AI endpoints - must be before/:id routes--
router.post(
    "/create-intelligent",
    verifyToken,
    checkRole("owner","admin"),
    createIntelligent
);





//regular task endpoints
//create task only owner and admin can create
router.post("/tasks",verifyToken,checkRole("owner","admin"),create);

//get all tasks any project member can view
router.get("/tasks",verifyToken,getTasksAll);

//get one task from any project member can view
router.get("/tasks/:id",verifyToken,getOneTaskById);

//patch the task from owner,admin
router.patch("/tasks/:id",verifyToken,checkRole("owner","admin"),taskUpdate);

//delete the task - owner,admin
router.delete("/tasks/:id",verifyToken,checkRole("owner","admin"),taskDelete);

module.exports = router;
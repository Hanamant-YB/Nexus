const express = require("express");
const router = express.Router();
const{create,getAll,getOneProject} = require("../controllers/projectController");

const{verifyToken} = require("../middlewares/verifyToken") 

router.post("/projects",verifyToken,create);

router.get("/projects",verifyToken,getAll);

router.get("/projects/:id",verifyToken,getOneProject);

module.exports = router;
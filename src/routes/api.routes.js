const express = require("express");
const {
  signUp,
  login,
  protect,
  token,
} = require("../controller/api/auth.controller");
const {
  addMember,
  allMembers,
  getMember,
  updateMember,
  deleteMember,
} = require("../controller/api/member.controller");
const router = express.Router();

// auth
router.post("/user/signup", signUp);
router.post("/user/login", login);
router.post("/user/token", token);

// protected routes
router.post("/member", addMember);
router.get("/members", protect, allMembers);
router.get("/member/:id", getMember);
router.put("/member/:id", updateMember);
router.delete("/member/:id", deleteMember);

module.exports = router;

const express = require("express");
const {
  addMember,
  allMembers,
  getMember,
  updateMember,
  deleteMember,
} = require("../controller/api/member.controller");
const router = express.Router();

// protected routes

router.post("/member", addMember);
router.get("/members", allMembers);
router.get("/member/:id", getMember);
router.put("/member/:id", updateMember);
router.delete("/member/:id", deleteMember);

module.exports = router;

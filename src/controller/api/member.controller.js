const { db } = require("../../configs/server");
const Member = require("../../models/Member");
const AppError = require("../../utils/appError");

const addMember = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    await db.collection("Member").doc().set({
      name,
      email,
    });
    res.status(200).json({
      message: "Created!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const allMembers = async (req, res, next) => {
  try {
    const getMember = await db.collection("Member");
    const data = await getMember.get();
    const memberArr = [];
    data.docs.forEach((doc) => {
      const member = new Member(doc.id, doc.data().name, doc.data().email);
      memberArr.push(member);
    });
    res.json({
      data: memberArr,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getMember = async (req, res, next) => {
  try {
    const member = await db.collection("Member").doc(req.params.id);
    const data = await member.get();

    if (!data.exists) {
      return next(new AppError(404, "No member found!", req, res, next));
    } else {
      res.status(200).json({
        data: data.data(),
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    await db.collection("Member").doc(req.params.id).update({
      name,
      email,
    });
    res.status(200).json({
      message: "Updated!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteMember = async (req, res, next) => {
  try {
    await db.collection("Member").doc(req.params.id).delete();
    res.status(200).json({
      message: "Deleted!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  addMember,
  allMembers,
  getMember,
  updateMember,
  deleteMember,
};

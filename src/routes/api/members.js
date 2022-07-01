const express = require("express");
const router = express.Router();
const { db } = require("../../configs/server");

router.get("/", async (req, res) => {
  const snapshot = await db.collection("Member").get();
  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(list);
  res.send(list);
});

router.post("/create", async (req, res) => {
  const data = req.body;
  await db.collection("Member").add({ data });
  res.status(200).send({
    message: "success",
  });
});

router.put("/update/:id", async (req, res) => {
  const data = req.body;
  
  await db.collection("Member").doc(req.params.id).update(data);
  res.status(200).send({
    message: "success",
  });
});

module.exports = router;

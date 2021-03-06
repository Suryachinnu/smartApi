let billModel = require("../models/bill.model");
let express = require("express");
let router = express.Router();

router.post("/bill", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  req.body.createdDate = new Date();

  let model = new billModel(req.body);
  console.log("user required===", req.body);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        res.status(500).send(doc);
      }
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/bills", (req, res) => {
  if (!req.query.email) {
    res.status(400).send("request parameters missing");
  }

  billModel
    .find({
      smart_user: req.query.email
    })
    .then(doc => {
      if (!doc || doc.length === 0) {
        res.json({});
      } else { 
        let response = [...doc];
        response.sort(function(a, b){
          return a.billNo.split("-")[3] - b.billNo.split("-")[3]        
        });      
        res.json(response);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get("/viewBill", (req, res) => {
  if (!req.query.id) {
    res.status(400).send("request parameters missing");
  }
  billModel
    .findOne({
      _id: req.query.id
    })
    .then(doc => {
      if (!doc || doc.length === 0) {
        res.json({});
      } else {
        res.json(doc);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Update Bill
router.post("/updateBill", (req, res) => {
  if (!req.query.id) {
    res.status(400).send("request parameters missing");
  }
  billModel
    .findOneAndUpdate(
      {
        _id: req.query.id
      },
      req.body,
      { new: true }
    )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// DElete Bill
router.post("/deleteBill", (req, res) => {
  if (!req.query.id) {
    res.status(400).send("request parameters missing");
  }
  billModel
    .findOneAndRemove({
      _id: req.query.id
    })
    .then(doc => {
      res.json({ Status: "success" });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get("/profile", (req, res) => {
  if (!req.query.email) {
    res.status(400).send("request parameters missing");
  }
  userModel
    .findOne({
      email: req.query.email
    })
    .then(doc => {
      if (!doc || Object.keys(doc).length === 0) {
        res.json({});
      } else {
        res.json(doc);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get("/user/:name", (req, res) => {
  res.send(`you have requested ${req.params.name}`);
});
router.get("/error", (req, res) => {
  throw new Error("This is a forced error");
});

module.exports = router;

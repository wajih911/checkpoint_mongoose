const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

/* create and save a record of a person model*/
const person = new Person({
  name: "wajih",
  age: 24,
  favoriteFoods: ["Kouskous", "Kammouneya"],
});
person.save((error, data) => {
  if (error) {
    return console.log("Error");
  }
});

// create many records using model.create or insertMany
Person.create(
  [
    { name: "ahmed", age: 25, favoriteFoods: ["banana", "juice"] },
    { name: "cyrine", age: 28, favoriteFoods: ["chicken", "nuggets"] },
    { name: "med ali", age: 25, favoriteFoods: ["salade", "pizza"] },
    { name: "sarah", age: 22, favoriteFoods: ["croque mr", "ojja"] },
  ],
  (error, data) => {
    if (error) {
      return console.log("Error");
    }
  }
);

//get all persons
//method: get
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).send({ msg: "All contacts", persons });
  } catch (error) {
    res.status(500).send("impossible to get persons");
  }
});

//Return a Single Matching Document from the Database using the function argument food as a search key
//method get
router.get("/favoriteFoods", async (req, res) => {
  try {
    const person = await Person.findOne({
      favoriteFoods: "pizza",
    }).exec();
    res.status(200).send({ msg: "person found", person });
  } catch (error) {
    res.status(500).send("impossible to find person");
  }
});
// serch by id using findById
router.get("/:Id", async (req, res) => {
  try {
    const id = req.params.Id;
    const person = await Person.findById({ _id: id });
    res.status(200).send({ msg: "person", person });
  } catch (error) {
    res.status(500).send("impossible to find person");
  }
});
//Update : find person by id , add humburger to favoriteFoods then save
//methods : findById , push , save
router.put("/:Id", async (req, res) => {
  try {
    const id = req.params.Id;
    const person = await Person.findById({ _id: id });

    person.favoriteFoods.push("hamburger");
    person.save();
    res.status(200).send({ msg: "person updated", person });
  } catch (error) {
    res.status(500).send("impossible to update person");
  }
});
//Perform New Updates on a Document Using model.findOneAndUpdate()

router.put("/:Id/age", async (req, res) => {
  try {
    const id = req.params.Id;
    const person = await Person.findOneAndUpdate(
      { _id: id },
      { $set: { age: 20 } }
    );
    res.status(200).send({ msg: "person updated", person });
  } catch (error) {
    res.status(500).send("impossible to update person");
  }
});
//Delete person
//method : findByIdAndRemove
router.delete("/:Id", async (req, res) => {
  try {
    const id = req.params.Id;
    const person = await Person.findByIdAndRemove({ _id: id });

    res.status(200).send({ msg: "person deleted", person });
  } catch (error) {
    res.status(500).send("impossible to delete person");
  }
});
//  Delete documents where name=wajih

router.delete("/", async (req, res) => {
  try {
    const deletedPersons = await Person.remove({
      name: "wajih",
    });
    res.status(200).send({ msg: "persons deleted", deletedPersons });
  } catch (error) {
    res.status(500).send("impossible to delete person");
  }
});
//find (), .sort (), .limit (), .select (), .exec ().
router.get("/tri", async (req, res) => {
  try {
    const person = await Person.find({
      favoriteFoods: { $all: ["juice"] },
    })
      .sort("name")
      .limit(2)
      .select("age")
      .exec();
    res.status(200).send({ msg: "persons found", person });
  } catch (error) {
    res.status(500).send("impossible to sort persons");
  }
});
module.exports = router;

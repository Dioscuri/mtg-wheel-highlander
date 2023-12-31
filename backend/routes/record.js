// Using express.js as the router
const express = require("express");
const routes = express.Router();
 
// This will help us connect to the database
const dbo = require("../database/connection");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.

// DECK ROUTES
routes.route("/decks").get(function (req, res) {
 let db_connect = dbo.getDb("mtgWheelHighlander");

 try {
    db_connect
      .collection("decks")
      .find({})
      .toArray()
      .then((data) => {
        console.log(data);
        res.json(data)
      });
  }
  catch (e){
    console.error("Error pulling decks: ", e)
  }
});

// A deck consists of the following fields:
// name: deck_name
// id: deck_id (autogenerated), don't need to pass in to create a deck
// user: deck_owner
// cards: [card_id's]

routes.route("/decks/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.deck_name,
    cards: []
    // wheels: req.body.wheel,
    // user: req.body.user_name
  };

  console.log("/decks/add", req.body)

  try {
    db_connect
    .collection("decks")
    .insertOne(myobj)
    .then((data) => {
      console.log(data);
      response.json(data)
    });

  }
  catch (e){
    console.error("Error creating deck: ", e)
  }
 });

 // Get a deck with the given ID
routes.route("/decks/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.id) };

  console.log("/decks/id", req.params)

  try {
    db_connect
      .collection("decks")
      .findOne(myquery)
      .then((data) => 
        {
          res.json(data)
        }
      )
  }
  catch (e){

  }
  
 });
  

 // When calling this function, 
 routes.route("/decks/update/cards/:deckID").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: new ObjectId(req.params.deckID) };
  let newvalues = {
    $set: {
      cards: req.body.cards,
    },
  };

  try {
    db_connect
    .collection("decks")
    .findOneAndUpdate(myquery, newvalues, {returnNewDocument:true})
    .then((data)=>{
      console.log(data)
      response.json(data)
    })

  }
  catch (e){
    console.error("Error updating cards: ", e)
  }

 });

// WHEEL ROUTES 
routes.route("/wheels").get(function (req, res) {
  let db_connect = dbo.getDb("mtgWheelHighlander");
 
  try {
     db_connect
       .collection("wheels")
       .find({})
       .toArray()
       .then((data) => {
         console.log(data);
         res.json(data)
       });
   }
   catch (e){
     console.error("Error pulling decks: ", e)
   }
 });
 
/*
// This section will help you delete a record
routes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});*/
 
module.exports = routes;
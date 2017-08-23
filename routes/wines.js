const express = require("express")
const router = express.Router()
const Wine = require("../models/Wine")

router.get("/", function(req, res) {
  Wine.find().then(function(wines) {
    res.render("index", {
      wines: wines
    })
  })
})

router.get("/wines/new", function(req, res) {
  res.render("new")
})

router.post("/wines", function(req, res) {
  const name = req.body.name
  const country = req.body.country
  const wine = new Wine()
  wine.name = name
  wine.country = country
  wine
    .save()
    .then(function(wine) {
      res.redirect("/")
    })
    .catch(function(error) {
      console.log("error", error)
      res.render("new", {
        wine: wine,
        errors: error.errors
      })
    })
})

router.post("/wines/:id", function(req, res) {
  Wine.findOne({ _id: req.params.id }).then(function(wine) {
    const name = req.body.name
    const country = req.body.country
    wine.name = name
    wine.country = country
    wine
      .save()
      .then(function(wine) {
        res.redirect("/")
      })
      .catch(function(error) {
        res.render("edit", {
          wine: wine,
          errors: error.errors
        })
      })
  })
})

router.get("/wines/:id", function(req, res) {
  Wine.findOne({ _id: req.params.id }).then(function(wine) {
    res.render("detail", {
      wine: wine
    })
  })
})

router.get("/wines/:id/edit", function(req, res) {
  Wine.findOne({ _id: req.params.id }).then(function(wine) {
    res.render("edit", {
      wine: wine
    })
  })
})

router.get("/wines/:id/delete", function(req, res) {
  Wine.deleteOne({ _id: req.params.id }).then(function() {
    res.redirect("/")
  })
})

module.exports = router

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("../models/product");
const router = express.Router({ mergeParams: true });
const multer = require("multer");
const storage = multer.diskStorage
  ({
    destination: function (req, file, cb)
    {
      cb(null, "public/uploads/products");
    },
    filename: function (req, file, cb)
    {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });
// Require Sharp image resize module
//const sharp = require('sharp');

// New product get route
router.get("/new", function (req, res)
{
  res.render("products/new");
});

// Products index route
router.get("/", function (req, res)
{
  if (req.query.search)
  {
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    Product.find({ $or: [{ title: regex }, { category: regex }, { body: regex }] }, function (error, allProducts)
    {
      if (error)
      {
        console.log("Error:", error);
        req.flash("error", "Er is een fout opgetreden bij het uitvoeren van de zoekopdracht.");
      }
      else
      {
        res.render("products/index", { products: allProducts });
      }
    });
  } else
  {
    Product.find({}, function (error, allProducts)
    {
      if (error || !allProducts)
      {
        console.log(error);
        req.flash("error", "Er is een fout opgetreden bij het ophalen van de advertenties.");
      } else
      {
        res.render("products/index", { products: allProducts });
      }
    });
  }
});

// Post route of a product, with multer upload middleware
router.post("/", upload.array("productImages", 5), function (req, res)
{
  
  // Append lat and long to product JSON
  appendLocationData(req.body.product, req.body.latitude, req.body.longitude);

  Product.create(req.body.product, function (error, product)
  {
    if (error || !product)
    {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het aanmaken van de advertentie.");
      res.redirect("/advertenties");
    }
    else
    {
      // Save filename to product entry in database
      req.files.forEach(function (file)
      {
        product.images.push(file.filename);
      });

      product.save();
    }
  });
  req.flash("success", "Uw advertentie is met succes aangemaakt");
  res.redirect("/advertenties");
});

// Poging tot DRY
function appendLocationData(targetObject, latitude, longitude)
{
   // Manually process the lat and long data, to insert into the product structure
   let location =
   {
     "location":
     {
       "coordinates": [latitude, longitude]
     }
   };
   return targetObject = Object.assign(targetObject, location);
}

// Multer testing route
router.post("/imageupload", upload.array("productImages", 3), function (req, res)
{
  console.log(req.files);
});

// Product show route
router.get("/:product_id", function (req, res)
{
  Product.findById(req.params.product_id)
    .populate("bids")
    .exec(function (err, foundProduct)
    {
      if (err || !foundProduct)
      {
        console.log(err);
        req.flash("error", "Er is een fout opgetreden bij het ophalen van de advertentie.");
        res.redirect("/advertenties");
      } else
      {
        res.render("products/show", { product: foundProduct });
        //res.send(foundProduct.location.coordinates);
      }
    });
});

// EDIT FORM GET ROUTE
router.post("/:product_id/stripe", function (req, res)
{
    app.locals.productId = req.body.productId;
    res.render("products/payment");
});

// EDIT FORM GET ROUTE
router.get("/:product_id/stripe", function (req, res)
{
    // Render page and pass productId to payment page
    res.render("products/payment", { productId: req.params.product_id });
    // res.send(req.params.product_id);
});

// EDIT FORM GET ROUTE
router.get("/:product_id/edit", function (req, res)
{
  Product.findById(req.params.product_id, function (error, foundProduct)
  {
    if (error || !foundProduct)
    {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het ophalen van de advertentie.");
      res.redirect("/advertenties");
    }
    else
    {
      res.render("products/edit", { product: foundProduct });
    }
  });
});


// After payment route
router.get("/:product_id/stripe/complete", (req, res) =>
{
    res.render("stripe/complete");
});

// EDIT PUT ROUTE
router.put("/:product_id", function (req, res)
{
  // Append lat and long to product JSON
  appendLocationData(req.body.product, req.body.latitude, req.body.longitude);
  
  // try to find the product by id and update it
  Product.findByIdAndUpdate(req.params.product_id, req.body.product, function (error, updatedProduct)
  {
    if (error || !updatedProduct)
    {
      console.log(error);
      req.flash("error", "Er is een fout opgetreden bij het wijzigen van de advertentie.");
      res.redirect("/advertenties/" + req.params.product_id);
    }
    else
    {
      // For debugging purposes
      console.log(req.body.product);
      // Redirect back to the advertisement page
      req.flash("success", "Advertentie succesvol bijgewerkt.");
      res.redirect("/advertenties/" + req.params.product_id);
    }
  });
});

// Product delete route
router.delete("/:id", function (req, res)
{
  Product.findByIdAndRemove(req.params.id, function (err)
  {
    if (err)
    {
      console.log(err);
      req.flash("error", "Er is een fout opgetreden bij het verwijderen van de advertentie.");
      res.redirect("/advertenties");
    } else
    {
      req.flash("success", "Uw advertentie is met succes verwijderd");
      res.redirect("/advertenties");
    }
  });
});

function escapeRegex(text)
{
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listing=require("../models/listing.js");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");
const listingcontroller=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage});



router.route("/")
.get(wrapAsync(listingcontroller.index))
.post(isLoggedin,upload.single('listing[image]'),validateListing,wrapAsync(listingcontroller.createlisting));


//NEW ROUTE
router.get("/new",isLoggedin,listingcontroller.rendernewform);

router.route("/:id")
.get(wrapAsync(listingcontroller.showlisting))
.put(isLoggedin,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingcontroller.updatelisting))
.delete(isLoggedin,isOwner,wrapAsync(listingcontroller.destroylisting));


//EDIT ROUTE
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingcontroller.rendereditform));

module.exports=router;
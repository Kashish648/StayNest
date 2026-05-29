const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedin,isReviewAuthor}=require("../middleware.js");
const reviewcontroller=require("../controllers/reviews.js");

//REVIEW ROUTE(POST REVIEW  ROUTE)
router.post("/",validateReview,isLoggedin,wrapAsync(reviewcontroller.createreviews));


//delete reviews ROUTE
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewcontroller.destroyreviews));

module.exports=router;



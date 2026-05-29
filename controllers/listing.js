const Listing=require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async(req,res)=>{
  const allListings=await Listing.find({});
  res.render("listings/index.ejs",{allListings});
};

module.exports.rendernewform=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showlisting=async(req,res)=>{
   let{id} =req.params;
   const foundlisting=await Listing.findById(id)
   .populate({path:"reviews",populate:{
    path:"author"
   },
  })
   .populate("owner");
    if (!foundlisting) {
        throw new ExpressError(404, "Listing not found!");
    }
    if(!foundlisting){
      req.flash("error","Listing you requested for doesnt exists !");
      res.redirect("/listings");
    }
    console.log(foundlisting);
   res.render("listings/show.ejs", {listing:foundlisting});

};

module.exports.createlisting=async (req,res,next)=>{
   let response=await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send();
  
  
  let url=req.file.path;
  let filename=req.file.filename;
  const newListing=new Listing(req.body.listing);
  newListing.owner=req.user._id;
  newListing.image={url,filename};
  newListing.geometry=response.body.features[0].geometry;


  let savedlisting=await newListing.save();
  console.log(savedlisting);
  req.flash("success","New Listing Created!");
  res.redirect("/listings");
};


module.exports.rendereditform=async (req,res)=>{
    let{id} =req.params;
   const foundlisting=await Listing.findById(id);
   if(!foundlisting){
      req.flash("error","Listing you requested for doesnt exists !");
      return res.redirect("/listings");
    }
    let originalimageurl=foundlisting.image.url;
    originalimageurl=originalimageurl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {listing:foundlisting,originalimageurl});
};

module.exports.updatelisting=async(req,res)=>{
    let { id } = req.params;
   
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    // ADD THIS — re-geocode on update too
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  }).send();
  listing.geometry = response.body.features[0].geometry;

    if(typeof req.file!=='undefined'){
     let url=req.file.path;
     let filename=req.file.filename;
     listing.image={url,filename};
     await listing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroylisting=async(req,res)=>{
   let{id} =req.params;
   let deletedlisting=await Listing.findByIdAndDelete(id);
   console.log(deletedlisting);
   req.flash("success","Listing Deleted!");
   res.redirect("/listings");
};


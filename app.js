const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const MONGO_URL='mongodb://127.0.0.1:27017/stayNest';

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));


app.get("/",(req,res)=>{
    res.send("hii,i am root!");
});

//INDEX ROUTE
app.get("/listings", async(req,res)=>{
  const allListings=await listing.find({});
  res.render("listings/index.ejs",{allListings});
});



//NEW ROUTE
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});


//SHOW ROUTE
app.get("/listings/:id",async(req,res)=>{
   let{id} =req.params;
   const foundlisting=await listing.findById(id);
   res.render("listings/show.ejs", {listing:foundlisting});

});


//CREATE ROUTE
app.post("/listings",async (req,res)=>{
//   let{title,description,image,price,location,country}=req.body;
const newListing=new listing(req.body.listing);
await newListing.save();
res.redirect("/listings");

});


//EDIT ROUTE
app.get("/listings/:id/edit",async (req,res)=>{
    let{id} =req.params;
   const foundlisting=await listing.findById(id);
    res.render("listings/edit.ejs", {listing:foundlisting});
});

//UPDATE ROUTE
app.put("/listings/:id",async(req,res)=>{
    let{id} =req.params;
    await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//DELETE ROUTE
app.delete("/listings/:id",async(req,res)=>{
   let{id} =req.params;
   let deletedlisting=await listing.findByIdAndDelete(id);
   console.log(deletedlisting);
   res.redirect("/listings");
});


// app.get("/testlisting",async (req,res)=>{
//   let samplelisting=new listing({
//     title:"My new Villa",
//     description:"by the beach",
//     price:1200,
//     location:"Calagute,Goa",
//     country:"India",
//   });
//   await samplelisting.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

app.listen(8080,()=>{
    console.log("server is listening to port 8080")
})
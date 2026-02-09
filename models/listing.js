const mongoose=require("mongoose");
const Schema=mongoose.Schema;

// const listingSchema=new Schema({
//     title:{
//         type:String,
//         required:true,
//     },
//     description:String,
//     image:{
//         type:String,
//         default:
//         "https://unsplash.com/photos/green-aurora-borealis-over-a-calm-lake-at-night-ZPbfvIN4NXs",
//         set: (v)=>
//             v===""
//         ? "https://unsplash.com/photos/green-aurora-borealis-over-a-calm-lake-at-night-ZPbfvIN4NXs"
//         :v,
//     },
//     price:Number,
//     location:String,
//     country:String,
// });

const listingSchema = new Schema({
  title:{
    type:String,
  },
  description: String,
  image: {
    filename: String,
    url: String
  },
  price: Number,
  location: String,
  country: String
});


const listing=mongoose.model("listing",listingSchema);
module.exports=listing;
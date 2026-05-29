const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js")

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
    url: String,
    filename:String,
    
  },
  price: {
    type:Number,
    default:0
  },
  location: String,
  country: String,
  reviews:[
  {
     type: Schema.Types.ObjectId,
     ref:"Review",
  }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      default: 'Point'
    },
     coordinates: {
      type: [Number],
      default: []
    },
  },
  // category:{
  //   type:String,
  //   enum:["rooms","iconic cities","mountain","castles","amazing pools","camping","farms","arctic"],

  // }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
   await Review.deleteMany({_id : {$in:listing.reviews}});
  }
 
});

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;
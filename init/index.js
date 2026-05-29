const mongoose=require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");

const MONGO_URL='mongodb://127.0.0.1:27017/stayNest';

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}


const initDB=async()=>{
    await listing.deleteMany({});
     initdata.data= initdata.data.map((obj)=>({...obj,owner:
        "6a00b540dfee9bc50390cdda"}));
    await listing.insertMany(initdata.data);
    console.log("data was initialised ");
}

initDB();
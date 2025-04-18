require("dotenv").config();

const express=require("express")
const cors = require("cors");

const mongoose=require("mongoose")
const userrote=require("./route/userroute")
const cookieParser = require("cookie-parser");
const recruiterrouter=require("./route/recruiterrouter")
const app=express()

const PORT=8000

app.use(express.json());
app.use(cookieParser())


const corsoption = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}
app.use(cors(corsoption))
app.use("/user",userrote)

app.use("/recruiter",recruiterrouter)

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
          tls: true,  // Enforce SSL/TLS
          tlsInsecure: false,
      });
  
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.log("MongoDB connection error:", error);
    }
  };
  
connectDB()

app.listen(PORT,(req,res)=>{
    console.log("server woring");
    
})
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const router = require("./routes/user_routes");
const cookirParser = require("cookie-parser");
const productRouter = require("./routes/product_routes");
require("dotenv").config()

const app = express();
const PORT = 8010;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(cookirParser());
app.use("/api",router);
app.use("/product",productRouter);

connectDb().then(()=>{
    app.listen(PORT,(err)=>{
        if(!err){
            console.log("http://localhost:"+PORT);
            console.log("Database connected");
        }
    })
})
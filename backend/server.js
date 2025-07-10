import express, { json } from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import router from './routes/product.routes.js';
import path from 'path'
dotenv.config();



const app = express();
// app.use(express.json()) //use express.json middleware
app.use(json()); //both are same


const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;


// | Line                           | Purpose                                                  |
// | ------------------------------ | -------------------------------------------------------- |
// | `app.use(express.static(...))` | Serves all your **static files** (scripts, styles, etc.) |
// | `res.sendFile(index.html)`     | Sends the main HTML file to start the React app          |


app.use("/api/product", router)
if (process.env.NODE_ENV?.trim() === "production") {//if in poruction we need a different configuration

    app.use(express.static(path.join(__dirname, "/frontend/dist"))) //making dist folder our static assset(basically serve react app)
    console.log("reached here 1");
    app.get("*path", (req, res) => {
        console.log("reached here 2");
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}




app.listen(PORT, () => {
    //when server is live, we need to connect to database
    connectDB()
    console.log(`server started at http://localhost:${PORT}`);
})
import express from "express"
import cors from "cors"
import mongoose, { Mongoose } from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const DATABASE_URL =process.env.DATABASE_URL


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// creating database

mongoose.connect("mongodb://localhost:27017/validatonDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// creating mongodb schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    dob: String

})

const User = new mongoose.model("User", userSchema)



app.get("/dashbord", async (req, res) => {
    const filter = {};
    const all = await User.find(filter);
    res.send(all);
})

//Routes
app.post("/register", async (req, res) => {
    const { name, email, phone, dob } = req.body
    const chec = await User.findOne({ phone: phone });
    if (chec) {
        res.send({ status: "faild", message: "This Number is Already Registred" })
    } else {
        const user = new User({
            name,
            email,
            phone,
            dob
        })
        await user.save().then(savedDoc => {
            res.send({ status: "success", message: "Submit Successful" });
        })
   
    }

}
);


const PORT = process.env.PORT || 9002 
app.listen(PORT, () => {

})


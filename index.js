import express from "express"
import cors from "cors"
import mongoose, { Mongoose } from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const DATABASE_URL ="mongodb+srv://shubhamgour:5iWcQbLTf2VS63ay@cluster0.wd31auu.mongodb.net/validatonDB?retryWrites=true&w=majority"


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// creating database

mongoose.connect(DATABASE_URL, {
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


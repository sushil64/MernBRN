const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
// UPdated in GIT hub for testing
// Data sending through -> JSON use express.json
//                      -> Url - Encoded use express.urlencoded
//                      -> formData use multer

// express.json() is a middleware which collects the data from (req)object and gives it to request.body
// request.body
// Data sent frm Client to Server is available in (req) object <- extract from this object and send it to DB.
app.post("/conctnCS", async (req, res) => {

    let dataEntered = new userData({
        fn: req.body.fn,
        ln: req.body.ln,
        em: req.body.em,
        psw: req.body.psw,
        age: req.body.age,
        ppic: req.body.ppic,
        cnt: req.body.cnt,
    });

    await dataEntered.save();

    res.json(["Account created succesfully"]);
    console.log(req.body);
    console.log("Received singup data");
});

app.listen(4455, () => {
    console.log("Listening to port 4455");
});
// ------------------------------MongoDB---------------------------
// Connection, Schema, Model
let userSchema = new mongoose.Schema({
    fn: String,
    ln: String,
    em: String,
    psw: String,
    age: Number,
    ppic: String,
    cnt: Number,
});

let userData = new mongoose.model("signup", userSchema);

let connectToMGDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://brnsushil2304:brnsushil2304@cluster0.iec0j9s.mongodb.net/?retryWrites=true&w=majority");

        console.log("Succesfully Connected to MGDB");
    }
    catch (err) {
        console.log("Unable to Connect To MGDB");
        console.log(err);
    }
}

connectToMGDB();

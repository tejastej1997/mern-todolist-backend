let express = require('express')
require('dotenv').config()
let mongoose = require('mongoose')
let taskSchema = require('./model')
let mongopassword = process.env.Mongopassword;
let mongousername = process.env.Mongousername;
const port = process.env.port || 4000
let cors = require('cors')
let app = express()
app.use(express.json())

app.use(cors({
    origin: "*"
}))



mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://${mongousername}:${mongopassword}@cluster0.hfthgsz.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => {
        console.log(err.message);

    })


app.post('/addtask', async (req, res) => {


    const { todo } = req.body;
    try {
        const newData = new taskSchema({
            todo: todo
        })
        await newData.save();
        return res.json(await taskSchema.find())
    }

    catch (err) {
        console.log(err);
    }
})


app.get('/gettask', async (req, res) => {
    try {
        return res.json(await taskSchema.find())
    }
    catch (err) {
        console.log(err);

    }
})

app.delete('/delete/:id', async (req, res) => {

    try {

        await taskSchema.findByIdAndDelete(req.params.id)
        return res.json(await taskSchema.find())

    } catch (error) {

    }


})




app.listen(port, () => {
    console.log("Port 4000 running");
});
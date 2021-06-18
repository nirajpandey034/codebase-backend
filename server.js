const express = require('express');
var cors = require('cors')
const app = express();
const connectDB = require('./config/db');

app.use(cors())

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));


// Routes
app.use('/upload', require('./routes/Upload'));
app.use('/fetch', require('./routes/Fetch'));

//default route
app.use((req,res)=>{
    res.send("please check your path");
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
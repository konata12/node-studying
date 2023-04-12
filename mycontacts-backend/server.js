const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = precess.env.PORT || 5000;

app.get("/api/contacts", (req, res) => {
    res.send("Get all contacts")
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
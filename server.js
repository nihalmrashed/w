const express = require('express');
const mongoose = require('mongoose');

// API
const order = require("./api/routes/order.router");
const product = require("./api/routes/product.router");
const ingredient = require("./api/routes/ingredient.router");
const user = require("./api/routes/user.router");

// set up express app
const app = express();
app.use(express.json());

// mongo configure
const config = require('config');
const db = config.get('mongoURI');

//Connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

//Route handlers
app.use("/api/order", order);
app.use("/api/product", product);
app.use("/api/ingredient", ingredient);
app.use("/api/user", user);
app.use('/estimate', async (req, res) => {
    var spawn = require("child_process").spawn,
        py = spawn("python", ['./compute_input.py']),
        data = req.body.input,
        dataString = "";
    py.stdout.on("data", function (data) {
        dataString += data.toString();
    });
    py.stderr.pipe(process.stderr);
    py.stdout.on("end", function () {
        return res.json({
            data: dataString
        });
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
});
  
//Serve static assets if in production
if (process.env.NODE_ENV == 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('/', (req, res) => {
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));


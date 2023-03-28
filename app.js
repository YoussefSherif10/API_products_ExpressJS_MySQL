const express = require('express')
const cors = require('cors')

const app = express();

let corsOptions = {
    origin: "http://localhost:80"
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({message: "Passed the test"});
})

// use the routes of the product
require('./routes/product.routes')(app);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
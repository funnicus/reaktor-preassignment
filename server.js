const express = require('express');
const parser = require("./convertStatusToJSON");

const app = express();

app.get('/api/packages', (req, res) => {
    //Just put the location of your file as an argument in the parser
    const packages = parser("./status.real");
    console.log(packages);
    res.json(packages);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
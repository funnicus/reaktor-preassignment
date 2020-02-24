const express = require('express');
const parser = require("./convertStatusToJSON");

const app = express();

const port = process.env.PORT || 5000;
//production mode
if(process.env.NODE_ENV === 'production') {
    app.get('/api/packages', (req, res) => {
        //Just put the location of your file as an argument in the parser
        const packages = parser("./status.real");
        console.log(packages);
        res.json(packages);
    });
}
//build mode
app.get('/api/packages', (req, res) => {
    //Just put the location of your file as an argument in the parser
    const packages = parser("./status.real");
    console.log(packages);
    res.json(packages);
});
app.listen(port, () => console.log(`Server started on port ${port}`));
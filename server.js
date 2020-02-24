const express = require('express');
const parser = require("./convertStatusToJSON");
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;
//production mode
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(__dirname));
    app.use(express.static('client/build'));
    //Render index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
// Set static folder
app.use(express.static(__dirname));
app.use(express.static('client/public'));
//build mode
app.get('/api/packages', (req, res) => {
    //Just put the location of your file as an argument in the parser
    const packages = parser("./status.real");
    console.log(packages);
    res.json(packages);
});
//
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client" , 'public', 'index.html'));
});
app.listen(port, () => console.log(`Server started on port ${port}`));
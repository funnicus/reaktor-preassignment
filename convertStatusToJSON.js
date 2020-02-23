/*
The function of this file is to convert a status.real file it receives into
JSON. The function "convertStatusToJSON" will syncronously read the file and 
return its contents as JSON.
*/
const fs = require('fs');

function convertStatusToJSON(file){
    let data = fs.readFileSync(file);

        //Lets put all the packages as different Strings into an array
        let packages = data.toString().split("\n\n");
        //Lets remove the last element, which is empty
        packages.splice(packages.length-1, 1);
        
        //Lets parse all the packages into JSON format
        for(let i = 0; i < packages.length; i++){
            //splitting all the rows of a package into an array
            let rows = packages[i].split("\n");
            //Handling the descriptions as they have multiple lines
            for(let m = 0; m < rows.length; m++){
                let row = rows[m];
                //checkin if a row starts with a whitespace
                //that's how we know it's part of a description
                //or other similar thing.
                if(row.charAt(0) === " "){
                    rows[m-1] += rows[m];
                    rows.splice(m, 1);
                    m--;
                }
            }
            //looping trough the rows
            for(let j = 0; j < rows.length; j++){
                //change the row into JSON format
                let values = rows[j].split([": "[1]]);
                values[0] = values[0].slice(0, values[0].length-1);
                values[0] = '"' + values[0] + '"';
                //Lets add add all the different lines into a single index.
                //We will also replace all quotes with commas
                //because quotes will cause errors when we parse
                //the data into JSON.
                let c = 2
                while(c < values.length){
                    values[1] += " " + values[c].replace(/"/g,"\'");
                    c++
                }
                values[1] = '"' + values[1] + '"';
                rows[j] = values[0] + ':' + values[1];
            }
            //Bringing every package into JSON format
            rows = "{ " + rows.toString() + " }";
            //replacing the old packages with the new JSON formatted packages
            //catching any errors incase they happen...
            try{
                packages[i] = JSON.parse(rows);
                //console.log(packages[i]);
            }catch(err){
                packages[i] = rows;
                console.log(packages[i] = rows);
                //console.log(err);
                console.log("JSON conversion exception...");
                return null;
            }
        }
    return packages;
};

module.exports = convertStatusToJSON;
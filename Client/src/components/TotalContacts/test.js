const fs = require("fs");
// const csv = require('fast-csv');
// const data = []
// fs.readFile()
// fs.createReadStream('./Iris.csv')
//     .pipe(csv.parse({ headers: true }))
//     // .on('error', error => console.error(error))
//     .on('data', row => { console.log(row); return data.push(row) })
// // .on('end', () => console.log(data));

// const reader = new FileReader();
// reader.onload = () => {
//     console.log(reader.result);
// }
// reader.readAsDataURL(fileInputElement.current.files[0]);


const csv = require('@fast-csv/parse');
const file =fs.readFileSync('./Iris.csv','utf-8');
var data=[];
csv.parseString(file, { headers: true })
    .on('error', error => console.error(error))
    .on('data', row => {data.push(row)})
    .on('end', rowCount => {console.log(`Parsed ${rowCount} rows`);console.log(data);});

console.log(data);
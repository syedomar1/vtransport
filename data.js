// import * as xlsx from 'xlsx';
// import fs from 'fs';

// // Function to extract data from Excel file
// function DataExtraction(filePath) {
//     console.log('Reading file:', filePath); // Debug statement
//     const fileData = fs.readFileSync(filePath);
//     const workbook = xlsx.read(fileData, { type: 'buffer' });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

//     // Filter out empty rows
//     const filteredData = data.filter(row => row.some(cell => cell !== ''));

//     // Extract bus routes and their data
//     const routes = {};
//     let currentRoute = '';
//     for (let i = 0; i < filteredData.length; i++) {
//         const row = filteredData[i];
//         if (row[0] && typeof row[0] === 'string' && row[0].startsWith('BUS ROUTE NO')) {
//             currentRoute = row[0];
//             if (!routes[currentRoute]) {
//                 routes[currentRoute] = [];
//             }
//         } else {
//             if (currentRoute && routes[currentRoute]) {
//                 const sno = parseInt(row[0]);
//                 if (!isNaN(sno) && row[0] !== 'SL.NO.') {
//                     routes[currentRoute].push({
//                         'SL.NO.': sno,
//                         'NAME OF THE STOPPING': row[1],
//                         'TIME A.M': row[2]
//                     });
//                 }
//             }
//         }
//     }
//     return routes;
// }

// // Function to write data to JSON file
// function writeJSONFile(data, outputPath) {
//     const jsonData = JSON.stringify(data, null, 2);
//     fs.writeFileSync(outputPath, jsonData);
//     console.log(`Data written to ${outputPath}`);
// }

// // Usage
// const filePath = "./data_routes/bus_timings.xlsx"; // Assuming the script and data are in the same directory
// console.log('File path:', filePath); // Debug statement
// const routesData = DataExtraction(filePath);
// console.log('Routes data:', routesData); // Debug statement

// const outputJSONPath = "./data_routes/routes_data.json";
// writeJSONFile(routesData, outputJSONPath);

import * as xlsx from 'xlsx';
import fs from 'fs';


// Function to extract data from a sheet object
function extractDataFromSheet(sheet) {
    // Convert the sheet to JSON format
    const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    let extractedData = [];

    // Iterate over each row in the JSON data
    jsonData.forEach(row => {
        // Check if the row is not empty
        if (row.length > 0) {
            // Extract relevant data and push it to the extractedData array
            extractedData.push({
                gate: row[0], // Assuming the first column is the gate
                routeNo: row[1], // Assuming the second column is the route number
                routeName: row[2], // Assuming the third column is the route name
                vendor: row[3], // Assuming the fourth column is the vendor
                order: row[4] // Assuming the fifth column is the order
            });
        }
    });

    // Remove the first two entries from the extractedData array
    extractedData.splice(0, 2);

    return extractedData;
}

function splitValuesToArray(extractedData) {
    const result = [];

    for (const item of extractedData) {
        const key = Object.keys(item)[0];
        const value = item[key];

        if (typeof value === 'string') {
            result.push({ [key]: value.split(',') });
        } else {
            result.push({ [key]: value });
        }
    }

    return result;
}

function extractDataFromSheet2(sheetData) {
    const dataRange = sheetData['!ref'].split(':');
    const [startCell, endCell] = dataRange;
    const [startColumn, startRow] = startCell.match(/[A-Z]+|\d+/g);
    const [endColumn, endRow] = endCell.match(/[A-Z]+|\d+/g);

    let extractedData = [];
    let currentHeader = '';

    const getNextColumn = (column) => {
        const lastChar = column.slice(-1);
        if (lastChar === 'Z') {
            return column.slice(0, -1) + 'AA';
        } else {
            return column.slice(0, -1) + String.fromCharCode(lastChar.charCodeAt(0) + 1);
        }
    };

    for (let row = parseInt(startRow); row <= parseInt(endRow); row++) {
        const columnHeaderCell = startColumn + row;
        const columnHeader = sheetData[columnHeaderCell]?.v;
        if (columnHeader) {
            currentHeader = columnHeader;
        }

        for (let col = getNextColumn(startColumn); col <= endColumn; col = getNextColumn(col)) {
            const cell = col + row;
            const cellData = sheetData[cell];
            let value = '';

            if (cellData && cellData.v !== undefined) {
                value = cellData.v;
            }

            if (row > parseInt(startRow)) {
                if (currentHeader && value.trim() !== '' && currentHeader !== 'LOCATION' && value !== 'ROUTE NUMBERS') {
                    let rowData = {};
                    rowData[currentHeader] = value;
                    extractedData.push(rowData);
                }
            }
        }
    }

    return splitValuesToArray(extractedData);
}

function extractDataFromSheet3(sheetData) {
    const result = [];
    const numRows = sheetData['!ref'].split(':')[1].match(/\d+/)[0];
    
    for (let i = 3; i <= numRows; i++) {
        const row = {};
        row['ROUTE NAME'] = sheetData[`A${i}`].v.trim();
        row['ORDER'] = sheetData[`B${i}`].v;
        row['GATE'] = sheetData[`C${i}`].v;
        result.push(row);
    }

    return result;
}

function extractDataFromSheet4(sheet) {
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Filter out empty rows
    const filteredData = data.filter(row => row.some(cell => cell !== ''));

    // Extract bus routes and their data
    const routes = {};
    let currentRoute = '';
    for (let i = 0; i < filteredData.length; i++) {
        const row = filteredData[i];
        if (row[0] && typeof row[0] === 'string' && row[0].startsWith('BUS ROUTE NO')) {
            currentRoute = row[0];
            if (!routes[currentRoute]) {
                routes[currentRoute] = [];
            }
        } else {
            if (currentRoute && routes[currentRoute]) {
                const sno = parseInt(row[0]);
                if (!isNaN(sno) && row[0] !== 'SL.NO.') {
                    routes[currentRoute].push({
                        'SL.NO.': sno,
                        'NAME OF THE STOPPING': row[1],
                        'TIME A.M': row[2]
                    });
                }
            }
        }
    }

    return routes;
}

// Function to extract data from Excel file
function DataExtraction(filePath,filePath2) {
    // console.log('Reading file:', filePath); // Debug statement
    // const fileData = fs.readFileSync(filePath);
    // const workbook = xlsx.read(fileData, { type: 'buffer' });
    // const sheetName = workbook.SheetNames[0];
    // const sheet = workbook.Sheets[sheetName];
    // const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const fileData=fs.readFileSync(filePath);
    const workbook=xlsx.read(fileData,{type:'buffer'});
    let sheets = [];
    sheets[0]=extractDataFromSheet(workbook.Sheets[workbook.SheetNames[0]]);
    sheets[1]=extractDataFromSheet(workbook.Sheets[workbook.SheetNames[1]]);
    //console.log(sheets[0]);
    //console.log(sheets[1]);
    sheets[2]=extractDataFromSheet2(workbook.Sheets[workbook.SheetNames[2]]);
    //console.log(sheets[2]);
    sheets[3]=extractDataFromSheet(workbook.Sheets[workbook.SheetNames[3]]);
    // console.log(sheets[3]);
    sheets[4]=extractDataFromSheet3(workbook.Sheets[workbook.SheetNames[4]]);
    //console.log(sheets[4]);
    //console.log(workbook.Sheets[workbook.SheetNames[4]]);
    const fileData2=fs.readFileSync(filePath2);
    const workbook2=xlsx.read(fileData2,{type:'buffer'});
    sheets[5]=extractDataFromSheet4(workbook2.Sheets[workbook2.SheetNames[0]]);
    console.log(sheets[5]);
}


// Function to write data to JSON file
function writeJSONFile(data, outputPath) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(outputPath, jsonData);
    console.log(`Data written to ${outputPath}`);
}

// Usage
const filePath2 = "./data_routes/bus_timings.xlsx"; // Assuming the script and data are in the same directory
const filePath="./data_routes/bus_locations.xlsx";
// console.log('File path:', filePath); // Debug statement
DataExtraction(filePath,filePath2);

 // Debug statement

// const outputJSONPath = "./data_routes/routes_data.json";
// writeJSONFile(routesData, outputJSONPath);

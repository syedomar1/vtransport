import * as xlsx from 'xlsx';
import fs from 'fs';

// Function to extract data from Excel file
export function DataExtraction() {
    const filePath = './data_routes/bus_timings.xlsx';
    console.log('Reading file:', filePath); // Debug statement
    
    try {
        const fileData = fs.readFileSync(filePath);
        
        const workbook = xlsx.read(fileData, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
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
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

const routesData = DataExtraction();
if (routesData) {
    Object.keys(routesData).forEach(route => {
        console.log('Route:', route); // Debug statement
    });
} else {
    console.log('Failed to extract data from file');
}

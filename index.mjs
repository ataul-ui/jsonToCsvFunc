
//import data from './sample_data/data.json' assert { type: 'json' };
import Papa from "papaparse";
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import createCsvWriter from 'csv-writer';

import fs from 'fs/promises'; // Use fs.promises for async file operations
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;



// Convert JSON to CSV
//const csvData = Papa.unparse(data.Bars, {
//    header: true, // Include headers in the CSV file
//});

app.use(bodyParser.json());

app.post('/download-csv', async (req, res) => {
    try {
        //make sure req body is defined
        if (!req.body || !req.body.Bars || !Array.isArray(req.body.Bars)) {
            throw new Error('Invalid JSON structure.');
        }

        const jsonData = req.body.Bars;

        //console.log('Received JSON data:', jsonData);

        if (!jsonData || jsonData.length === 0) {
            throw new Error('JSON data is empty or not an array.');
        }

        /*
        // Convert JSON to CSV
        const csvData = Papa.unparse(jsonData, {
            header: true, // Include headers in the CSV file
        });
        */

        // Log the generated CSV data
        //console.log('Generated CSV data:', csvData);

        

        // Set response headers for CSV file download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=data.csv');


        // Use path.join to create a cross-platform path
        const filePath = path.join(__dirname, 'data', 'data.csv');

        // Create a CSV writer
        const csvWriter = createCsvWriter.createObjectCsvWriter({
            path: filePath,
            header: Object.keys(jsonData[0]).map(key => ({ id: key, title: key })),
        });

        // Write the JSON data to the CSV file
        await csvWriter.writeRecords(jsonData);

        // Write the CSV content to the file
        //await fs.writeFile(filePath, csvData, 'utf8');

        //fs.writeFileSync(filePath, csvData, 'utf8');
        console.log('CSV file saved successfully:', filePath);

        

        res.status(200).send('check the data folder')


        /*
        console.log(jsonData)
        res.status(200).send('recieved the json payload')

        */



    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/download-csv`);
});


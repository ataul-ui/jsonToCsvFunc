
import Papa from "papaparse";
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import createCsvWriter from 'csv-writer';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;


app.use(bodyParser.json());


app.post('/download-csv', async (req, res) => {
    try {

        // This configures the payload in an acceptable format for the rest of the code
        // IF YOU'VE MADE CHANGES TO THE POSTMAN CODE, YOU'LL NEED TO CHANGE THIS AS WELL
        const jsonData = req.body.Bars;

        //This checks if the incoming json payload is in the proper format
        if (!jsonData || jsonData.length === 0) {
            throw new Error('JSON data is empty or not an array.');
        }

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


        //fs.writeFileSync(filePath, csvData, 'utf8');
        console.log('CSV file saved successfully:', filePath);

        

        res.status(200).send('check the data folder')





    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/download-csv`);
});


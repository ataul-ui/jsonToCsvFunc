
import data from './sample_data/data.json' assert { type: 'json' };
import Papa from "papaparse";
import express from 'express';
import fs from 'fs';
const app = express();
const port = 3000;


// Convert JSON to CSV
const csvData = Papa.unparse(data.Bars, {
    header: true, // Include headers in the CSV file
});

app.get('/download-csv', (req, res) => {
  
    // Set response headers for CSV file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
  
    // Pipe the CSV content to the response
    res.send(csvData);
  });
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


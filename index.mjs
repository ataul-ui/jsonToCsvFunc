
//import data from './sample_data/data.json' assert { type: 'json' };
import Papa from "papaparse";
import express from 'express';
import fs from 'fs';
const app = express();
const port = 3000;


// Convert JSON to CSV
//const csvData = Papa.unparse(data.Bars, {
//    header: true, // Include headers in the CSV file
//});

app.get('/download-csv', (req, res) => {
  
    const data = req.body;
    // Set response headers for CSV file download

    const csvData = Papa.unparse(jsonData, {
      header: true, // Include headers in the CSV file
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    console.log('data recieved and now being sent to download')
    console.log(data)
  
    // Pipe the CSV content to the response
    res.send(data);
  });
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/download-csv`);
});


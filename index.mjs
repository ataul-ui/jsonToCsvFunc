
import data from './sample_data/data.json' assert { type: 'json' };

import Papa from "papaparse";

import document from "document"

// Convert JSON to CSV
const csvData = Papa.unparse(data.Bars, {
    header: true, // Include headers in the CSV file
});
  
  // Create a Blob from the CSV data
const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.setAttribute('download', 'output.csv');
  
  // Append the link to the body and trigger the download
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
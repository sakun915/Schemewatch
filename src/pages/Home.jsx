import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';

const Home = () => {
  const [excelData, setExcelData] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  // Clear stale Excel data when Home is loaded
  localStorage.removeItem('excelData');
}, []);


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: null });

      const headerMap = {
        'sr no': 'Sr.No',
        'sr.no': 'Sr.No',
        'sr_no': 'Sr.No',
        'district': 'District Name',
        'district name': 'District Name',
        'block': 'Block Name',
        'block name': 'Block Name',
        'cluster': 'Cluster Name',
        'cluster name': 'Cluster Name',
        'school': 'School Name',
        'school name': 'School Name',
        'udise': 'Udise No',
        'udise no': 'Udise No',
        'udise code': 'Udise No',
        'headmaster': 'Head Master Name',
        'head master': 'Head Master Name',
        'head master name': 'Head Master Name',
        'principal': 'Head Master Name',
        'principal name': 'Head Master Name',
        'mobile': 'Mobile No',
        'mobile no': 'Mobile No',
        'mobile number': 'Mobile No',
        'phone': 'Mobile No'
      };

      const normalizedData = jsonData.map(row => {
        const newRow = {};

        Object.keys(row).forEach(originalHeader => {
          const lowerHeader = originalHeader.toLowerCase().trim();
          const standardHeader = headerMap[lowerHeader] || originalHeader;

          if (Object.values(headerMap).includes(standardHeader)) {
            let value = row[originalHeader];
            if (typeof value === 'string') {
              value = value.trim();
              if (value === '') value = null;
            }

            newRow[standardHeader] = value || null;
          }
        });

        return newRow;
      }).filter(row =>
        Object.values(row).some(val => val !== null && val !== '')
      );

      console.log('Processed Excel Data:', normalizedData);
      setExcelData(normalizedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = () => {
    localStorage.setItem('excelData', JSON.stringify(excelData));
    navigate('/analytics');
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload School Data
      </h2>

      {/* Upload UI */}
      <div className="bg-white border rounded-lg p-8 shadow mb-8 text-center">
        <img src="/upload.png" alt="Upload Icon" className="w-20 h-20 mx-auto mb-4" />
        <label
          htmlFor="file-upload"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition duration-200"
        >
          Choose Excel File
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
        />

        {selectedFileName && (
          <p className="mt-3 font-semibold text-gray-800">
            Selected File: {selectedFileName}
          </p>
        )}

        <p className="text-sm text-gray-600 mt-4">Supported format: <strong>.xlsx, .xls</strong></p>
        <p className="text-xs text-gray-500 mt-1">
          Make sure your Excel file includes columns like: Sr.No, District Name, Block Name, Cluster Name, etc.
        </p>
      </div>

      {/* Data Table */}
      <DataTable data={excelData} setData={setExcelData} />

      {/* Submit Button */}
      {excelData.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

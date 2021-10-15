import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import readXlsxFile from 'read-excel-file'
import styles from '../styles/Home.module.css';
import BootstrapTable from 'react-bootstrap-table-next';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [headers, setHeaders] = useState([])
  const [rows, setRows] = useState([])
  const handleInputFile = (e) => {
    readXlsxFile(e.target.files[0]).then((rows) => {
      let formattedHeaders = formatHeaders(rows[0])
      setHeaders(formattedHeaders);
      let formattedRows = []
      formattedRows = (rows.slice(1, rows.length)).map((row, idx) => {
        console.log(row, formattedHeaders[idx].dataField);
      let formattedCells = {}
        row.forEach((cell, cellIdx) => {
          formattedCells = {
            ...formattedCells,
            [formattedHeaders[cellIdx].dataField] : cell || "null"
          }
        })
        return formattedCells
      })
      console.log("formattedRows", formattedRows);
      setRows(formattedRows);
    })
  }

  console.log(rows, headers);


  return (
    <div className={styles.container}>
      <input onClick={(e) => {
        e.target.value = null;
      }} onChange={handleInputFile.bind(this)} type="file" />
     <div>

     </div>
     {!!headers?.length && <div className={styles.tableContainer}>

     <BootstrapTable keyField={headers[0].dataField} data={rows} columns={headers}  headerClasses ={styles.customRowClass} rowClasses ={styles.customRowClass}/>     </div>
    }</div>
  )
}
export default Home;



const formatRows = (cell, key) => {
  return { [key]: cell }
}


const formatHeaders = (headers) => {
  return headers.map((header) => {
    return {
      dataField: camelize(header),
      text: header
    }
  })
}


function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
import React, { Component, useRef, useState } from "react";
import ReactTable from 'react-table';
import Table from "./Table";
import './App.css';


function App() {
  const [state, setState] = useState({
    jobs: [],
    columns: [
      {
        Header: "Job Title",
        accessor: "job_title"
      },
      {
        Header: "Company",
        accessor: "company"
      },
      {
        Header: "Location",
        accessor: "location"
      },
      {
        Header: "Link",
        id: 'hyperlink',
        accessor: 'link',
        Cell: ({ value }) => (<a href={value} target="_blank">Go</a>)
      }],
  });

  const fileInputRef = useRef(null);

  const handleUploadImage = (e) => {
    e.preventDefault();

    const data = new FormData();

    if (fileInputRef?.current?.files) {
      const file = fileInputRef.current.files[0];
      const fileName = file.name;

      data.append('file', file);
      data.append('filename', fileName);
    }

    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        setState(state => ({ ...state, jobs: body['joblist'], keywords: body['keywords'] }));
      });
    });
  }

  return (
    <div>
      <h2>Upload your resume and check out your best matching jobs!</h2>
      <form onSubmit={handleUploadImage}>
        <input ref={fileInputRef} type="file" />
        <div>
          <button> Upload</button>
        </div>
      </form>
      <div>
        <br />
        {console.log(state.jobs)}

        <div>
          {/* { <ReactTable
            data = {state.jobs}
            columns= {state.columns}
            />}
          <Table jobs={this.state.jobs}/> */}
          <h1>jobs Table updated</h1>
        </div>
      </div>
    </div>
  )
}

export default App;
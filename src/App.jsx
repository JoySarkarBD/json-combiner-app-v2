import React, { useState } from "react";
import "./App.css";

function App() {
  const [textareas, setTextareas] = useState([""]); // Start with a single textarea
  const [error, setError] = useState("");
  const [combinedJson, setCombinedJson] = useState([]);
  const [downloadVisible, setDownloadVisible] = useState(false);

  const handleTextareaChange = (index, value) => {
    const newValues = [...textareas];
    newValues[index] = value;
    setTextareas(newValues);
  };

  const handleAddTextarea = () => {
    setTextareas([...textareas, ""]);
  };

  const handleConvert = () => {
    let json = [];
    let isValid = true;

    textareas.forEach((textarea) => {
      try {
        const jsonData = JSON.parse(textarea);
        json = [...json, ...jsonData]; // Merge the parsed JSON into the array
      } catch (e) {
        setError("Invalid JSON format");
        isValid = false;
      }
    });

    if (isValid) {
      setError("");
      setCombinedJson(json); // Update the combinedJson state
      setDownloadVisible(true);
    }
  };

  const handleDownload = () => {
    const jsonArrayString = JSON.stringify(combinedJson, null, 2); // The second argument adds indentation for formatting
    const jsonBlob = new Blob([jsonArrayString], { type: "application/json" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(jsonBlob);
    downloadLink.download = "converted.json";
    downloadLink.click();

    setTextareas([]);
    setCombinedJson([]); // Reset combinedJson to an empty array
    setDownloadVisible(false);
  };

  return (
    <div className='App'>
      <h1>JSON Converter App</h1>
      {textareas.map((value, index) => (
        <div key={index}>
          filed no : {index + 1}
          <textarea
            value={value}
            placeholder='Enter valid JSON here'
            onChange={(e) => handleTextareaChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddTextarea}>Add New Textarea</button>
      <button onClick={handleConvert}>Convert</button>
      {downloadVisible && (
        <button onClick={handleDownload}>Download JSON</button>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default App;

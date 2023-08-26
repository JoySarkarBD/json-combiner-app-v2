import { useState } from "react";
import "./App.css";

function App() {
  const [textareas, setTextareas] = useState([{ value: "", valid: true }]); // Start with a single textarea
  // Start with a single textarea
  const [error, setError] = useState("");
  const [combinedJson, setCombinedJson] = useState([]);
  const [downloadVisible, setDownloadVisible] = useState(false);

  const handleTextareaChange = (index, value) => {
    const newValues = [...textareas];
    try {
      const jsonData = JSON.parse(value);
      newValues[index] = { value, valid: true };
      setError("");
    } catch (e) {
      newValues[index] = { value, valid: false };
      setError("Invalid JSON format");
    }
    setTextareas(newValues);
  };

  const handleAddTextarea = () => {
    setTextareas([...textareas, { value: "" }]);
  };

  const handleRemoveTextarea = (index) => {
    const newValues = textareas.filter((_, i) => i !== index);
    setTextareas(newValues);
  };

  const handleConvert = () => {
    let json = [];
    let isValid = true;

    textareas.forEach(({ value }) => {
      try {
        const jsonData = JSON.parse(value);
        if (Array.isArray(jsonData)) {
          json = [...json, ...jsonData];
        } else {
          json.push(jsonData);
        }
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

    setTextareas([{ value: "" }]);
    setCombinedJson([]); // Reset combinedJson to an empty array
    setDownloadVisible(false);
  };

  const handleReset = () => {
    if (confirm("Are you sure.....?") == true) {
      setTextareas([{ value: "", valid: true }]);
      setError("");
      setCombinedJson([]);
      setDownloadVisible(false);
    }
  };

  return (
    <div className='relative overflow-x-auto'>
      <h1>JSON Combiner App</h1>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3 border '>
              Field No.
            </th>
            <th scope='col' className='px-6 py-3 border '>
              JSON Text
            </th>
            <th scope='col' className='px-6 py-3 border'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
          {textareas.map((textarea, index) => (
            <tr key={index}>
              <td
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border'>
                {index + 1}
              </td>
              <td
                scope='row'
                className={`px-6 py-4 font-medium whitespace-nowrap dark:text-white border ${
                  textarea.valid ? "" : "border-red-500"
                }`}>
                <textarea
                  className={`p-[10px] ${
                    textarea.valid ? "" : "border-red-500"
                  }`}
                  value={textarea.value}
                  rows={5}
                  placeholder='Enter valid JSON here'
                  onChange={(e) => handleTextareaChange(index, e.target.value)}
                />
                {!textarea.valid && (
                  <div className='text-red-500 mt-1'>Invalid JSON format</div>
                )}
              </td>
              <td
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border'>
                {textareas.length > 1 && (
                  <button onClick={() => handleRemoveTextarea(index)}>
                    Remove Textarea
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddTextarea}>Add New Textarea</button>
      <button onClick={handleConvert}>Convert</button>
      <button onClick={handleReset}>Reset All</button>
      {downloadVisible && (
        <button onClick={handleDownload}>Download JSON</button>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default App;

/* eslint-disable no-unused-vars */
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

  const handleRemoveTextarea = index => {
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
    <>
      <div className='container mx-auto'>
        {/* Title text */}
        <h1 className='text-white text-4xl lg:text-3xl font-bold text-center mt-9'>
          JSON Combiner App
        </h1>
        <div className='table_section overflow-x-auto mt-9 '>
          {/* Table */}
          <table className=' w-full border-separate border-spacing-1 border border-red-400 text-sm text-left text-gray-500 dark:text-gray-400 '>
            {/* Table head */}
            <thead className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th
                  scope='col'
                  className='px-3 py-3 border border-green-300 text-lg text-green-600 w-2/12'>
                  Field No.
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 border border-green-300 text-lg text-green-600 w-7/12'>
                  JSON Text Field
                </th>
                <th
                  scope='col'
                  className='px-3 py-3 border border-green-300 text-lg text-green-600 w-3/12'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=' bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              {textareas.map((textarea, index) => (
                <tr key={index}>
                  <td
                    scope='row'
                    className='px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border border-orange-300 w-2/12'>
                    {index + 1}
                  </td>
                  <td
                    scope='row'
                    className={`px-6 py-4 font-medium whitespace-nowrap dark:text-white border border-orange-300 w-7/12 ${
                      textarea.valid ? "" : "border-red-500"
                    }`}>
                    <textarea
                      className={`p-[10px] min-w-fit w-full min-h-[250px] h-full text-black ${
                        textarea.valid ? "" : "border-red-500"
                      }`}
                      value={textarea.value}
                      rows={5}
                      placeholder='Enter valid JSON here'
                      onChange={e =>
                        handleTextareaChange(index, e.target.value)
                      }
                    />
                    {!textarea.valid && (
                      <div className='text-red-500 mt-1 text-center text-base'>
                        Invalid JSON format
                      </div>
                    )}
                  </td>
                  {/* Remove Button */}
                  <td
                    scope='row'
                    className='px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border border-orange-300 w-3/12'>
                    {textareas.length > 1 && (
                      <div className='text-center'>
                        <button
                          className='rounded-lg bg-red-500 p-5 text-white'
                          onClick={() => handleRemoveTextarea(index)}>
                          Remove Textarea
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Button Groups */}
        <div className='flex justify-center items-center mt-9 gap-x-1.5'>
          <button
            className='rounded-lg bg-cyan-500 p-5 text-white'
            onClick={handleAddTextarea}>
            Add New Textarea
          </button>
          <button
            className='rounded-lg bg-blue-500 p-5 text-white'
            onClick={handleConvert}>
            Convert
          </button>
          <button
            className='rounded-lg bg-orange-500 p-5 text-white'
            onClick={handleReset}>
            Reset All
          </button>
          {downloadVisible && (
            <button
              className='rounded-lg bg-green-500 p-5 text-white'
              onClick={handleDownload}>
              Download JSON
            </button>
          )}
        </div>
        {/* Error msg */}
        {error && (
          <div className='text-center text-red-800 mt-9 font-semibold '>
            {error}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

import React from "react";

function DownloadButton({ jsonData }) {
  const downloadJsonFile = () => {
    const combinedData = jsonData.reduce((combined, input) => {
      try {
        const parsedData = JSON.parse(input);
        combined.push(...parsedData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      return combined;
    }, []);

    const blob = new Blob([JSON.stringify(combinedData)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "combined.json";
    a.click();
  };

  return (
    <button
      className='bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600 mt-2'
      onClick={downloadJsonFile}>
      Download Combined JSON
    </button>
  );
}

export default DownloadButton;

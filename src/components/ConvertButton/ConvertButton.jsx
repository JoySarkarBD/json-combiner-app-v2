import React from "react";

function ConvertButton({ onConvert }) {
  return (
    <button
      className='bg-lime-700 mt-2 text-white py-2 px-4 rounded hover:bg-lime-600'
      onClick={onConvert}>
      Convert
    </button>
  );
}

export default ConvertButton;

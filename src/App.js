import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "./App.css";

function numberToWords(number) {

  // Handle decimal numbers
  if (number % 1 !== 0) {
    return (
      numberToWords(Math.floor(number)) + " and " + numberToWords(number % 1)
    );
  }

  // Handle negative numbers
  if (number < 0) {
    return "negative " + numberToWords(-number);
  }

  // Handle numbers up to 7 digits in length
  if (number === 0) {
    return "zero";
  }
  if (number < 20) {
    return [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen"
    ][number - 1];
  }
  if (number < 100) {
    return (
      [
        null,
        "ten",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety"
      ][Math.floor(number / 10)] +
      (number % 10 ? " " + numberToWords(number % 10) : "")
    );
  }
  if (number < 1000) {
    return (
      numberToWords(Math.floor(number / 100)) +
      " hundred" +
      (number % 100 ? " and " + numberToWords(number % 100) : "")
    );
  }
  if (number < 100000) {
    return (
      numberToWords(Math.floor(number / 1000)) +
      " thousand" +
      (number % 1000 ? " " + numberToWords(number % 1000) : "")
    );
  }
  if (number < 10000000) {
    return (
      numberToWords(Math.floor(number / 100000)) +
      " lakh" +
      (number % 100000 ? " " + numberToWords(number % 100000) : "")
    );
  }
}

function App() {
  // State to store the number, the converted number, and the warning message
  const [number, setNumber] = useState("");
  const [numberInWords, setNumberInWords] = useState("");
  const [warning, setWarning] = useState("");

  // Update the number, the converted number, and the warning message as you type
  const handleChange = (event) => {
    const newNumber = event.target.value;
    setNumber(newNumber);
    if (newNumber.length <= 7) {
      setNumberInWords(numberToWords(newNumber));
      setWarning("");
    } else {
      setNumber(number.slice(0, 7));
      setWarning("Number must be 7 digits or less");
    }
  };

  // Render the component
  return (
    <div className="App">
      <TextField
        id="outlined-number"
        label="Enter the Number"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        value={number}
        onChange={handleChange}
      />
      <Typography
        inputProps={{ className: "warning-color" }}
        variant="caption"
        display="block"
        gutterBottom
      >
        {warning}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {numberInWords}
      </Typography>
      {/* <p style={{ color: "red" }}>{warning}</p> */}
    </div>
  );
}

export default App;

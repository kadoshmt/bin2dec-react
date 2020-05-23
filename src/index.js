import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default function App() {
  const [binaryText, setBinaryText] = useState('')
  const [decimalText, setDecimalText] = useState('0')
  const [errorMessage, setErrorMessage] = useState('')  

  // function called on submit form
  function converter(e) {
    e.preventDefault();
    
    // Make sure we accept only either 0 or 1
    if (binaryText.match(/^[0-1]+$/g) === null) {
      setErrorMessage('Enter either 0 or 1')
      return
    }

    setErrorMessage('') // Reset the error message

    const binaryReverse = binaryText
    .split('') // break each character as element in array
    .map(Number) // convert each element in array to number
    .reverse() // reverse the array elements

    const total = binaryReverse.reduce((acc, item, index) => {      
      return acc + item * Math.pow(2, index)            
    }, 0)

    setDecimalText(total)
  }

  return (
    <div className="container">
      <h1>Bin2Dec Converter</h1>
      <form onSubmit={converter}>
      <input value={binaryText} onChange={e => setBinaryText(e.target.value) } autoComplete="false" maxLength={8}  />
        {errorMessage &&  <div className="error">{errorMessage}</div>}
        <button>Convert to Decimal</button>
        <div className="result">{decimalText}</div>
      </form>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

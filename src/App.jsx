import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const passwordRef = useRef(null); // Reference to the input field

  // Function to copy the password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.readOnly = false; // Temporarily remove readOnly
      passwordRef.current.select(); // Select the entire password
      document.execCommand('copy'); // Copy the selected text

      // Provide feedback to the user (optional)
      passwordRef.current.readOnly = true; // Add back readOnly
      console.log("Password copied to clipboard");
    }
  }, [password]);

  // Function to generate the password
  const passwordGenerator = useCallback(() => {
    let pwd = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pwd += str.charAt(char);
    }
    setPassword(pwd);
  }, [length, characterAllowed, numberAllowed]);

  // Re-generate the password when options change
  useEffect(() => {
    passwordGenerator();
  }, [length, characterAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex flex-col justify-center px-8 py-12 mx-auto container bg-gray-500 w-9/12 my-20 shadow-md rounded-lg">
        <h1 className="text-center text-4xl text-white bg-gray-500">Random Password Generator</h1>
        <div className="flex justify-between items-center overflow-hidden">
          <input 
            ref={passwordRef} // Attach the ref to the input field
            type="text" 
            name="password" 
            value={password} 
            className="outline-none text-xl w-full px-3 py-1 mx-auto my-5 mt-9" 
            placeholder="Password" 
            readOnly // Make the input readOnly 
          />
          <button 
            type="button" 
            className="text-white bg-blue-700 text-xl px-5 py-1 my-auto hover:bg-blue-600 mt-9" 
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex items-center overflow-hidden">
          <div className="flex items-center overflow-hidden">
            <input 
              type="range" 
              name="length" 
              min={6} 
              max={20} 
              value={length} 
              onChange={(e) => setLength(Number(e.target.value))} 
              className="cursor-pointer" 
            />
            <label className="text-white text-xl px-3">Length: {length} </label>
          </div>

          <div className="flex items-center overflow-hidden px-7">
            <input 
              type="checkbox" 
              name="characterAllowed" 
              checked={characterAllowed} 
              onChange={(e) => setCharacterAllowed(e.target.checked)} 
              className="cursor-pointer" 
            />
            <label className="text-white text-xl px-2">Special Character {characterAllowed ? "✔️" : ""} </label>
          </div>

          <div className="flex items-center overflow-hidden px-3">
            <input 
              type="checkbox" 
              name="Numbers" 
              checked={numberAllowed} 
              onChange={(e) => setNumberAllowed(e.target.checked)} 
              className="cursor-pointer" 
            />
            <label className="text-white text-xl px-2">Numbers {numberAllowed ? "✔️" : ""} </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

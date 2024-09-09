import React from "react";
import "./styles.css";
import "./styles/tailwind-pre-build.css";
import { useState, useCallback, useEffect, useRef } from "react";
export default function App() {
  const [length, setLength] = useState(8);
  const [numaAll, setNumAll] = useState(false);
  const [charaAll, setcharAll] = useState(false);
  const [password, setPassword] = useState("");
  //useRef Hook
  const passwordRef = useRef(null);

  const PasswordGenrator = useCallback(() => {
    let pass = "";
    let char = "abcdefghijklmnopqrstuvwxyz";
    if (numaAll) char += "1234567890";
    if (charaAll) char += "!@$%^&*()_+{}";

    for (let i = 1; i <= length; i++) {
      let str = Math.floor(Math.random() * char.length + 1);

      pass += char.charAt(str);
    }
    setPassword(pass);
  }, [length, numaAll, charaAll, setPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    PasswordGenrator();
  }, [length, numaAll, charaAll]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white">Password genrator</h1>
        <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="outline-none bg-blue-700 text-white px- py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label> Length: ({length}) </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              defaultChecked={numaAll}
              id="numberInput"
              onChange={() => {
                setNumAll((prev) => !prev);
              }}
            />
            <label> Number: </label>
          </div>
          <div className="flex items-center gap-x-10">
            <input
              type="checkbox"
              defaultChecked={charaAll}
              id="numberInput"
              onChange={() => {
                setcharAll((prev) => !prev);
              }}
            />
            <label> Character: </label>
          </div>
        </div>
      </div>
    </>
  );
}

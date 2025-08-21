import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // useref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*_-=+{}[]~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 21);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6">
        <div className="w-full max-w-md mx-auto shadow-2xl rounded-2xl p-6 text-orange-400 
        bg-white/10 backdrop-blur-lg border border-white/20">
          
          {/* Title */}
          <h1 className="text-center text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-6">
            Password Generator
          </h1>

          {/* Password box */}
          <div className="flex shadow rounded-lg overflow-hidden mb-6 bg-gray-900/60 border border-gray-700">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-4 text-lg bg-transparent text-white placeholder-gray-400"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-4 py-2 transition-all duration-300"
            >
              Copy
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4 text-sm text-white">
            
            {/* Length */}
            <div className="flex items-center justify-between">
              <label className="font-medium">Length: <span className="text-pink-400">{length}</span></label>
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                className="cursor-pointer w-40 accent-pink-500"
                onChange={(e) => { setLength(e.target.value) }}
              />
            </div>

            {/* Numbers */}
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                className="h-5 w-5 accent-green-500 rounded-md"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="cursor-pointer">Include Numbers</label>
            </div>

            {/* Characters */}
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                className="h-5 w-5 accent-purple-500 rounded-md"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput" className="cursor-pointer">Include Special Characters</label>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App

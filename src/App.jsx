import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(7);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef()

  // becuase we have dependency and we will use it to other places
  // password generator method
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "aksjsdjwe0dkwodwodkwdkwfjienfSKOWMWSMWDEHDEBMXPSQWPS"

    if (numberAllow) str += "1234556789"
    if (charAllow) str += ")(*&^&^%}${#@$^[]*><?:"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllow, charAllow, setPassword]) //dependencies. if anyof this triggers then this state will run.

  const copyClip= useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,8)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllow, charAllow, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-pink-700 text-lime-600 '
      >
        <h1 className='text-white text-center'>Password GG Ma Man</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 my-5'>
          <input
            type=''
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyClip}
          className='outline-none bg-yellow-500 text-white px-3 py-1 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type='range'
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={numberAllow}
            id='numberInput'
            onChange={()=>{
              setNumberAllow((prev)=>!prev)
            }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked={charAllow}
            id='characterInput'
            onChange={()=>{
              setCharAllow((prev)=>!prev)
            }}
            />
            <label htmlFor='numberInput'>Charectures</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

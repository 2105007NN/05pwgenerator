import { useCallback, useEffect } from 'react';
import { useState, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [pass, setPass] = useState("");
  const passwordRef = useRef("");

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    let pass = "";
    if(isNumberAllowed === true) str += "0123456789";
    if(isCharAllowed == true) str += "@#$%^*(){}[]~/";

    for(let i = 0; i < length; i++){
      let indx = Math.floor(Math.random() * (str.length - 1));
      pass += str.charAt(indx);
    }

    setPass(pass);

  }, [length, isNumberAllowed, isCharAllowed]);

  let numberAllowedStr = isNumberAllowed? 'Allowed' : 'not allowed';
  let charAllowedStr = isCharAllowed? 'Allowed' : 'not allowed';

  function copyToClipboard(){
    
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }

  useEffect(passwordGenerator, [length, isCharAllowed, isNumberAllowed]);

  return (
    <div className='bg-black h-screen w-full flex justify-center text-white'>
      <div className='bg-gray-800 h-1/4 w-1/2 mt-10 rounded-lg'>

        {/* heading */}
        <h1 className='text-center text-xl my-3'>Password Generator</h1>

        {/* Display box and copy btn */}
        <div className='flex flex-wrap'>
          <input ref={passwordRef} type="text" value={pass} readOnly className='rounded-lg w-3/4 h-1/2 text-orange-600 text-xl ml-8 p-3' />
          <button className='text-white bg-blue-500 mx-2 rounded-xl w-20 p-2' onClick={copyToClipboard}>COPY</button>
        </div>


        <div className='m-3 flex flex-wrap gap-2'>

          {/* length slider */}
          <input type='range' min={4} max={20} defaultValue={8}
            onChange={(e) => { setLength(e.target.value);
              
             }} />
          <label className='mx-3 text-orange-300'>Length : {length}</label>

          {/* The checkBoxes */}
          <input type='checkbox' defaultChecked = {isNumberAllowed} onChange={(e) => {setIsNumberAllowed(e.target.checked);
            
          }}/>
          <label className='text-orange-300' >Number</label>

          <input type='checkbox' defaultChecked = {isCharAllowed} onChange={(e) => {setIsCharAllowed(e.target.checked);
            
          }}/>
          <label className='text-orange-300' >Special Characters</label>

        </div>

      </div>
    </div>
  )
}

export default App

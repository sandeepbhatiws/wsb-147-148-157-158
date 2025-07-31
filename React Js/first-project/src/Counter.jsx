import React, { useState } from 'react'

export default function Counter() {

    // var count = 2;
    let [count, setCount] = useState(5);

    const add = () => {
        count++;
        setCount(count)
        console.log(count);
    }

    const minus = () => {
        count--;
        setCount(count)
        console.log(count);
    }


  return (
    <div className='button'>
      <button onClick={ minus }>-</button>
      <button>{ count }</button>
      <button onClick={ add }>+</button>
    </div>
  )
}

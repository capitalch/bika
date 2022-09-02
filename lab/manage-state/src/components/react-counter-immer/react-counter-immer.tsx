import { useState } from "react";
import immer from 'immer'

function ReactCounterImmer() {
  const [counter, setCounter] = useState({ count: 0,name:'' });

  return (
    <div style={{ margin: "10px" }}>
      <div>React counter using useState hooks with immer</div>
      <div>{counter.count}</div>
      <button onClick={add}>Add</button>
      <button onClick={minus}>Minus</button>
    </div>
  );

  function add() {
    const newOne = immer(counter,(old:any)=>{
        old.count = old.count +1
    })
    setCounter(newOne)
    // setCounter((old: any) => ({
    //     ...old,
    //   count: old.count + 1,      
    // }));
  }

  function minus() {
    const newOne = immer(counter, (old:any)=>{
        old.count = old.count -1
    })
    setCounter(newOne)
  }
}

export { ReactCounterImmer };
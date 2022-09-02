import { useState } from "react";

function ReactCounter() {
  const [counter, setCounter] = useState({ count: 0,name:'' });

  return (
    <div style={{ margin: "10px" }}>
      <div>React counter using useState hooks</div>
      <div>{counter.count}</div>
      <button onClick={add}>Add</button>
      <button onClick={minus}>Minus</button>
    </div>
  );

  function add() {
    // counter.count = counter.count+1
    // setCounter({...counter})
    // or
    setCounter((old: any) => ({
        ...old,
      count: old.count + 1,      
    }));
  }

  function minus() {
    setCounter((old: any) => ({
        ...old,
      count: old.count - 1,      
    }));
  }
}

export { ReactCounter };

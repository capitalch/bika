import { useState } from "react";

function HookCounter() {
  const [counter, setCounter] = useState({ count: 0,name:'' });

  return (
    <div style={{ margin: "10px" }}>
      <div>Hook counter</div>
      <div>{counter.count}</div>
      <button onClick={add}>Add</button>
      <button onClick={minus}>Minus</button>
    </div>
  );

  function add() {
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

export { HookCounter };

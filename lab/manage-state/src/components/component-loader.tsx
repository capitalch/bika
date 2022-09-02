import { useRef, useState } from "react";
import { BasicCounter } from "./basic-counter/basic-counter";
import { ReactCounter } from "./react-counter/react-counter";
import { HookState } from "./hook-state/hookState";
import { RecoilCounter } from "./recoil-counter/recoil-counter";
import { ZustandCounter } from "./zustand-counter/zustand-counter";
import { ReactCounterImmer } from "./react-counter-immer/react-counter-immer";
import { ReactBasicArrayState } from "./react-basic-array-state/react-basic-array-state";
import { HookstateArray } from "./hookstate-array/hookstate-array";

function ComponentLoader() {
  const [, setRefresh] = useState({});
  const meta: any = useRef({
    component: <></>,
  });

  return (
    <div>
      <div>{meta.current.component}</div>
      <button onClick={loadHook}>Load React counter</button>
      <button onClick={loadReactCounterImmer}>Load React counter immer</button>
      <button onClick={loadBasic}>Load basic</button>
      <button onClick={loadZustand}>Load Zustand</button>
      {/* <button onClick={loadRecoil}>Load recoil</button> */}
      <button onClick={loadHookState}>Load Hookstate</button>
      <button onClick={loadReactBasicArrayState}>Load Array state</button>
      <button onClick={loadHookstateArray}>Load hook state Array</button>
    </div>
  );

  function loadBasic() {
    meta.current.component = <BasicCounter />;
    setRefresh({});
  }

  function loadZustand() {
    meta.current.component = <ZustandCounter />;
    setRefresh({});
  }

  function loadRecoil() {
    meta.current.component = <RecoilCounter />;
    setRefresh({});
  }

  function loadHook() {
    meta.current.component = <ReactCounter />;
    setRefresh({});
  }

  function loadReactCounterImmer() {
    meta.current.component = <ReactCounterImmer />;
    setRefresh({});
  }

  function loadHookState(){
    meta.current.component = <HookState />
    setRefresh({})
  }

  function loadReactBasicArrayState(){
    meta.current.component = <ReactBasicArrayState />
    setRefresh({})
  }

  function loadHookstateArray(){
    meta.current.component = <HookstateArray/>
    setRefresh({})
  }
  //   setRefresh({})
}
export { ComponentLoader };

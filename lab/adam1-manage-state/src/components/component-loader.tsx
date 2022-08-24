import { useRef, useState } from "react";
import { BasicCounter } from "./basic-counter/basic-counter";
import { HookCounter } from "./hook-counter/hook-counter";
import { HookState } from "./hook-state/hookState";
import { RecoilCounter } from "./recoil-counter/recoil-counter";
import { ZustandCounter } from "./zustand-counter/zustand-counter";

function ComponentLoader() {
  const [, setRefresh] = useState({});
  const meta: any = useRef({
    component: <></>,
  });

  return (
    <div>
      <div>{meta.current.component}</div>
      <button onClick={loadHook}>Load hook</button>
      <button onClick={loadBasic}>Load basic</button>
      <button onClick={loadZustand}>Load Zustand</button>
      <button onClick={loadRecoil}>Load recoil</button>
      <button onClick={loadHookState}>Load Hookstate</button>
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
    meta.current.component = <HookCounter />;
    setRefresh({});
  }

  function loadHookState(){
    meta.current.component = <HookState />
    setRefresh({})
  }

  //   setRefresh({})
}
export { ComponentLoader };

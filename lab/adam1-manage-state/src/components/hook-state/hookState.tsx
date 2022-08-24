import { useHookstate } from "@hookstate/core";
import produce from "immer";
import { globalState } from "./hook-state-hook";

function HookState() {
  const state: any = useHookstate(globalState);
  return (
    <div style={{ margin: "10px" }}>
      <div>Hookstate</div>
      <div>{state.count.get()}</div>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleMinus}>Minus</button>
      <button onClick={resetState}>Reset</button>
    </div>
  );

  function handleAdd() {
    state.count.set((old: any) => old + 1);
    // state.set((old: any) =>
    //   produce(old, (draft: any) => {
    //     draft.count = old.count + 1;
    //   })
    // );
  }

  function handleMinus() {
    state.count.set((old: any) => old - 1);
    // state.set((old: any) =>
    //   produce(old, (draft: any) => {
    //     draft.count = old.count - 1;
    //   })
    // );
  }

  function resetState() {
    state.set((old: any) => ({ count: 0 }));
  }
}
export { HookState };

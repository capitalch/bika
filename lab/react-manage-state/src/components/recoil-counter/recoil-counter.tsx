import { useRecoilState, useRecoilValue } from "recoil";
import { recoilStateAtom, useRecoilCounter } from "./recoil-counter-hook";

function RecoilCounter() {
  //   const { recoilStateAtom } = useRecoilCounter();
  const count = useRecoilValue(recoilStateAtom);
  const [_, setCount] = useRecoilState(recoilStateAtom);
  return (
    <div style={{ margin: "10px" }}>
      <div>Recoil counter</div>
      <div>{count}</div>
      <button onClick={add}>Add</button>
      <button onClick={minus}>Minus</button>
    </div>
  );

  function add() {
    setCount((old: number) => old + 1);
  }
  function minus() {
    setCount((old: number) => old - 1);
  }
}
export { RecoilCounter };

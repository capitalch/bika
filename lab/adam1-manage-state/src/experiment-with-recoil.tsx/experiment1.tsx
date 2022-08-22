import { useRecoilState } from "recoil";
import { addCount, experiment1State } from "./experiment-recoil";

function Experiment1() {
  const [getCount, setCount]: any = useRecoilState(addCount);

  return (
    <div>
      <div>{getCount.count}</div>
      <button onClick={setCount}>Add</button>
    </div>
  );
}
export { Experiment1 };

import { useRecoilState, useRecoilValue } from "recoil";
import { addCount, experiment1State, refNoSelector } from "./experiment-recoil";

function Experiment1() {
  const [getCount, setCount]: any = useRecoilState(addCount);
  const [getRefNo, setRefNo]: any = useRecoilState(refNoSelector);
  const experiment1Value = useRecoilValue(experiment1State)
  return (
    <div>
      {/* <div>{getCount.count}</div
      <button onClick={setCount}>Add</button> */}
      <input type="text" value={getRefNo} onChange={setRefNo} />
      <button onClick={showValue}>Show value</button>
    </div>    
  );
  function showValue(){
    // console.log(getRefNo)
    console.log(experiment1Value)
  }
}
export { Experiment1 };

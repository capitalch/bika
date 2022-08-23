import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { addCount, experiment1State, genericValueSelector, refNoSelector } from "./experiment-recoil";

function Experiment1() {
  const [, setRefresh] = useState({})
  const [getCount, setCount]: any = useRecoilState(addCount);
  const [state, setState]: any = useRecoilState(experiment1State)
  // const [getRefNo, setRefNo]: any = useRecoilState(refNoSelector);
  const [getGenericValue, setGenericValue] = useRecoilState(genericValueSelector)
  const experiment1Value = useRecoilValue(experiment1State)

  return (
    <div>
      {/* <div>{getCount.count}</div>
      <button onClick={setCount}>Add</button> */}
      <div>
        <span>{state.count}</span>
        <button onClick={() => {
          experiment1State.count = experiment1State.count + 1;
          // setState({ ...state, ...{ count: state.count + 1 } })
          // setState((old: any) => ({ ...old, ...{ count: old.count + 1 } }))
          // setState((old: any) => (Object.assign(old, { count: old.count + 1 })))
          setRefresh({});
        }}>Increase</button>
      </div>
      <input type="text" value={getGenericValue.refNo} onChange={(e: any) => { setGenericValue({ propName: 'refNo', e: e }) }} />
      <input type='text' value={getGenericValue.userRefNo} onChange={(e: any) => { setGenericValue({ propName: 'userRefNo', e: e }) }} />
      <button onClick={showValue}>Show value</button>
    </div>
  );
  function showValue() {
    // console.log(getRefNo)
    console.log(experiment1Value)
  }
}
export { Experiment1 };

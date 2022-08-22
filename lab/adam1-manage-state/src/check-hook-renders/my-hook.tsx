import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { atomicMethods, useSetAtomicMethods } from "./atomic-methods";

function useHook() {
  const [, setRefresh] = useState({});
  const dummy = { name: "abcd" };
  const setAtomicMethods = useSetRecoilState(atomicMethods);
  const methods: any = useRecoilValue(atomicMethods);
  const func: (a: string, b: any) => void = useSetAtomicMethods();
  useEffect(() => {
    // setAtomicMethods((old: any) => ({
    //     ...old,
    //     'hook:refresh': doRefresh
    // }))
    // setAtomicMethods({'hook:refresh': doRefresh})
    // setAtomicMethods({'hook:xyz':doNothing})
    // methods['hook:refresh'] = doRefresh
    // methods['hook:refresh1'] = doRefresh
    // methods.errors.main='abcd'
    func("hook:refresh1", doRefresh);
  }, []);

  return { dummy };

  function doRefresh() {
    setRefresh({});
  }

  function doNothing() {}
}
export { useHook };

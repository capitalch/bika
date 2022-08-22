import { atom, useSetRecoilState } from "recoil";

const atomicMethods = atom({
  key: "123456",
  default: {
    errors: {},
  },
  dangerouslyAllowMutability: true,
});

function useSetAtomicMethods() {
  const setMethods = useSetRecoilState(atomicMethods);
  return (methodKey: string, methodAction: any) => {
    setMethods((old: any) => ({
      ...old,
      [methodKey]: methodAction,
    }));
  };
}

export { atomicMethods, useSetAtomicMethods };

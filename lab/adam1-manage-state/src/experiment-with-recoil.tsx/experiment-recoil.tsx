import { atom, selector } from "recoil";

const experiment1State: any = atom({
  key: "1",
  default: {
    count: 0,
    refNo: "",
  },
});

const addCount = selector({
  key: "2",
  get: ({ get }) => get(experiment1State),
  set: ({ set, get }) => {
    const currState: any = get(experiment1State);
    set(experiment1State, { count: currState.count + 1 });
  },
});
const refNoSelector = selector({
  key: "3",
  get: ({ get }:any) => {
    return get(experiment1State).refNo;
  },
  set: ({ get, set }, e: any) => {
    const currState: any = get(experiment1State);
    // set(experiment1State,{...currState,{refNo:e.target.value}})
    set(experiment1State, { ...currState, ...{ refNo: e.target.value } });
  },

});

export { experiment1State, addCount, refNoSelector };

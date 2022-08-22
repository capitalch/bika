import { atom, selector } from "recoil";

const experiment1State: any = atom({
  key: "1",
  default: {
    count: 0,
  },
});

const addCount = selector({
  key: "2",
  get: ({ get }) => get(experiment1State),
  set: ({ set, get }) => {
    const currState:any = get(experiment1State);
    set(experiment1State, { count: currState.count + 1 });
  },
});
export{experiment1State,addCount}

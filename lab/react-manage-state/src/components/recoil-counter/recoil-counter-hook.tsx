import { atom } from "recoil";

function useRecoilCounter() {
  const recoilStateAtom = atom({
    key: 'xxx',
    default: 0,
  });

  return { recoilStateAtom };
}

const recoilStateAtom = atom({
    key: 'xxx',
    default: 0,
  });

export { useRecoilCounter, recoilStateAtom };

import "./App.css";
import { BasicCounter } from "./components/basic-counter/basic-counter";
import { ComponentLoader } from "./components/component-loader";
import { ZustandCounter } from "./components/zustand-counter/zustand-counter";
import { RecoilRoot } from "recoil";
import { Experiment1 } from "./experiment-with-recoil.tsx/experiment1";

function App() {
  return (
    // <BasicCounter />
    // <ZustandCounter />
    <RecoilRoot>
      <ComponentLoader />
      <Experiment1 />
    </RecoilRoot>
  );
}

export default App;

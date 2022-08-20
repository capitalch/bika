import "./App.css";
import { BasicCounter } from "./components/basic-counter/basic-counter";
import { ComponentLoader } from "./components/component-loader";
import { ZustandCounter } from "./components/zustand-counter/zustand-counter";
import { RecoilRoot } from "recoil";

function App() {
  return (
    // <BasicCounter />
    // <ZustandCounter />
    <RecoilRoot>
      <ComponentLoader />
    </RecoilRoot>
  );
}

export default App;

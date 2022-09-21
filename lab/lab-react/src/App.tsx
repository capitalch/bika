import './App.css';
import { Comp1Immer } from './components/comp1-immer';
import { ImmerUnderstand } from './components/immer-understand';
import { ObjectCounter } from './components/object-counter';
import { ValitoCounter2 } from './components/valito-counter2';
import { ValitoCounterReader, ValtioCounter } from './components/valtio-counter';

function App() {
  return (
    <div className="App">
      {/* <Comp1Immer />
      <ValtioCounter /> */}
      {/* <ValitoCounterReader /> */}
      {/* <ValitoCounter2 /> */}
      {/* <ObjectCounter /> */}
      <ImmerUnderstand />
    </div>
  );
}

export default App;

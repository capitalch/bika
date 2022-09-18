import './App.css';
import { Comp1Immer } from './components/comp1-immer';
import { ValitoCounter2 } from './components/valito-counter2';
import { ValitoCounterReader, ValtioCounter } from './components/valtio-counter';

function App() {
  return (
    <div className="App">
      <Comp1Immer />
      <ValtioCounter />
      <ValitoCounterReader />
      <ValitoCounter2 />
    </div>
  );
}

export default App;

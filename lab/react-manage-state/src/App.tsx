import './App.css'
import { BasicCounter } from './components/basic-counter/basic-counter'
import { ComponentLoader } from './components/component-loader'
import { ZustandCounter } from './components/zustand-counter/zustand-counter'
import { RecoilRoot } from 'recoil'
import { Experiment1 } from './experiment-with-recoil.tsx/experiment1'
import { ImmerExp } from './immer-experiment/immer-exp'
import { MaterialComp1 } from './material/material-comp1'
import { CssVarsProvider } from '@mui/joy'
import MiniDrawer from './material/mini-drawer'

function App() {
    return (
        <div>           
            <MiniDrawer />
            <MaterialComp1 />
        </div>
        // <BasicCounter />
        // <ZustandCounter />
        // <RecoilRoot>
        //   <ComponentLoader />
        //   <Experiment1 />
        //   <ImmerExp />
        // </RecoilRoot>
    )
}

export default App

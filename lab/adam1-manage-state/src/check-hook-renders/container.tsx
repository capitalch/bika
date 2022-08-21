import { Comp1, Comp2, Comp3 } from "./comps"

function Container() {
    return (
        <div style={{margin:'1rem'}}>
            <Comp1 />
            <Comp2 />
            <Comp3 />
        </div>
    )

}
export { Container }
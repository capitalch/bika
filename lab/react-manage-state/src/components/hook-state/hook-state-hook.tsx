import {createState, hookstate } from "@hookstate/core";

// const globalState = hookstate({
//     count: 0
// })
const globalState = createState({
    count:0
})
export {globalState}
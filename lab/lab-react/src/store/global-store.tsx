import { signal } from "@preact/signals-react"
import { AComponent } from "../components/signals/signal-counter"

const store: any = {
    count: signal(0),
    currentComponent: signal(AComponent),
    arr: signal([])
}

export { store }
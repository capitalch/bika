import { Box } from "@mui/system";
import { formComponents } from "./components/form-components";
import { ReactFormType } from "./interfaces";

function ReactForm({ jsonForm, store }: ReactFormType) {

    return (<Box>
        {
            jsonForm.items.map((item: any, index: number) => {
                const Tag = formComponents[item.type]
                const Comp = <Tag key={index} item={item} store = {store} />
                return (Comp)
            })
        }
    </Box>)
}

function ReactFormComponents({ items }: any) {
    return (items.map((item: any, index: number) => {
        return (formComponents[item.type])
    }))
}

export { ReactForm }


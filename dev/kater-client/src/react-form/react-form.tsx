import { Box } from "@mui/system";
import { formComponents } from "./components/form-components";
import { ReactFormType } from "./interfaces";

function ReactForm({ jsonForm }: ReactFormType) {
    // const jsonForm = JSON.parse(jsonText)

    return (<Box>
        {
            jsonForm.items.map((item: any, index: number) => {
                const Tag = formComponents[item.type]
                const Comp = <Tag key={index} />
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


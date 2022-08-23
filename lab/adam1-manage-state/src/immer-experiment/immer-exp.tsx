import produce from "immer"

function ImmerExp(){
    const sales = {
        tranDate: '',
        autoRefNo:'',
        userRefNo: '',
        billTo:{}
    }
    return(<div>
        <span>Immer</span>
        <button onClick={handleImmer}>Use immer</button>
    </div>)

    function handleImmer(){
        const sales1 = produce(sales,((draft:any)=>{
            draft.autoRefNo='abcd'
            draft.billTo.gstin='GGHFDD555432143'
        }))
        console.log(sales1)
    }
}

export {ImmerExp}
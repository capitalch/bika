import { BasicMaterialDialog } from '../../components/common/basic-dialog'
import { useHookstate } from '../../misc/redirect'
function UserLogIn() {
    const meta = useHookstate({
        dialogConfig: {
            showDialog: true,
            title: 'User login',
        },
    })
    return <BasicMaterialDialog meta={meta} />
}

export { UserLogIn }

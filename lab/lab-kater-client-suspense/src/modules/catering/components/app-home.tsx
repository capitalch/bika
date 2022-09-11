import { appMainHookState, Box, CircularProgress, Suspense, Typography, useAppGraphql, useEffect, useHookstate, useRef, useState } from '../../../misc/redirect'
import { useQuery, gql } from '@apollo/client'
import { useWrapGraphql } from './wrap-graphql-hook'
import { AppClientLoadingIndicator } from '../../../components/app-client/app-client-loading-indicator'
import { ErrorBoundary } from 'react-error-boundary'
function AppHome() {
    const [, setRefresh] = useState({})
    const { queryGraphql } = useAppGraphql()
    const meta: any = useRef({
        data: ''
    })
    const query = gql`
        query {
            appServer {
                genericView
            }
        }
    `
    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData(): Promise<any> {
        try {
            const ret = await queryGraphql(query)
            meta.current.data = ret.data.appServer.genericView[0].firstName
            setRefresh({})
            // console.log(ret)
        } catch (err: any) {
            console.log(err.message)
        }
    }

    return (<Box></Box>)
}

function MyApp() {
    const { wrapGraphQL } = useWrapGraphql()
    const query = () => gql`
        query {
            appServer {
                genericView
            }
        }
    `
    const data = wrapGraphQL(query())

    const Launches = ({ launches }: any) => {
        return (
            <div>
                {JSON.stringify(launches.read())}
            </div>
        )
    }

    function Fallback() {
        return (<div>Error</div>)
    }

    return (
        <Suspense fallback={<div><CircularProgress /></div>}>
            <ErrorBoundary FallbackComponent={Fallback}>
                <Launches launches={data} />
            </ErrorBoundary>
        </Suspense >
    )
}

export { AppHome, MyApp }

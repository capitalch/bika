import { useAppGraphql } from "../../../graphql/app-graphql-hook";

function useWrapGraphql() {
    const { getClient } = useAppGraphql()
    const client: any = getClient()

    const wrapGraphQL = (q: any) => {
        let status = "pending";
        let result: any = null;
        const suspender = client
            .query({
                query: q,
                fetchPolicy: "network-only"
            })
            .then((response: any) => {
                status = "success";
                result = response.data;
            })
            .catch((err: any) => {
                status = "error";
                result = err;
            });

        return {
            read() {
                if (status === "pending") {
                    throw suspender;
                } else if (status === "error") {
                    throw result;
                } else {
                    return result;
                }
            }
        };
    };

    return ({ wrapGraphQL })
}

export { useWrapGraphql }

export function getGraphqlUri() {
    if (process.env.GRAPHQL_SERVER_URL) {
        return process.env.GRAPHQL_SERVER_URL
    } else if (process.env.NODE_ENV === 'production') {
        return 'https://graphql-pokemon.now.sh'
    } else {
        return 'http://localhost:5000'
    }
}
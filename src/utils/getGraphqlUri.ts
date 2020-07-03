export function getGraphqlUri() {
    if (process.env.NODE_ENV === 'production') {
        return 'https://graphql-pokemon.now.sh'
    } else {
        return 'http://localhost:5000'
    }
}
import { gql } from 'apollo-boost'

export const GET_FIRST_FIELD_FROM_LOCAL = gql`
    query GetFirstFieldFromLocal {
        first @client
    }
`
import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { createApolloClient } from './graphql/createApolloClient'
import AppRouter from './components/AppRouter'

const { client, setPersistence } = createApolloClient()

export default function App() {
	
	const [ loaded, setLoaded ] = useState(false)

	useEffect(() => {
		setPersistence().finally(() => setLoaded(true))
	}, [])

	if (loaded) {
		return (
		  <ApolloProvider client={client}>
			  <AppRouter />
		  </ApolloProvider>
		)
	} else {
		return null
	}
}
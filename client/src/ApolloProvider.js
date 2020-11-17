import React from 'react'
import { ApolloProvider,InMemoryCache,createHttpLink} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import {
    ApolloClient,
  } from 'apollo-client'
  
import App from './App'

const httpLink=createHttpLink({
    uri:'http://localhost:4000/graphql'
    
})
const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

const client=new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})


export default (
<ApolloProvider client={client}>
    <App />
</ApolloProvider>
)



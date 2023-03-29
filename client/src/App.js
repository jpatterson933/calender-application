// import graph ql apollo client
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Shift } from './components/Shift';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Shift />
    </ApolloProvider>
  );
}

export default App;

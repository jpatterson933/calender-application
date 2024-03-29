// import graph ql apollo client
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Shift } from './components/Shift';
import CreateShift from './pages/CreateShift';
import { Week } from './components/Weeks';

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
      <CreateShift />
      <Week />
    </ApolloProvider>
  );
}

export default App;

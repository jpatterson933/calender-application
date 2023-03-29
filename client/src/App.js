import './App.css';

// import graph ql apollo client
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Shift } from './components/Shift';


const client = new ApolloClient({
  uri: '/graphql',
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

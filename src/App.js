import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Register from './components/Register';
import Hero from './components/Hero/Hero';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  request(operation) {
    const token = localStorage.getItem('token');
    console.log(token); 
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : null
      }
    });
  }
});

class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <ApolloProvider client={client}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <Register />
            <Hero id={1} />
          </div>
        </ApolloProvider>
      </React.StrictMode>
    );
  }
}

export default App;

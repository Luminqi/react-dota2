import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SignUp = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      jwt
    }
  }
`;
const SignIn = gql`
  mutation signin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      jwt
    }
  }
`;
class Register extends React.Component {
  state = {
    email: '',
    password: '',
  }
  handleChange = (field, e) => {
    this.setState({
      [field]: e.target.value
    });
  }
  handleSignUp = async (mutation, email, password) => {
    try {
      localStorage.removeItem('token');
      let res = await mutation({ variables: {
        email,
        password
      }});
      localStorage.setItem('token', res.data.signup.jwt);
    } catch (err) {
      console.log(err)
    }
  }
  handleSignIn = async (mutation, email, password) => {
    try {
      // localStorage.removeItem('token'); check jwt valid or not
      let res = await mutation({ variables: {
        email,
        password
      }});
      localStorage.setItem('token', res.data.login.jwt);
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const { email, password } = this.state
    return (
      <React.Fragment>
        <input type="text" placeholder="Email" value={email} onChange={e => this.handleChange('email', e)} />
        <input type="text" placeholder="Password" value={password} onChange={e => this.handleChange('password', e)} />
        <Mutation mutation={SignUp}>
          {(signup, { loading, error }) => (
            <button onClick={this.handleSignUp.bind(this, signup, email, password)}>Sign Up</button>           
          )}
        </Mutation>
        <Mutation mutation={SignIn}>
          {(login, { loading, error }) => (
            <button onClick={this.handleSignIn.bind(this, login, email, password)}>Sign In</button>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default Register;
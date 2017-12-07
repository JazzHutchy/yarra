import React, { Component } from 'react';
import SignInForm from './components/SignInForm'
import './App.css';
import { signIn, signOutNow } from './api/auth'
import { listProducts } from './api/products'
import { getDecodedToken } from './api/token'

class App extends Component {
  state = {
    decodedToken: getDecodedToken() // Restore the previous signed in data
  }

  onSignIn = ({ email, password }) => {
    console.log('App received', { email, password })
    signIn({ email, password })
      .then((decodedToken) => {
        console.log('signed in', decodedToken)
        this.setState({ decodedToken })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  render() {
    const { decodedToken } = this.state

    return (
      <div className="App">
        <h1>Yarra</h1>
        <h2 className="mb-3">Now Delivering: Shipping trillions of new products</h2>
        {
          !!decodedToken ? (
            <div>
              <p>Email: {decodedToken.email} </p>
              <p>Signed in at: {new Date(decodedToken.iat * 1000).toISOString()} </p>
              <p>Expire at: {new Date(decodedToken.exp * 1000).toISOString()} </p>
              <button onClick={this.onSignOut}>
                Sign Out
              </button>
            </div>
          ) : (
              <SignInForm
                onSignIn={this.onSignIn}
              />
            )
        }
      </div>
    )
  }

  // When this App first appears on screen
  componentDidMount() {
    listProducts()
      .then(products => {
        console.log(products)
      })
      .catch(error => {
        console.error('error loading products', error)
      })
  }
}

export default App;

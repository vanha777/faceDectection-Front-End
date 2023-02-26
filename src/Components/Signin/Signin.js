import React from 'react';
import { motion } from "framer-motion"

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  onSubmitSignIn = (e) => {
    e.preventDefault();
    fetch('http://localhost:777/signin', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8', },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then((res) => res.json())
      .then((res) => {
        if (res.id) {
          console.log(`welcome user id: ${res.id}`);
          this.props.loadUser(res);
          this.props.onRouteChange('home');
        } else {
          alert("wrong username or password");
        }
      })
      .catch((err) => console.log(`Front-end failed to fetch /signin, ${err}`));
  }



  render() {
    return (

      <motion.div className="br3 ba b--black-10 mt6 w-100 w-50-m w-25-l mw6 shadow-5 center"  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
        <main className="pa4 black-80" >
          <form className="measure" onSubmit={this.onSubmitSignIn}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email" id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
              </div>
            </fieldset>
            <div className="tc">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="sign in" />
            </div>
            <div className="lh-copy mt3 tc">
              <p onClick={() => this.props.onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
            </div>
          </form>
        </main>
      
      </motion.div>
      
    )
  }
}

export default Signin;
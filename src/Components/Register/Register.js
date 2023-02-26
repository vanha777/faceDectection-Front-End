import React from 'react';
import { motion } from "framer-motion"

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }
  onSubmitRegister = (e) => {
    e.preventDefault();
    if (this.state.email.trim() !== '' && this.state.password.trim() !== '') {
      fetch('http://localhost:777/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8', },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      }).then((res) => res.json())
        .then((res) => {
          if (res[1].value[0].name === this.state.name) {
            console.log(`welcome user: ${res[1].value[0].name}`);
            this.props.onRouteChange('home');
          } else {
            console.log("server not registering");
          }
        })
        .catch((err) => console.log(`Front-end failed to fetch /register, ${err}`));
    } else { alert("Invalid Email & Password") }
  }


  render() {
    return (

      <motion.div className="br3 ba b--black-10 mt6 w-100 w-50-m w-25-l mw6 shadow-5 center"  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}>
        <main className="pa4 black-80">
          <form className="measure" onSubmit={this.onSubmitRegister}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type='email' name="email" id="email" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
              </div>
            </fieldset>
            <div className="tc">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
            </div>
          </form>
        </main>
      </motion.div>
    )
  }


}

export default Register;
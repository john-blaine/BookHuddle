import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link, Redirect } from 'react-router-dom';
import Signup from './Signup.jsx';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      signup: false
    }
    this.onChange = this.onChange.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.signupView = this.signupView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      console.log(response);
      statusChangeCallback(response);
    });
  }

  signupView() {
    this.setState({
      signup: true
    })
  }

  onChange(e) {
    let target = e.target.name;
    this.setState ({
      [ target ]: e.target.value
    });
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.auth(() => {
      this.setState({
        isLoggedIn: true
      });
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<Redirect to='/dashboard' />)
    }
    return (
      <div>
         {this.state.signup && <Signup />}
         {!this.state.signup &&
         <div  className="centerize">
      
      
            <h1> Login </h1>
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                  <input type="email" className="form-control" id="inputEmail3" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange}/>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                </div>
              </div>
              
              <div className="form-group row">
                <div className="col-sm-10 centerize">
                  <Link to='/dashboard'>
                    <button className="centerize" id="button1" type="submit" onClick={this.handleSubmit}>Sign in</button>
                  </Link>
                  </div>
                  <div className="centerize"><p> Not a member?  <a href="#" onClick={this.signupView}>Create an Account!</a></p></div> 
                 

                
              </div>
       <div className="centerize"><a href="/auth/facebook" className="btn btn-primary"><span className=" fa fa-facebook"></span> Facebook</a></div>
            </form>
          </div>}
        </div>
    );
  }
}

export default Login;

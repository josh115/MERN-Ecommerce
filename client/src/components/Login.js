import React, { Component } from 'react';

class Login extends Component {
    render(){
        return(
            <div className="container login">
                <form>
                    <div className="form-row">
                        <div className="form-group col-12 col-sm-6">
                            <label htmlFor="firstname">First Name</label>
                            <input type="text" className="form-control" placeholder="First name"/>
                        </div>
                        <div className="form-group col-12 col-sm-6">
                            <label htmlFor="lastname">Last Name</label>
                            <input type="text" className="form-control" placeholder="Last name"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" placeholder="Password"/>
                    </div>
                    <div className="form-group row justify-content-center mt-4">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    };
}

export default Login;
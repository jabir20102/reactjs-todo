import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        name:'',
        email: '',
        password: '',

        name_error: '',
        email_error: '',
        password_error: ''
    }
    register = async () => {
        this.setState({email_error:''});
        this.setState({password_error:''});
        this.setState({name_error:''});
        
        // const response = await fetch('http://jabirkhan2022.herokuapp.com/api/products');
        // let response = await fetch('http://jabirkhan2022.herokuapp.com/api/register', {
            let response = await fetch('http://127.0.0.1:8000/api/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        });
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            console.log(message);
            if (response.status == 400) {
                response = await response.json();
                // console.log(response.errors.name);
                if(response.errors.name)
                this.setState({ name_error: response.errors.name[0] })
                if (response.errors.password)
                this.setState({ password_error: response.errors.password[0] })
                if(response.errors.email)
                this.setState({ email_error: response.errors.email[0] })
               
            }

        }
        // response = await response.json();
        // console.log(response);
    }
    render() {

        return (
            <div>

                <main id="main" class="main-site left-sidebar">

                    <div class="container">

                        <div class="wrap-breadcrumb">
                            <ul>
                                <li class="item-link"><a href="#" class="link">home</a></li>
                                <li class="item-link"><span>register</span></li>
                            </ul>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-sm-6 col-md-6 col-xs-12 col-md-offset-3">
                                <div class=" main-content-area">
                                    <div class="wrap-login-item ">
                                        <div class="login-form form-item form-stl">
                                            {/* <form name="frm-login"> */}
                                            <fieldset class="wrap-title">
                                                <h3 class="form-title">Register to your account</h3>
                                            </fieldset>
                                            <fieldset class="wrap-input">
                                                <label for="frm-register-uname">Full Name:</label>
                                                <input onChange={e => this.setState({ name: e.target.value })} type="text" id="frm-register-uname" name="email" placeholder="Type your email address" />
                                                <span className='text-danger'>{this.state.name_error ? this.state.name_error : ''}</span>
                                            </fieldset>
                                            <fieldset class="wrap-input">
                                                <label for="frm-login-uname">Email Address:</label>
                                                <input onChange={e => this.setState({ email: e.target.value })} type="text" id="frm-login-uname" name="email" placeholder="Type your email address" />
                                                <span className='text-danger'>{this.state.email_error ? this.state.email_error : ''}</span>
                                            </fieldset>
                                            <fieldset class="wrap-input">
                                                <label for="frm-login-pass">Password:</label>
                                                <input onChange={e => this.setState({ password: e.target.value })} type="password" id="frm-login-pass" name="pass" placeholder="************" />

                                                <span className='text-danger'>{this.state.password_error ? this.state.password_error : ''}</span>
                                            </fieldset>

                                            <button onClick={this.register} class="btn btn-submit" >Register</button>
                                            {/* </form> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        )
    }
}

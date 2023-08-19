import React, { useState } from 'react';
import { useNavigate,NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NetflixLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIspasswordValid] = useState(false);
    const navigate = useNavigate();

    // Function to handle form submission
    const raw = JSON.stringify({
        email: email, // Assuming 'email' is the value from the state
        password: password, // Assuming 'password' is the value from the state
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const setCookie = (name, value, days) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
        const cookieValue = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; expires=' + expirationDate.toUTCString() + '; path=/';
        document.cookie = cookieValue;
    };


    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        // redirect: 'follow',
    };

    const handleSignIn = () => {
        // Your API request code here...

        fetch('http://localhost:5000/api/auth/signin', requestOptions)
            .then((response) => {
                return response.text();
            })
            .then((result) => {
                // Process the API response and check if it is successful
                const responseObj = JSON.parse(result);
                if (!responseObj.error) {
                    setCookie('token', responseObj.token, 1);
                    localStorage.setItem('token', responseObj.token);
                    // Login successful, show success message
                    toast.success('Login successful', {
                        onClose: () => {
                            navigate('/');
                        },
                    });
                } else {
                    // Login failed, show error message
                    toast.error('Invalid email or password');
                }
            })
            .catch((error) => {
                console.log('error', error);
                // Show an error message
                toast.error('Error occurred during login');
            });
    };

    // Function to validate email address on input text change and enable the submit button if it's true
    const validateEmail = () => {
        const re = /\S+@\S+\.\S+/;
        const result = re.test(email);
        setIsEmailValid(result);
    };
    const validatePassword = () => {
        // Password must have at least one uppercase letter, one lowercase letter, and be at least four characters long
        const re = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const result = re.test(password);
        setIspasswordValid(result);
    };

    return (
        <main id={'login'} style={{ padding: '0px 10px' }}>
            <header className="d-flex space-between middle-align">
                <a href="/">
                    <img
                        src="./images/logo.PNG"
                        height="50px"
                        width="170px"
                        alt="site logo main"
                        style={{ margin: 'auto' }}
                    />
                </a>
            </header>
            <section id="login-form-section">
                <div className="loginContainer d-flex direction-column">
                    <p>⚠ Do not enter your personal information.</p>
                    <h2 className="formtitle">Sign In</h2>
                    <div id="loginForm" className="d-flex direction-column">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="email"
                            placeholder="Email or phone number"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail();
                            }}
                            required
                        />
                        <p
                            id="errorEmail"
                            style={{ display: isEmailValid ? 'none' : 'block' }}
                        >
                            Please enter a valid email address or phone number.
                        </p>

                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatePassword();
                            }}
                            required
                        />
                        <p id="errorPassword"
                           style={{ display: isPasswordValid ? 'none' : 'block' }}>
                            Your password must contain between 8 and 60 characters and should have at least one capital and one small char.
                        </p>

                        <button
                            onClick={handleSignIn}
                            className="button submitButton"
                            disabled={!isEmailValid || !isPasswordValid}
                        >
                            Sign In
                        </button>

                        <div className="rememberMe">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="rememberMe"
                                className="rememberMe"
                            />
                            <label htmlFor="rememberMe">
                <span className="login-remember-me-label-text">
                  Remember me
                </span>
                            </label>
                        </div>
                        <p className="signUpText para">
                            New to Netflix?{' '}
                            <span className="signUp">
                <NavLink to="/register">Sign up Now</NavLink>
              </span>
                        </p>
                        <p className="bottomMessage para">
                            This page is protected by Google reCAPTCHA to ensure you're not a
                            bot
                        </p>
                    </div>
                    <ToastContainer />
                </div>
            </section>
        </main>
    );
};

export default NetflixLogin;

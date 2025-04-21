import React, { useState } from 'react';
import './LoginForm.css';
import 'boxicons';
import { useDispatch } from 'react-redux';
import { enableZoneMainPanel, enableZoneSignUpPage } from '../../redux/AppUIStateReducer';
import { setToken } from '../../redux/authSlice';
import { saveUserName } from '../../redux/previewStateReducer';

// import { someLoginAction } from '../actions'; // Optional: Your redux action

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("hello")
        const { username, password } = formData;
        dispatch(saveUserName(username));
        try{
            const response = await fetch("https://portfolio-builder-sii7.onrender.com/api/login",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            const data = await response.json();
            if(response.ok && data.token){
                console.log("Logged in successfully", data);

                dispatch(setToken(data.token));
                dispatch(enableZoneMainPanel());

                onLogin?.();
            }else{
                console.error("Login failed", data);
                alert("Invalid credentials");
            }

        }catch(error){
            console.error("Login error: ", error);
            alert("Login error. Please try again.");
        }

    };
    const handleSignUp=()=>{
        // e.preventDefault();
        dispatch(enableZoneSignUpPage());
    }

    return (
        <div className='login-page-wrapper'>
            <div className='form_container'>
                <span className='animation'></span>

                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input">
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="text">Username</label>
                            <box-icon name='envelope' type='solid' color='#ffffff'></box-icon>
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <box-icon name='lock-alt' type='solid' flip='horizontal' color='#ffffff'></box-icon>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" />Remember me</label>
                        </div>
                        <button type="submit" className='login-btn'>Login</button>
                        <div className="register">
                        <p>
                            Don't have an account?
                            <button type="button" className='login-btn' onClick={()=>handleSignUp()}>
                                Sign Up
                            </button>
                        </p>
                        </div>
                    </form>
                </div>

                <div className='info-text login'>
                    <h2>Welcome Back!</h2>
                    <p>Hello!</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

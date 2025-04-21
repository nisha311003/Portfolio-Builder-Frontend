import React, { useState } from 'react';
import './Signup.css';
import 'boxicons';
import { enableZoneLoginPanel } from '../../redux/AppUIStateReducer';
import { useDispatch } from 'react-redux';

const SigningUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const handleValidation = (e) => {
        const { name, value } = e.target;
        let tempErrors = { ...errors };

        switch (name) {
            case 'email':
                tempErrors.email =
                    value.length === 0
                        ? 'Email is required'
                        : !/\S+@\S+\.\S+/.test(value)
                            ? 'Email is invalid'
                            : '';
                break;
            case 'password':
                tempErrors.password =
                    value.length === 0 ? 'Password is required' : '';
                break;
            default:
                break;
        }

        setFormData({ ...formData, [name]: value });
        setErrors(tempErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (errors.email === '' && errors.password === '') {
            const { username, email, password } = formData;
            console.log('Email:', email);
            console.log('Password:', password);

            fetch("https://portfolio-builder-sii7.onrender.com/api/register", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ username, email, password })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    dispatch(enableZoneLoginPanel());
                });
        }
    };

    return (
        <div className='body'>
            <div className='form_container'>
                <span className='animation2'></span>
                <div className='form signing'>
                    <form onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        <div className="input">
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleValidation}
                                required
                            />
                            <label htmlFor="text">Username</label>
                            <box-icon name='user' type='solid' color='#ffffff'></box-icon>
                        </div>
                        <div className="input">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleValidation}
                                required
                            />
                            <label htmlFor="text">Email</label>
                            {errors.email && (
                                <span style={{ color: 'rgba(186, 10, 1, 0.81)' }}>{errors.email}</span>
                            )}
                            <box-icon name='envelope' type='solid' color='#ffffff'></box-icon>
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleValidation}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            {errors.password && (
                                <span style={{ color: 'rgba(186, 10, 1, 0.81)' }}>{errors.password}</span>
                            )}
                            <box-icon name='lock-alt' type='solid' flip='horizontal' color='#ffffff'></box-icon>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" />Remember me</label>
                        </div>
                        <button type="submit" className='signup-btn'>Sign Up</button>
                    </form>
                </div>
                <div className='info-text signing'>
                    <h2>Welcome Back!</h2>
                    <p>Hello!</p>
                </div>
            </div>
        </div>
    );
};

export default SigningUp;

import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
const Login = () => {
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(""); 
    const [password, setPassword] = useState(""); 
    const userKey = 'username';

    useEffect(() => {
        const user = localStorage.getItem(userKey);
        if (user) {
            setUsername(user);
        }
    }, []);

    const handleLogin = async () => {
        if (!name || !password) {
            alert('Please enter both username and password.');
            return;
        }

        try {
            console.log('Attempting to login');
            const response = await fetch('http://localhost:5000/api/v1/weather/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: name, password:password }) 
            });

            if (response.ok) {
                localStorage.setItem('username', name);
                setUsername(name);
                setPassword(""); 
                setName(""); 
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.error);
                alert('Login failed: ' + errorData.error);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while trying to log in.');
        } 
    }

    const handleRegister= async ()=>{
        if (!name || !password) {
            alert('Please enter both username and password.');
            return;
        }
        try {
            console.log('Attempting to register');
            const response = await fetch('http://localhost:5000/api/v1/weather/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: name, password:password }) 
            });

            if (response.ok) {
                localStorage.setItem('username', name);
                setUsername(name);
                setPassword(""); 
                setName(""); 
            } else {
                const errorData = await response.json();
                console.error('Register failed:', errorData.error);
                alert('Register failed: ' + errorData.error);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while trying to register.');
        } 
    }

    const logout = () => {
        localStorage.removeItem('username');
        setUsername(null);
    }

    return ( 
        <>
            <Navbar /> 
            {username ? (
                <div className="logged-in-container">
                    <h3> user-info:</h3>
                    <div style={{display:'flex' ,width:' 150px',justifyContent:'space-between'}}><p>username:</p> <p>{username}</p></div>
                    <button className="button-3" onClick={logout}>Logout</button> 
                </div>
            ) : (
                <div className="login-container">
                    <div style={{display:'flex'}}>
                        <input
                        type="text"
                        placeholder="Username..."
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        className="login-input"
                    />
                    <input
                        type="password"
                        placeholder="Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        className="login-input mx-2"
                    /></div>
                    <button onClick={handleLogin} className="login-button">Login</button>
                    <button onClick={handleRegister} className="login-button">Register</button>
                </div>
            )}
        </>
    );
}

export default Login;

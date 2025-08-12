import React, {useState} from "react";
import '../style/login.css'; // Assuming you have a CSS file for styling
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import {Mail, Lock, Eye, EyeOff} from "lucide-react";

import Logo from "/logo.jpg";



interface loginData {
    email: string;
    password: string
}


const Login: React.FC = () => {
    const [formData, setFormData] = useState<loginData>({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const [error, setError] = useState<string>("");
    // const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
    }

    return (
       <div className="login-container">
            <img src={Logo} alt="" />
            <h2>Authentification</h2>
            {/* {error && <p className="error">{error}</p>} */}
            <form onSubmit={handleSubmit}>
                <label>Email :</label>
                <div className="input-group">
                    <Mail size={20} className="icon" />
                    <input type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} required />
                </div>
                
                <label>Mot de passe :</label>
                <div className="input-group">
                    <Lock size={20} className="icon" />
                    <input type={showPassword ? "text" : "password"} 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} required />
                    <span
                        className="toggle-eye"
                        onClick={() => setShowPassword((prev) => !prev)}
                        >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>

                </div>
                
                <button type="submit">Se connecter</button>
            </form>
        </div> 
    )
}

export default Login;
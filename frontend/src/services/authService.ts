// import axios from "axios";
import api from "./api";

export interface loginData {
    email: string;
    password: string;
}

export const login = async (data: loginData) => {
    const res = await api.post("/encadrant/login", data);
    
    // stocker le token dans le localStorage
    localStorage.setItem("token", res.data.token);

    return res.data;
}

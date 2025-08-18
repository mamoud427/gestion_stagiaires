import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const BtnLogout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Logique de déconnexion ici, par exemple, supprimer le token d'authentification
        localStorage.removeItem("token");
        // Rediriger vers la page de connexion
        navigate("/");
    };

    return (
        <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={18} />
            Se Déconnecter
        </button>
    );
}

export default BtnLogout;
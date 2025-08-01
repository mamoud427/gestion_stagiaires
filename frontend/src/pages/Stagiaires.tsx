import { useEffect, useState } from "react";
import api from "../services/api";

interface Stagiaire {
    _id: string;
    nom: string;
    prenom: string;
    email: string;

}

export default function Stagiaires() {
    const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);

    useEffect(() => {
        api.get("/stagiaires")
            .then((res) => setStagiaires(res.data))
            .catch((err) => console.error("Erreur de chargement stagiaires:", err));
    }, []);

    return (
        <div>
            <h2>Liste des stagiaires </h2>
            <ul>
                {stagiaires.map((stagiaire) => (
                    <li key={stagiaire._id}>
                        {stagiaire.nom} {stagiaire.prenom} - {stagiaire.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

import { useState, useEffect} from "react";
import { encadreurService } from "../services/encadreurService";
import '../style/form_ajout.css';

export interface StagiaireForm {
    _id?: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    theme: string;
    dateDebut: string;
    dateFin: string;
    encadrant: string;
}

interface FormulaireAjoutProps {
    initialData?: StagiaireForm; // pour le mode édition
    onSubmit?: (data: StagiaireForm) => Promise<void>; // callback externe
    onClose?: () => void; // fermeture du modal
}

const FormulaireAjout: React.FC<FormulaireAjoutProps> = ({
    initialData,
    onSubmit,
    onClose
}) => {
    const [stagiaire, setStagiaire] = useState<StagiaireForm>(
        initialData || {
            nom: "",
            prenom: "",
            email: "",
            telephone: "",
            theme: "",
            dateDebut: "",
            dateFin: "",
            encadrant: "",
        }
    );

    const [encadrants, setEncadrants] = useState<{ id: number; nom: string }[]>([]);

    useEffect(() => {
        const fetchEncadreurs = async () => {
            try {
                const data = await encadreurService.getAll();
                setEncadrants(data);    
            } catch (error) {
                console.log("erreur  du chargement ", error);
            }
        };

        fetchEncadreurs();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setStagiaire(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (onSubmit) {
            // mode personnalisé (édition ou ajout via parent)
            await onSubmit(stagiaire);
            onClose?.();
        } else {
            // mode par défaut (ajout direct)
            try {
                const response = await fetch("http://localhost:5000/api/stagiaires/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(stagiaire)
                });
                if (!response.ok) throw new Error("Erreur lors de l'ajout du stagiaire");
                const data = await response.json();
                console.log("Stagiaire ajouté:", data);

                setStagiaire({
                    nom: "",
                    prenom: "",
                    email: "",
                    telephone: "",
                    theme: "",
                    dateDebut: "",
                    dateFin: "",
                    encadrant: "",
                });

                onClose?.();
            } catch (error) {
                console.error("Erreur lors de l'ajout du stagiaire:", error);
            }
        }
        if (onClose) onClose();
    };

    return (
        <div className="form-container">
            <h2>{initialData ? "Modifier un stagiaire" : "Ajouter un stagiaire"}</h2>
            <form onSubmit={handleSubmit}>
                {[
                    { label: "Nom", name: "nom", type: "text" },
                    { label: "Prénom", name: "prenom", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Téléphone", name: "telephone", type: "tel" },
                    { label: "Thème", name: "theme", type: "text" },
                    { label: "Date de Début", name: "dateDebut", type: "date" },
                    { label: "Date de Fin", name: "dateFin", type: "date" }
                ].map((field) => (
                    <div
                        className={`form-group ${(field.name === "nom" || field.name === "prenom") ? "inline-fields" : ""}`}
                        key={field.name}
                    >
                        <label htmlFor={field.name}>{field.label}:</label>
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={stagiaire[field.name as keyof StagiaireForm]}
                            onChange={handleChange}
                            required={field.name !== "theme"}
                        />
                    </div>
                ))}

                <div className="form-group">
                    <label htmlFor="encadrant">Encadrant:</label>
                    <select
                        id="encadrant"
                        name="encadrant"
                        value={stagiaire.encadrant}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Sélectionner un encadrant --</option>
                        {encadrants.map((encadrant) => (
                            <option key={encadrant.id} value={encadrant.nom}>
                                {encadrant.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-btn">
                    {initialData ? "Enregistrer les modifications" : "Ajouter"}
                </button>
            </form>
        </div>
    );
};

export default FormulaireAjout;

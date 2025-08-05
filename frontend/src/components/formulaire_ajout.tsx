import { useState } from "react";
import '../style/form_ajout.css'; // Assuming you have a CSS file for styling

interface StagiaireForm {
    nom: string;
    prenom: string;
    email: string;
    dateNaissance: string;
    telephone: string | number; // Assuming telephone can be a string or number
    adresse: string;
    ville: string;
    theme?: string;
    dateDebut: string;
    dateFin: string;
}
const FormulaireAjout: React.FC = () => {

    const [stagiaire, setStagiaire] = useState<StagiaireForm>({
        nom: "",
        prenom: "",
        email: "",
        dateNaissance: "",
        telephone: "",
        adresse: "",
        ville: "",
        theme: "",
        dateDebut: "",
        dateFin: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStagiaire((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/stagiaires", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(stagiaire)
            });
            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du stagiaire");
            }
            const data = await response.json();
            console.log("Stagiaire ajouté:", data);
            // Reset form or redirect as needed
            setStagiaire({
                nom: "",
                prenom: "",
                email: "",
                dateNaissance: "",
                telephone: 0,
                adresse: "",
                ville: "",
                theme: "",
                dateDebut: "",
                dateFin: ""
            });
        } catch (error) {
            console.error("Erreur lors de l'ajout du stagiaire:", error);
        }
    }


    return (
         <div className="form-container">
      <h2>Ajouter un stagiaire</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Nom", name: "nom", type: "text" },
          { label: "Prénom", name: "prenom", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Date de Naissance", name: "dateNaissance", type: "date" },
          { label: "Téléphone", name: "telephone", type: "tel" },
          { label: "Adresse", name: "adresse", type: "text" },
          { label: "Ville", name: "ville", type: "text" },
          { label: "Thème", name: "theme", type: "text" },
          { label: "Date de Début", name: "dateDebut", type: "date" },
          { label: "Date de Fin", name: "dateFin", type: "date" },
        ].map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>{field.label}:</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={stagiaire[field.name as keyof StagiaireForm]}
              onChange={handleChange}
              required={field.name !== "theme"} // facultatif pour theme
            />
          </div>
        ))}

        <button type="submit" className="submit-btn">Ajouter</button>
      </form>
    </div>
        // <div>
        //     <h2>Formulaire d'ajout de stagiaire</h2>
        //     <form onSubmit={handleSubmit}>
                
        //         <div>
        //             <label htmlFor="nom">Nom:</label>
        //             <input type="text"
        //                     id="nom" 
        //                     name="nom"
        //                     value={stagiaire.nom}
        //                     onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label htmlFor="prenom">Prénom:</label>
        //             <input type="text" 
        //                     id="prenom" 
        //                     name="prenom" 
        //                     value={stagiaire.prenom}
        //                     onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label htmlFor="email">Email:</label>
        //             <input type="email" 
        //                     id="email" 
        //                     name="email" 
        //                     value={stagiaire.email}
        //                     onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label htmlFor="dateNaissance">Date de Naissance:</label>
        //             <input type="date" 
        //                     id="dateNaissance" 
        //                     name="dateNaissance" 
        //                     value={stagiaire.dateNaissance}
        //                     onChange={handleChange}
        //                     required />
        //         </div>
        //         <div>
        //             <label htmlFor="telephone">Téléphone:</label>
        //             <input type="tel" 
        //                     id="telephone" 
        //                     name="telephone" 
        //                     value={stagiaire.telephone}
        //                     onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label htmlFor="adresse">Adresse:</label>
        //             <input type="text" 
        //                     id="adresse" 
        //                     name="adresse"
        //                     value={stagiaire.adresse}
        //                     onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label htmlFor="ville">Ville:</label>
        //             <input type="text" 
        //                     id="ville" 
        //                     name="ville"
        //                     value={stagiaire.ville}
        //                     onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label htmlFor="theme">Thème:</label>
        //             <input type="text"
        //                    id="theme" 
        //                    name="theme"
        //                    value={stagiaire.theme}
        //                    onChange={handleChange}/>
        //         </div>
        //         <div>
        //             <label htmlFor="dateDebut">Date de Début:</label>
        //             <input type="date" 
        //                     id="dateDebut" 
        //                     name="dateDebut"
        //                     value={stagiaire.dateDebut}
        //                     onChange={handleChange} required />
        //         </div>
        //         <div>
        //             <label htmlFor="dateFin">Date de Fin:</label>
        //             <input type="date" 
        //                     id="dateFin" 
        //                     name="dateFin"
        //                     value={stagiaire.dateFin}
        //                     onChange={handleChange} required />
        //         </div>

        //         <button type="submit">Ajouter Stagiaire</button>
        //     </form>
        // </div>
    );
}

export default FormulaireAjout;
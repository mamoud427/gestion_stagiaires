// import { useState } from "react";
// import '../style/form_ajout.css'; // Assuming you have a CSS file for styling
// import React, { useEffect } from "react";

// interface EncadreurForm {
//     nom: string;
//     prenom: string;
//     email: string;
//     password: string;
//     telephone: string;
//     poste: string;
//     role: string;
// }
// const FoemulaireAjoutEncadrant: React.FC = () => {

//     const [encadreur, setEncadreur] = useState<EncadreurForm>({
//         nom: "",
//         prenom: "",
//         email: "",
//         password: "",
//         telephone: "",
//         poste: "",
//         role: ""
//     });

//     const [encadrants, setEncadrants] = useState<{ id: number; nom: string }[]>([]);

//     useEffect(() => {
//         fetch("http://localhost:5000/api/encadrant")
//             .then(res => res.json())
//             .then(data => setEncadrants(data))
//             .catch(err => console.error(err));
//     }, []);


//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         const { name, value } = e.target;
//         setEncadreur((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };


//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:5000/api/encadrant", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(encadrants)
//             });
//             if (!response.ok) {
//                 throw new Error("Erreur lors de l'ajout du Encadreur");
//             }
//             const data = await response.json();
//             console.log("Encadreur ajouté:", data);
//             // Reset form or redirect as needed
//             setEncadreur({
//                 nom: "",
//                 prenom: "",
//                 email: "",
//                 password: "",
//                 telephone: "",
//                 poste: "",
//                 role: ""
//             });
//         } catch (error) {
//             console.error("Erreur lors de l'ajout du Encadreur:", error);
//         }
//     }


//     return (
//         <div className="form-container">
//             <h2>Ajouter un Encadreur</h2>
//             <form onSubmit={handleSubmit}>
//                 {[
//                     { label: "Nom", name: "nom", type: "text" },
//                     { label: "Prénom", name: "prenom", type: "text" },
//                     { label: "Email", name: "email", type: "email" },
//                     { label: "Password", name: "password", type: "password" },
//                     { label: "Téléphone", name: "telephone", type: "tel" },
//                     { label: "poste", name: "poste", type: "text" },
//                 ].map((field) => (
//                     <div
//                         className={`form-group ${(field.name === "nom" || field.name === "prenom") ? "inline-fields" : ""}`}
//                         key={field.name}
//                     >
//                         <label htmlFor={field.name}>{field.label}:</label>
//                         <input
//                             type={field.type}
//                             id={field.name}
//                             name={field.name}
//                             value={encadreur[field.name as keyof EncadreurForm]}
//                             onChange={handleChange}
//                             required={field.name !== "theme"}
//                         />
//                     </div>
//                 ))}
//                 {/* Role en Select */}
//                 <div className="form-group">
//                     <label htmlFor="role">Role:</label>
//                     <select
//                         name="role"
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">-- Sélectionner un role --</option>
//                             <option value="superadmin">
//                                 Super Admin
//                             </option>
//                             <option value="admin">
//                                 Admin
//                             </option>
//                             <option value="encadreur">
//                                 Encadreur
//                             </option>
//                     </select>
//                 </div>

//                 <button type="submit" className="submit-btn">Ajouter</button>
//             </form>
//         </div>

//     );
// }

// export default FoemulaireAjoutEncadrant;

import React, { useState } from "react";
import api from "../services/api";
// import { Encadreur } from "../pages/Encadreurs"; // ou définir l’interface séparément

interface Encadreur {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone: string;
    poste: string;
    role: boolean;
}
interface FormulaireAjoutProps {
  initialData?: Encadreur; // optionnel (utile quand tu modifies)
  onSubmit?: (data: Encadreur) => Promise<void> | void; 
  onClose?: () => void;
}

const FormulaireAjout: React.FC<FormulaireAjoutProps> = ({
  initialData,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<Encadreur>(
    initialData || {
      _id: "",
      nom: "",
      prenom: "",
      email: "",
      password: "",
      telephone: "",
      poste: "",
      role: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      await onSubmit(formData);
    } else {
      // Cas ajout (si onSubmit non passé)
      try {
        await api.post("/encadrant", formData);
        alert("Encadreur ajouté !");
      } catch (err) {
        console.error("Erreur ajout", err);
      }
    }

    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="formAjout">
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={formData.nom}
        onChange={handleChange}
      />
      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        value={formData.prenom}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="text"
        name="telephone"
        placeholder="Téléphone"
        value={formData.telephone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="poste"
        placeholder="Poste"
        value={formData.poste}
        onChange={handleChange}
      />

      <button type="submit" className="btn-save">
        {initialData ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
};

export default FormulaireAjout;

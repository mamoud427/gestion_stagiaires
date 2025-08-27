import React, { useState } from "react";
import { encadreurService} from "../services/encadreurService";
// import { Encadreur } from "../pages/Encadreurs"; // ou définir l’interface séparément

interface Encadreur {
    // _id: string;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone: string;
    poste: string;
    role: string;
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
      nom: "",
      prenom: "",
      email: "",
      password: "",
      telephone: "",
      poste: "",
      role: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      await onSubmit(formData);console.log(formData);
    } else {
      // Cas ajout (si onSubmit non passé)
      try {
        await encadreurService.create(formData);
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
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="">-- Sélectionner un rôle --</option>
        {/* <option value="SuperAdmin">Super Admin</option> */}
        <option value="Admin">Admin</option>
        <option value="Encadreur">Encadreur</option>
      </select>


      <button type="submit" className="btn-save">
        {initialData ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
};

export default FormulaireAjout;

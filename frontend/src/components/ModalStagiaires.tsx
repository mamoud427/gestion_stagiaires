import React from "react";

interface Stagiaire {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  theme: string;
  dateDebut: string;
  dateFin: string;
  encadrant?: string;
}

interface ModalProps {
  stagiaire: Stagiaire | null;
  onClose: () => void;
}

const ModalStagiaire: React.FC<ModalProps> = ({ stagiaire, onClose }) => {
  if (!stagiaire) return null;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "-";
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-md shadow-lg p-6 w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btnExit absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Fermer le modal"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Détails du stagiaire</h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Nom :</strong> {stagiaire.nom}
          </p>
          <p>
            <strong>Prénom :</strong> {stagiaire.prenom}
          </p>
          <p>
            <strong>Email :</strong> {stagiaire.email}
          </p>
          <p>
            <strong>Téléphone :</strong> {stagiaire.telephone}
          </p>
          <p>
            <strong>Thème :</strong> {stagiaire.theme}
          </p>
          <p>
            <strong>Date de début :</strong> {formatDate(stagiaire.dateDebut)}
          </p>
          <p>
            <strong>Date de fin :</strong> {formatDate(stagiaire.dateFin)}
          </p>
          <p>
            <strong>Encadrant :</strong> {stagiaire.encadrant}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalStagiaire;

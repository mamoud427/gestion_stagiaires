import React from "react";

interface Encadreur {
  // _id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  poste: string;
  role: string;
}

interface ModalProps {
  encadreur: Encadreur | null;
  onClose: () => void;
}

const ModalEncadreur: React.FC<ModalProps> = ({ encadreur, onClose }) => {
  if (!encadreur) return null;

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
          className="btnExit absolute top-3 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Fermer le modal"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Détails de l'encadreur</h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Nom :</strong> {encadreur.nom}
          </p>
          <p>
            <strong>Prénom :</strong> {encadreur.prenom}
          </p>
          <p>
            <strong>Email :</strong> {encadreur.email}
          </p>
          <p>
            <strong>Téléphone :</strong> {encadreur.telephone}
          </p>
          <p>
            <strong>Poste :</strong> {encadreur.poste}
          </p>
          <p>
            <strong>Rôle :</strong> {encadreur.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalEncadreur;

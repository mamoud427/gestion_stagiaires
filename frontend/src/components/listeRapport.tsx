import React, { useEffect, useState } from "react";
import axios from "axios";
// import { PreviewAttestation} from "./previewAttestation";

import "../style/listeRapport.css";

interface Rapport {
  _id: string;
  stagiaire: { nom: string; prenom: string }; // à adapter selon ton modèle
  filename: string;
  uploadDate: string;
}

const ListeRapports: React.FC = () => {
  const [rapports, setRapports] = useState<Rapport[]>([]);

  const handleDownload = (id: string) => {
    window.open(`http://localhost:5000/api/attestations/${id}/pdf`, "_blank");
  };

  useEffect(() => {
    const fetchRapports = async () => {
      try {
        const res = await axios.get<Rapport[]>(
          "http://localhost:5000/api/rapports"
        );
        setRapports(res.data);
        // console.log(res.data)
      } catch (err) {
        console.error("Impossible de récupérer les rapports." + err);
      }
    };
    fetchRapports();
  }, []);

  return (
    <div className="rapport-container">
      <h2 className="title">Liste des rapports</h2>
      {rapports.length === 0 ? (
        <p>Aucun rapport disponible.</p>
      ) : (
        <ul className="list">
          {rapports.map((rapport) => (
            <li key={rapport._id} className="item">
              <div>
                <p className="nom">
                  <span>Rapport de stage de </span>
                  {rapport.stagiaire?.nom ?? "Inconnu"}{" "}
                  {rapport.stagiaire?.prenom ?? ""}
                </p>
                <p className="date">
                  {new Date(rapport.uploadDate).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <button
                // href={`http://localhost:5000/api/rapports/${rapport._id}/download`}
                className="link"
                onClick={() => handleDownload(rapport._id)}
              >
                Télécharger
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListeRapports;

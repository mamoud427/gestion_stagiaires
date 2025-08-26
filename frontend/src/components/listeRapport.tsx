import React, { useEffect, useState } from "react";
import axios from "axios";

import "../style/listeRapport.css";

interface Rapport {
  _id: string;
  stagiaire: { nom: string; prenom: string }; // à adapter selon ton modèle
  filename: string;
  createdAt: string;
}

const ListeRapports: React.FC = () => {
  const [rapports, setRapports] = useState<Rapport[]>([]);

  useEffect(() => {
    const fetchRapports = async () => {
      const res = await axios.get("http://localhost:5000/api/rapports");
      setRapports(res.data);
    };
    fetchRapports();
  }, []);

  return (
    <div className="rapport-container">
      <h2 className="title">Liste des rapports</h2>
{/* 
      {rapports.length === 0 ? (
        <p>Aucun rapport disponible.</p>
      ) : ( */}
        <ul className="list">
            <li
              // key={rapport._id}
              className="item"
            >
              <div>
                <p className="nom">
                  <span>Rapport de stage de </span>Mamoud bao
                </p>
                <p className="date">
                  08/02/2024
                </p>
              </div>
              <a
                className="link"
              >
                Télécharger
              </a>
            </li><li
              // key={rapport._id}
              className="item"
            >
              <div>
                <p className="nom">
                  <span>Rapport de stage de </span>Mamoud bao
                </p>
                <p className="date">
                  08/02/2024
                </p>
              </div>
              <a
                className="link"
              >
                Télécharger
              </a>
            </li><li
              // key={rapport._id}
              className="item"
            >
              <div>
                <p className="nom">
                  <span>Rapport de stage de </span>Mamoud bao
                </p>
                <p className="date">
                  08/02/2024
                </p>
              </div>
              <a
                className="link"
              >
                Télécharger
              </a>
            </li><li
              // key={rapport._id}
              className="item"
            >
              <div>
                <p className="nom">
                  <span>Rapport de stage de </span>Mamoud bao
                </p>
                <p className="date">
                  08/02/2024
                </p>
              </div>
              <a
                className="link"
              >
                Télécharger
              </a>
            </li><li
              // key={rapport._id}
              className="item"
            >
              <div>
                <p className="nom">
                  <span>Rapport de stage de </span>Mamoud bao
                </p>
                <p className="date">
                  08/02/2024
                </p>
              </div>
              <a
                className="link"
              >
                Télécharger
              </a>
            </li>
          {rapports.map((rapport) => (
            <li
              key={rapport._id}
              className="item"
            >
              <div>
                <p className="nom">
                  <span>Rapport de stage de </span>
                  {rapport.stagiaire?.nom} {rapport.stagiaire?.prenom}
                </p>
                <p className="date">
                  {new Date(rapport.createdAt).toLocaleDateString()}
                </p>
              </div>
              <a
                href={`http://localhost:5000/api/rapports/${rapport._id}/download`}
                className="link"
              >
                Télécharger
              </a>
            </li>
          ))}
        </ul>
      {/* )} */}
    </div>
  );
};

export default ListeRapports;

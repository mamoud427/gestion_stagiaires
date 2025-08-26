import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { stagiaireService } from "../services/stagiaireService";

import { UploadCloud, File } from 'lucide-react';
import "../style/upload.css";

const UploadRapport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [stagiaireId, setStagiaireId] = useState("");
  const [stagiaire, setStagiaire] = useState<{ _id: number; nom: string; prenom: string }[]>([]);
  const [message, setMessage] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // const handleChange = (
  //       e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  //   ) => {
  //       const { name, value } = e.target;
  //       setStagiaire(prev => ({
  //           ...prev,
  //           [name]: value,
  //       }));
  //   };

  const handleUpload = async () => {
    if (!file || !stagiaire) {
      setMessage("Veuillez sélectionner un stagiaire et un fichier !");
      return;
    }

    const formData = new FormData();
    formData.append("rapport", file);
    // formData.append("stagiaireNom");


  };

  useEffect(() => {
    const fetchStagiaires = async () => {
      try {
        const res = await stagiaireService.getAll()
        setStagiaire(res); // stocke les stagiaires pour le select
      } catch (err) {
        console.error("Erreur fetch stagiaires", err);
      }
    };

    fetchStagiaires();
  }, []);

  return (
    <div className="upload-container">
      <h2 className="title">Uploader un rapport</h2>

      {/* Sélection du stagiaire */}
        <label htmlFor="stagiaire" className="nomStag">Nom du stagiaire:</label>
        <select
            className="select"
            id="stagiaire"
            name="stagiaire"
            value={stagiaireId}
            onChange={(e) => setStagiaireId(e.target.value)}
            required
        >
            <option value="" >-- Sélectionner un stagiaire --</option>
            {stagiaire.map((stagiaire) => (
                <option key={stagiaire._id} value={stagiaire._id}>
                    {stagiaire.nom}
                </option>
            ))}
        </select>

      {/* Zone de drop */}
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
         {/* <UploadCloud size={100}/> */}
        <input {...getInputProps()} />
        {file ? (
          <>
            <File size={100}/>
            <p>{file.name}</p>
          </>
        ) : (
          <>
            <UploadCloud size={100}/>
            <p>Glissez-déposez un fichier ici, ou cliquez pour sélectionner</p>
          </>
        )}
      </div>

      <button
        onClick={handleUpload}
        className="button"
      >
        Envoyer
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UploadRapport;

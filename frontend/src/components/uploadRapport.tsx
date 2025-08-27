import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { stagiaireService } from "../services/stagiaireService";
import axios from 'axios';

import { UploadCloud, File } from 'lucide-react';
import "../style/upload.css";

interface UploadRapportProps {
  stagiaireId?: string;
}

const UploadRapport: React.FC<UploadRapportProps> = () => {
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


  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //   }
  // };

  const handleUpload = async () => {
    if (!file || !stagiaire) {
      setMessage("Veuillez sélectionner un stagiaire et un fichier !");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    // formData.append("stagiaireNom");

    //  pour la récuperation des rapports
    try {
     await axios.post(
      `http://localhost:5000/api/rapports/${stagiaireId}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setMessage("Upload de rapport réussi ");
  } catch (error) {
    console.error(error);
    setMessage("Erreur lors de l'upload");
  }


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

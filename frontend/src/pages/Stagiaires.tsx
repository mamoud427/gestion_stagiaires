import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pen, Trash, Eye, Plus } from "lucide-react";
import { format } from "date-fns";

import FormulaireAjout from "../components/formulaire_ajout";
import ModalStagiaire from "../components/ModalStagiaires";

// Appel de la liaison API
import { stagiaireService } from "../services/stagiaireService";

import "../style/liste.css";
import "../style/form_ajout.css";

interface Stagiaire {
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

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "lightblue",
      color: "black",
      fontWeight: "bold",
    },
  },
};

export default function Stagiaires() {
  const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);
  const [records, setRecords] = useState<Stagiaire[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedStagiaire, setSelectedStagiaire] = useState<Stagiaire | null>(null);

  // Charger les stagiaires
  const fetchStagiaires = async () => {
    try {
      const res = await stagiaireService.getAll();
      setStagiaires(res);
    } catch (error) {
      console.error("Erreur fetch stagiaires", error);
    }
  };

  useEffect(() => {
    fetchStagiaires();
  }, []);

  useEffect(() => {
    setRecords(stagiaires);
  }, [stagiaires]);

  // Recherche
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = stagiaires.filter((s) =>
      s.nom.toLowerCase().includes(query)
    );
    setRecords(filtered);
  };

  // Ajouter
  // const handleAdd = async (data: StagiaireF) => {
  //   try {
  //     await stagiaireService.create(data);
  //     alert("Stagiaire ajouté avec succès");
  //     setShowAddModal(false);
  //     fetchStagiaires();
  //     setShowAddModal(false);
  //     fetchStagiaires();
  //   } catch (error) {
  //     console.error("Erreur ajout", error);
  //   }
  // };

  // Modifier
  const handleEdit = async (data: Stagiaire) => {
    if (!selectedStagiaire?._id) return;
    try {
      const result = await stagiaireService.update(selectedStagiaire._id, data);
      if (result) alert("Stagiaire modifié avec succès");
      setShowEditModal(false);
      setSelectedStagiaire(null);
      fetchStagiaires();
    } catch (error) {
      console.error("Erreur modification", error);
    }
  };

  // Supprimer
  const handleDelete = async () => {
    if (!selectedStagiaire?._id) return;
    try {
      const result = await stagiaireService.delete(selectedStagiaire._id);
      if (result) alert("Stagiaire supprimé avec succès");
      setShowDeleteModal(false);
      setSelectedStagiaire(null);
      fetchStagiaires();
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

  const columns = [
    { name: "N°", cell: (row: Stagiaire, index: number) => index + 1, sortable: true },
    { name: "Nom", selector: (row: Stagiaire) => row.nom, sortable: true },
    { name: "Prénom", selector: (row: Stagiaire) => row.prenom, sortable: true },
    { name: "Email", selector: (row: Stagiaire) => row.email },
    {
      name: "Date début",
      cell: (row: Stagiaire) => format(new Date(row.dateDebut), "dd/MM/yyyy"),
    },
    {
      name: "Date fin",
      cell: (row: Stagiaire) => format(new Date(row.dateFin), "dd/MM/yyyy"),
    },

    {
      name: "Actions",
      cell: (row: Stagiaire) => (
        <div className="flex gap-2">
          <span
            className="btn-info cursor-pointer"
            onClick={() => {
              setSelectedStagiaire(row);
              setShowViewModal(true);
            }}
            title="Voir"
          >
            <Eye size={20} />
          </span>
          <span
            className="btn-edit cursor-pointer"
            onClick={() => {
              setSelectedStagiaire(row);
              setShowEditModal(true);
            }}
            title="Modifier"
          >
            <Pen size={20} />
          </span>
          <span
            className="btn-delete cursor-pointer"
            onClick={() => {
              setSelectedStagiaire(row);
              setShowDeleteModal(true);
            }}
            title="Supprimer"
          >
            <Trash size={20} />
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
       <div className="datatable">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Liste des stagiaires</h2>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-add mb-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            <Plus size={16} /> Ajouter un stagiaire
          </button>

          <div className="search mb-4">
            <input
              type="text"
              placeholder="Rechercher un stagiaire"
              onChange={handleChange}
            />
          </div>

          <DataTable
            columns={columns}
            data={records}
            customStyles={customStyles}
            pagination
            highlightOnHover
            noHeader
          />
        </div>

        {/* Modal Ajouter */}
        {showAddModal && (
          <div className="addModal modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="btnExit"
                onClick={() => setShowAddModal(false)}
                aria-label="Fermer"
              >
                ✕
              </button>
              <FormulaireAjout  
                // onSubmit={fetchStagiaires}
                 onClose={() => {
                  fetchStagiaires();
                }}
              />
            </div>
          </div>
        )}


        {/* Modal Modifier */}
        {showEditModal && selectedStagiaire && (
          <div className="editModal modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="btnExit"
                onClick={() => setShowEditModal(false)}
                aria-label="Fermer"
              >
                ✕
              </button>
              <FormulaireAjout
                // ⬇ On passe l'objet du stagiaire sélectionné comme données initiales
                initialData={selectedStagiaire}
                // ⬇ On passe la fonction de mise à jour existante
                onSubmit={handleEdit}
                // ⬇ On passe la fonction pour fermer la modale
                onClose={() => setShowEditModal(false)}
              />
            </div>
          </div>
        )}


        {/* Modal Voir */}
        {showViewModal && selectedStagiaire && (
          <div className=" modal-overlay" onClick={() => setShowViewModal(false)}>
            <div className="infoModal modal-content" onClick={(e) => e.stopPropagation()}>
              <ModalStagiaire
                stagiaire={selectedStagiaire}
                onClose={() => {
                  setShowViewModal(false);
                  setSelectedStagiaire(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Modal Supprimer */}
        {showDeleteModal && selectedStagiaire && (
          <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
            <div className="deleteModal" onClick={(e) => e.stopPropagation()}>
              <button
                className="btnExit"
                onClick={() => setShowDeleteModal(false)}
                aria-label="Fermer"
              >
                ✕
              </button>
              <h2>Suppression</h2>
              <p className="mb-4">
                Voulez-vous vraiment supprimer{" "}
                <strong>
                  {selectedStagiaire.nom} {selectedStagiaire.prenom}
                </strong>
                ?
              </p>
              <div className="Boutonsdelete">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

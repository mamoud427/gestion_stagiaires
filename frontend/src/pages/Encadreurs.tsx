import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pen, Trash, Eye, Plus } from "lucide-react";
import api from "../services/api";
import "../style/liste.css";
import "../style/form_ajout.css";
import FormulaireAjout from "../components/formulaire_ajout_encadreur";
import ModalEncadreur from "../components/ModalEncadreur";

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

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "lightblue",
      color: "black",
      fontWeight: "bold",
    },
  },
};

export default function Encadreurs() {
  const [encadreurs, setEncadreurs] = useState<Encadreur[]>([]);
  const [records, setRecords] = useState<Encadreur[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedEncadreur, setSelectedEncadreur] = useState<Encadreur | null>(null);

  // Charger les Encadreurs
  const fetchEncadreurs = async () => {
    try {
      const res = await api.get("/encadreurs");
      setEncadreurs(res.data);
    } catch (error) {
      console.error("Erreur fetch Encadreurs", error);
    }
  };

  useEffect(() => {
    fetchEncadreurs();
  }, []);

  useEffect(() => {
    setRecords(encadreurs);
  }, [encadreurs]);

  // Recherche
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = encadreurs.filter((s) =>
      s.nom.toLowerCase().includes(query)
    );
    setRecords(filtered);
  };

  // // Ajouter
  // const handleAdd = async (data: Encadreur) => {
  //   try {
  //     await api.post("/encadreurs", data);
  //     setShowAddModal(false);
  //     fetchEncadreurs();
  //   } catch (error) {
  //     console.error("Erreur ajout", error);
  //   }
  // };

  // Modifier
  const handleEdit = async (data: Encadreur) => {
    if (!selectedEncadreur) return;
    try {
      await api.put(`/encadreurs/${selectedEncadreur._id}`, data);
      setShowEditModal(false);
      setSelectedEncadreur(null);
      fetchEncadreurs();
    } catch (error) {
      console.error("Erreur modification", error);
    }
  };

  // Supprimer
  const handleDelete = async () => {
    if (!selectedEncadreur) return;
    try {
      await api.delete(`/encadreurs/${selectedEncadreur._id}`);
      setShowDeleteModal(false);
      setSelectedEncadreur(null);
      fetchEncadreurs();
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

  const columns = [
    { name: "N°", cell: (row: Encadreur, index: number) => index + 1, sortable: true },
    { name: "Nom", selector: (row: Encadreur) => row.nom, sortable: true },
    { name: "Prénom", selector: (row: Encadreur) => row.prenom, sortable: true },
    { name: "Email", selector: (row: Encadreur) => row.email },
    { name: "Mot de Passe", selector: (row: Encadreur) => row.password },
    { name: "Téléphone", selector: (row: Encadreur) => row.telephone },
    { name: "Role", selector: (row: Encadreur) => row.role },
    {
      name: "Actions",
      cell: (row: Encadreur) => (
        <div className="flex gap-2">
          <span
            className="btn-info cursor-pointer"
            onClick={() => {
              setSelectedEncadreur(row);
              setShowViewModal(true);
            }}
            title="Voir"
          >
            <Eye size={20} />
          </span>
          <span
            className="btn-edit cursor-pointer"
            onClick={() => {
              setSelectedEncadreur(row);
              setShowEditModal(true);
            }}
            title="Modifier"
          >
            <Pen size={20} />
          </span>
          <span
            className="btn-delete cursor-pointer"
            onClick={() => {
              setSelectedEncadreur(row);
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
    <div className="datatable">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Liste des encadreurs</h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-add mb-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          <Plus size={16} /> Ajouter un Encadreur
        </button>

        <div className="search mb-4">
          <input
            type="text"
            placeholder="Rechercher un Encadreur"
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
            <FormulaireAjout />
          </div>
        </div>
      )}


      {/* Modal Modifier */}
      {showEditModal && selectedEncadreur && (
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
              initialData={selectedEncadreur}
              onSubmit={handleEdit}
              onClose={() => {
                setShowEditModal(false);
                setSelectedEncadreur(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Voir */}
      {showViewModal && selectedEncadreur && (
        <div className=" modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="infoModal modal-content" onClick={(e) => e.stopPropagation()}>
            <ModalEncadreur
              encadreur={selectedEncadreur}
              onClose={() => {
                setShowViewModal(false);
                setSelectedEncadreur(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Modal Supprimer */}
      {showDeleteModal && selectedEncadreur && (
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
                {selectedEncadreur.nom} {selectedEncadreur.prenom}
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
  );
}

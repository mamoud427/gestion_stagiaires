import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import {Pen, Trash, EyeIcon} from "lucide-react";
import api from "../services/api";

interface Stagiaire {
    _id: string;
    nom: string;
    prenom: string;
    email: string;

}

export default function Stagiaires() {
    const [stagiaires, setStagiaires] = useState<Stagiaire[]>([]);

    useEffect(() => {
        api.get("/stagiaires")
            .then((res) => setStagiaires(res.data))
            .catch((err) => console.error("Erreur de chargement stagiaires:", err));
    }, []);
    
// fonction permettant de supprimer un stagiaire
   const handleVoir = (id: string) => {
    alert("Voir stagiaire " + id);
  };

  const handleEdit = (id: string) => {
    alert("Modifier stagiaire " + id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce stagiaire ?")) {
      api.delete(`/stagiaires/${id}`)
        .then(() => setStagiaires(stagiaires.filter(s => s._id !== id)))
        .catch(err => console.error("Erreur de suppression:", err));
    }
  };

  const columns = [
    {
      name: "N°",
      selector: (_row: Stagiaire, index: number) => index + 1,
      width: "80px",
    },
    {
      name: "Nom",
      selector: (row: Stagiaire) => row.nom,
      sortable: true,
    },
    {
      name: "Prénom",
      selector: (row: Stagiaire) => row.prenom,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Stagiaire) => row.email,
    },
    {
      name: "Actions",
      cell: (row: Stagiaire) => (
        <div className="flex gap-3">
          <EyeIcon
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => handleVoir(row._id)}
          />
          <Pen
            className="text-green-500 hover:text-green-700 cursor-pointer"
            onClick={() => handleEdit(row._id)}
          />
          <Trash
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
      width: "150px",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Liste des stagiaires</h2>

      <DataTable
        columns={columns}
        data={stagiaires}
        pagination
        highlightOnHover
        responsive
        striped
        persistTableHead
      />
    </div>
  );
}
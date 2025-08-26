import React from "react";

import ListeRapports from "../components/listeRapport";
import UploadRapport from "../components/uploadRapport";

import "../style/rapport.css";

const Rapports: React.FC = () => {

    return (
        <div style={styles.style}>
            <ListeRapports />
            <UploadRapport />
        </div>
    );
}

const styles= {
    style: {
        display: "flex",
        gap: "25px",
        maxWidth: "1200px",
        margin: "20px ",
        padding: "10px",
    },
}

export default Rapports;
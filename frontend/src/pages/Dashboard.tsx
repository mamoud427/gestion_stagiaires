// import react from 'react';
import Header from "../components/Header";

const Dashboard: React.FC = () => {

    return(
        <>
            <Header />
            <div className="dashboard-container">
                <h2>Bienvenue sur le tableau de bord</h2>
                <p>Utilisez le menu pour naviguer entre les différentes sections.</p>
            </div>
        </>
    )
}

export default Dashboard;
import React, { useState } from 'react';
import {
    Users,
    UserCog,
    Clock,
    BadgeCheck

} from 'lucide-react';
import "../style/dashboard.css";

const Dashboard: React.FC = () => {

    return(
        <>            
            <div className="dashboard-container">
                {/* section pour les cartes des totaux */}
                <h2>Statistiques</h2>
                <section className="stats">
                    
                    <div className="stat-card" style={styles.card1}>
                        <Users size={35}/>
                        <h3>Total de Stagiaire</h3>
                        <p>120</p>
                    </div>
                    <div className="stat-card" style={styles.card2}>
                        <UserCog size={35}/>
                        <h3>Nombre d'encadreurs</h3>
                        <p>8</p>
                    </div>
                    <div className="stat-card" style={styles.card3}>
                        <Clock size={35}/>
                        <h3>Stages en cours</h3>
                        <p>5</p>
                    </div>
                    <div className="stat-card" style={styles.card4}>
                        <BadgeCheck size={35}/>
                        <h3>Stages Terminés</h3>
                        <p>10</p>
                    </div>
                </section>

                {/* Section pour les activités récentes */}
                <section className="recent-activities">
                    <h2>Activités Récentes</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Utilisateurs</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>15-08-2025</td>
                                <td>John Doe</td>
                                <td>Ajout d'un stagiaire</td>
                            </tr>
                        </tbody>
                    </table>

                </section>
            </div>
        </>
    )
}

const styles= {
    card1: {
        backgroundColor: "rgb(25, 160, 25)"
    },
    card2: {
        backgroundColor: "rgb(212, 68, 68)"
    },
    card3: {
        backgroundColor: "rgba(250, 110, 16, 1)"
    },
    card4: {
        backgroundColor: "rgb(11, 130, 170)"
    }
}

export default Dashboard;
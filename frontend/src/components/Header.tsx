import React, {useState, useEffect, useRef} from "react";
import {
    UserCircle,
    Bell,
} from "lucide-react"
import Logo from "/logo.jpg";
import "../style/header.css";

const Header: React.FC = () => {

    const [notifications, setNotifications] = useState(false);
    // const [showMenu, setShowMenu] = useState<boolean>(false);
    const notifRef = useRef<HTMLDivElement>(null);

    // fermer le menu des notifications en cliquant en dehors
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    // <header style={styles.header}>
    <header className="header">
        <div className="header-left" >
            <img src={Logo} alt="Logo" className="logo" />
            {/* <h1 className="header-title" >Tableau de bord Admin</h1> */}
        </div>
        
        <div className="header-icons" >
            <button className="btn-icons" onClick = {() => setNotifications(prev => !prev)}>
                <Bell size={20} className="icon" />
                <span className="notification-badge">3</span>
            </button>
            <button className="btn-icons">
                <UserCircle size={20} className="icon" />
                
            </button>
            {/* <button className="logout-btn">
                Déconnexion
            </button> */}
        </div>

        {/* menu qui s'affiche les notifications */}
        { notifications && (
            <div className="menu-notif" ref={notifRef}>
                <ul>
                    <ul>Notifications</ul>
                    <li>
                        <p>Stage terminé de paul</p>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
                    </li>
                    <li>
                        <p>Stage terminé de paul</p>
                        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span>
                    </li>
                </ul>
            </div>
        )}

    </header>
  );
};

// const styles = {
//   header: {
//     height: "100px",
//     backgroundColor: "#0288d1",
//     color: "#004d40",
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "0 20px",
//   },
//   headerLeft: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//   },
//   logo: {
//     height: "60px",
//     borderRadius: "50%",
//     objectFit: "cover",
//   },
//   headerTitle: {
//     fontSize: "1.5rem",
//     fontWeight: "600",
//     color: "#ffffff",
//   },
//   headerIcons: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//     marginTop: "10px",
//   },
//   btnIcons: {
//     background: "none",
//     border: "none",
//     color: "#ffffff",
//     cursor: "pointer",
//     position: "relative",
//     fontSize: "1.2rem",
//   },
// } as const;

export default Header;

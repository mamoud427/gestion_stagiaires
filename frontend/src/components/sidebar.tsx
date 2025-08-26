import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, LogOut, ClipboardList, Menu } from 'lucide-react';

import BtnLogout from './btnLogout';

import '../style/sidebar.css';

type Item = {
    path?: string;
    icon: React.ComponentType<{ size?: number; className?: string}>;
    label: string;
    category: "main" | "footer";
    component?: React.ComponentType;
}

const items:Item [] = [
     {
            path: '/dashboard',
            icon: Home,
            label: 'Tableau de Bord',
            category: 'main'
        },
        {
            path: '/liste_stagiaires',
            icon: Users,
            label: 'Liste des Stagiaires',
            category: 'main'
        },
        {
            path: '/Rapports',
            icon: ClipboardList,
            label: 'Raports',
            category: 'main'
        },
        {
            path: '/liste_encadreurs',
            icon: Users,
            label: 'Liste des encadreurs',
            category: 'main'
        },
        {
            component: BtnLogout,
            icon: LogOut,
            label: 'Se Déconnecter', 
            category: 'footer'
        }
]

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [open, setOpen] = useState(true);

    // par défaut fermé sur mobile, ouvert sinon
    useEffect(() =>{
        if (window.innerWidth > 768) setOpen(false);
    }, []);

    return (
        <div className="container">
            <div className={`sidebar ${open ? "open" : "closed"}`}>
                <div className="sidebar-header">
                    <button type='button' 
                            className='toggle-btn' 
                            onClick={() => setOpen(!open)}
                    >
                        <Menu size={18}/>
                    </button>
                </div>
                <div className="sidebar-section">
                    <ul className='menu'>
                    {items
                        .filter(i => i.category === 'main')
                        .map((item, index) =>{
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
        
                            return (
                                <li key={item.label || index}>
                                    {item.path ? (
                                        <Link
                                            to={item.path}
                                            className={`menu-link ${isActive ? "active" : ""}`}
                                        >
                                            <Icon size={18} className='menu-icon'/>
                                            <span className='menu-label'>{item.label}</span>
                                        </Link>
                                    ) : item.component ? (
                                        <item.component />
                                    ) : null}
                                </li>
                            );
                        })
                    }
                </ul>
                </div>
                <div className="sidebar-footer">
                    {items
                        .filter(i => i.category === 'footer')
                        .map((item, index) =>{
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
        
                            return (
                                <li key={item.label || index}>
                                    {item.path ? (
                                        <Link
                                            to={item.path}
                                            className={`menu-link ${isActive ? "active" : ""}`}
                                        >
                                            <Icon size={18} className='menu-icon'/>
                                            <span className='menu-label'>{item.label}</span>
                                        </Link>
                                    ) : item.component ? (
                                        <item.component />
                                    ) : null}
                                </li>
                            );
                        })
                    }
                </div>
            </div>
            {/* <main>{children}</main> */}
        </div>
    );
};

export default Sidebar;

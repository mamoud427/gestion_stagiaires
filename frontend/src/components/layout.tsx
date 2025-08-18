import React from "react";
import { Outlet} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./sidebar";

const Layout: React.FC = () => {
    // const [isSidebarCollapsed, setIsSidebarColapsed] = useState(false);

    return(
        <div className="layout">
            <Header/>
            <div className="layout-container" style={styles.layoutContainer}>
                <Sidebar/>
                <div className="layout-containt" style={styles.layoutContaint} >
                    <Outlet />
                </div>
            </div>
            
        </div>
    );
}

const styles = {
    layoutContainer: {
        display: "flex",
        width: "auto",
        flex: "1",
        background: "skyblue",
        height: "100vh",
    },
    layoutContaint: {
        flex: "1",
        padding: "20px",
        background: "#f0f0f0",
        overflowY: "auto",
        
    }
} as const;

export default Layout;
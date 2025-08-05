import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>Tableau de bord Admin</h1>
    </header>
  );
};

const styles = {
  header: {
    height: "60px",
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
  },
} as const;

export default Header;

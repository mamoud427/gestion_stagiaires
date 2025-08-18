import {  } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Stagiaires from './pages/Stagiaires';
import Encadreurs from './pages/Encadreurs';
import FormulaireAjout from './components/formulaire_ajout';
import FormulaireAjoutEncadrant from './components/formulaire_ajout_encadreur';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/layout';
// import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/liste_stagiaires" element={<Stagiaires />} />
          <Route path="/liste_encadreurs" element={<Encadreurs />} />
          <Route path="/ajouter" element={<FormulaireAjout />} />
          <Route path="/ajouter_encadrant" element={<FormulaireAjoutEncadrant />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App

import {  } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Stagiaires from './pages/Stagiaires';
import FormulaireAjout from './components/formulaire_ajout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/liste_stagiaires" element={<Stagiaires />} />
        <Route path="/ajouter" element={<FormulaireAjout />} />
      </Routes>
    </Router>
  )
}

export default App

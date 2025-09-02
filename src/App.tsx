import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/auth/Dashboard';
import AuthPage from './pages/auth/Authpage'
import AccountInformationDashboard from './components/accounttable'
import DispositionSubdispositionTable from './components/disposition'
import SubdispositionTable  from './components/subdisposition'
import CountryInformationTable from './components/country'
import PriorityMappingTable from './components/format'
import CityInformationTable from './components/city'
import StateInformationTable from './components/state'
import  DispositionMappingDashboard from './components/mapping'
import Geography from './components/georgraph'

import './assets/styles/globals.css';
import './App.css'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth" element={<Dashboard />} />
          <Route path="/master/account-info" element={<AccountInformationDashboard />} />
          <Route path="/disposition" element={<DispositionSubdispositionTable />} />
          <Route path="/subdispositions" element={<SubdispositionTable />} />
           <Route path="/priority-mapping" element={<PriorityMappingTable />} />
          <Route path="/country" element={<CountryInformationTable />} />
           <Route path="/state" element={<StateInformationTable />} />
           <Route path="/city" element={<CityInformationTable />} />
            <Route path="/master/disposition-subdisposition" element={<DispositionMappingDashboard />} />
             <Route path="/master/geography-settings" element={< Geography />} />
          {/* Add more routes here as we build them */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

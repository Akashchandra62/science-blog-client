import React from 'react'
// import Admin from './pages/Admin';
import { Routes, Route } from "react-router-dom";
import IndividualExperiment from './components/IndividualExperiment';
import Login from './pages/Login';
import ShowAllExperiments from './pages/ShowAllExperiments';
import CreateExperimentPage from './pages/CreateExperimentPage';
import ManageData from './pages/ManageData';

const App = () => {
  return (
     <>
    <Routes>
      
      <Route path='/' index element={<Login/>} />
      <Route path='/login' index element={<Login/>} />
      <Route path='/all-experiments' index element={<ShowAllExperiments/>} />
      <Route path='/create-experiment' element={<CreateExperimentPage/>} />
      <Route path='/manage-coredata' element={<ManageData/>} />
      <Route path='/experiment/:id' element={<IndividualExperiment/>} />
    </Routes>
     </>
  )
}

export default App;
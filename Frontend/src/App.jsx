import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import JobDetails from './pages/JobDetails';
import ApplyModal from './components/ApplyModal';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CreateJob from './pages/CreateJob';
import RecruiterApplications from './pages/RecruiterApplications';
import EditJob from './pages/EditJob';

const App = () => {

  return (
    <>
     <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/recruiter/dashboard" element={<RecruiterDashboard/>}/>
      <Route path="/recruiter/create-job" element={<CreateJob />} />
      <Route path="/recruiter/applications/:jobId" element={<RecruiterApplications />} />
      <Route path="/recruiter/edit-job/:id" element={<EditJob />} />
    </Routes>
    </>
  )
}

export default App
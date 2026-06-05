import React from 'react'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from 'react';
import axios from "axios";

import Card from "../components/Card";
import DeleteJobModal from "../components/DeleteJobModal";

import {
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaPlus,
  FaEdit, 
  FaTrash, 
  FaEye
} from "react-icons/fa";

const RecruiterDashboard = () => {

  const [recruiter, setRecruiter] = useState({});

  const [jobs, setJobs] = useState([]);

  const [stats, setStats] = useState({
  totalJobs:0,
  totalApplications:0,
  selectedCandidates:0
});

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteJobId, setDeleteJobId] = useState(null);

  const navigate = useNavigate();

  // Fetch Recruiter

  const fetchRecruiter = async () => {

    try {

      const res = await axios.get(
        "https://job-portal-qo3w.onrender.com/recruiter/dashboard",
        {
          withCredentials: true
        }
      );

      setRecruiter(res.data.recruiter);

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  //Fetch Recruiter Jobs

  const fetchJobs = async () => {

  try {

    const res = await axios.get(
      `https://job-portal-qo3w.onrender.com/recruiter/jobs?search=${search}&page=${page}`,
      {
        withCredentials:true
      }
    );

    setJobs(res.data.jobs);
    setTotalPages(res.data.totalPages);

  } catch(err){

    toast.error(
      err.response?.data?.message || "Something went wrong"
    );

  }

};

  // Fetch Recruiter Stats

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        "https://job-portal-qo3w.onrender.com/recruiter/stats",
        {
          withCredentials: true
        }
      );

      setStats(res.data.stats);

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  //Delete Job

  const handleDelete = async (jobId) => {

  try{

    await axios.delete(
      `https://job-portal-qo3w.onrender.com/recruiter/job/${jobId}`,
      {
        withCredentials:true
      }
    );

    toast.success("Job deleted");

    setDeleteJobId(null);

    fetchJobs();

  }catch(err){

    toast.error(
      err.response?.data?.message || "Something went wrong"
    );

  }

}

  // Logout

  const handleLogout = async () => {

    try {

      await axios.post(
        "https://job-portal-qo3w.onrender.com/auth/logout",
        {},
        {
          withCredentials: true
        }
      );

      toast.success("Logged out successfully");

      navigate("/login");

    } catch (err) {

      toast.error("Something went wrong");

    }

  };

  useEffect(() => {

    fetchRecruiter();
    fetchStats();

  }, []);

  useEffect(() => {

  fetchJobs();

}, [search, page]);

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>

             <h2 className="text-blue-600 font-bold text-xl mb-2">
              TalentBridge
            </h2>

            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back, {recruiter.username || "User"}
            </h1>

            <p className="text-gray-500 mt-2">
              Manage jobs and applications
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/recruiter/create-job")}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              <FaPlus />
              Create Job
            </button>

            <button
              onClick={handleLogout}
              className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              Logout
            </button>

          </div>

        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">

          <Card
            title="Total Jobs"
            value={stats.totalJobs}
            icon={<FaBriefcase />}
          />

          <Card
            title="Applications"
            value={stats.totalApplications}
            icon={<FaUsers />}
          />

          <Card
            title="Selected"
            value={stats.selectedCandidates}
            icon={<FaCheckCircle />}
          />

        </div>

        {/* Jobs Section */}

        <div>

          <div className="mb-8">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                Posted Jobs
              </h2>

              <p className="text-gray-500 font-medium">
                {jobs.length} jobs posted
              </p>

            </div>

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
                w-full
                md:w-80
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                bg-white
                focus:ring-2
                focus:ring-emerald-500
                outline-none
              "
            />

          </div>

          {/* Empty State */}

          {jobs.length === 0 ? (

            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                No Jobs Posted Yet
              </h3>

              <p className="text-gray-500 mb-6">
                Start posting jobs to receive applications from candidates
              </p>

              <button
                onClick={() => navigate("/recruiter/create-job")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl transition shadow-sm"
              >
                Create Your First Job
              </button>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {jobs.map((job) => (

                <div
                key={job._id}
                className="
                bg-white
                rounded-2xl
                p-6
                shadow-sm
                border
                border-slate-200
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
                "
              >

                <div className="mb-4">

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {job.jobTitle}
                  </h3>

                  <p className="text-gray-600 font-medium">
                    {job.company}
                  </p>

                  <p className="text-gray-500 mt-1">
                    📍 {job.location}
                  </p>

                  <p className="text-emerald-600 font-medium mt-3">
                    💰 ₹{job.salary?.toLocaleString() || "Not disclosed"}
                  </p>

                  <p className="text-blue-600 font-medium mt-2">
                  👥 {job.applicationsCount} Applications
                </p>

                </div>

                <div className="border-t border-slate-200 pt-4">

                <button
                  onClick={() =>
                    navigate(`/recruiter/applications/${job._id}`)
                  }
                  className="
                    w-full
                    bg-emerald-500
                    hover:bg-emerald-600
                    text-white
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  View Applications
                </button>

                <div className="flex gap-3 mt-3">

                  <button
                    onClick={() =>
                      navigate(`/recruiter/edit-job/${job._id}`)
                    }
                    className="
                      flex-1
                      bg-blue-500
                      hover:bg-blue-600
                      text-white
                      py-2.5
                      rounded-xl
                      transition
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteJobId(job._id)}
                    className="
                      flex-1
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      py-2.5
                      rounded-xl
                      transition
                    "
                  >
                    Delete
                  </button>

                </div>
                </div>

              </div>
              ))}

            </div>

          )}

          <div className="flex justify-center gap-4 mt-8">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
              px-4 py-2
              bg-gray-200
              rounded-lg
              disabled:opacity-50
            "
          >
            Previous
          </button>

          <span className="px-4 py-2 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="
              px-4 py-2
              bg-emerald-500
              text-white
              rounded-lg
              disabled:opacity-50
            "
          >
            Next
          </button>

        </div>

        </div>

      </div>
      <DeleteJobModal
      deleteJobId={deleteJobId}
      setDeleteJobId={setDeleteJobId}
      handleDelete={handleDelete}
    />
    </div>

  );
};

export default RecruiterDashboard;
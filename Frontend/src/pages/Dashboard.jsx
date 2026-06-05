import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../components/Card";
import JobCard from "../components/JobCard";
import ApplyModal from "../components/ApplyModal";
import BecomeRecruiterModal from "../components/BecomeRecruiterModal";

import {
  FaBriefcase,
  FaFileAlt,
  FaTimesCircle,
  FaCheckCircle
} from "react-icons/fa";

const Dashboard = () => {

  const [stats, setStats] = useState({
    applied: 0,
    rejected: 0,
    selected: 0,
    total: 0,
    role: ""
  });

  const [jobs, setJobs] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null);

  const [resume, setResume] = useState(null);

  const [coverLetter, setCoverLetter] = useState("");

  const [showRecruiterModal, setShowRecruiterModal] = useState(false);

  const [companyName, setCompanyName] = useState("");

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  // Fetch Stats

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        "https://job-portal-qo3w.onrender.com/job/getDashboardStats",
        {
          withCredentials: true
        }
      );

      setStats(res.data.stats);

    } catch (err) {

      if (err.response?.status === 403) {

        navigate("/recruiter/dashboard");

        return;

      }

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  // Fetch Jobs

  const fetchJobs = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `https://job-portal-qo3w.onrender.com/job/readjob?search=${search}&page=${page}`,
        {
          withCredentials: true
        }
      );

      setJobs(res.data.jobs);

      setTotalPages(res.data.totalPages);

    } catch (err) {

      if (err.response?.status === 403) {

        navigate("/recruiter/dashboard");

        return;

      }

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  // Initial Stats Fetch

  useEffect(() => {

    fetchStats();

  }, []);

  // Fetch Jobs on Search/Page Change

  useEffect(() => {

    fetchJobs();

  }, [search, page]);

  // Become Recruiter

  const handleBecomeRecruiter = async () => {

  try {

    if (!companyName.trim()) {
      return toast.error("Company name is required");
    }

    await axios.post(
      "https://job-portal-qo3w.onrender.com/recruiter/become-recruiter",
      { companyName },
      {
        withCredentials: true
      }
    );

    toast.success("You are now a recruiter");

    setShowRecruiterModal(false);
    setCompanyName("");

    navigate("/recruiter/dashboard");

  } catch (err) {

    toast.error(
      err.response?.data?.message || "Something went wrong"
    );

  }

};

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

  // Apply Job

  const handleApply = async () => {

    try {

      if (!resume) {

        return toast.error("Resume is required");

      }

      const formData = new FormData();

      formData.append("resume", resume);

      formData.append("coverLetter", coverLetter);

      await axios.post(
        `https://job-portal-qo3w.onrender.com/application/apply/${selectedJob._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Application submitted");

      setSelectedJob(null);

      setResume(null);

      setCoverLetter("");

      fetchJobs();

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

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
              Welcome back, {stats.username || "User"}
            </h1>

            <p className="text-slate-500 mt-2 text-lg">
            Explore opportunities, track applications,
            and grow your career.
          </p>

          </div>

          <div className="flex gap-4">

            {stats?.role !== "recruiter" && (

              <button
                onClick={() => setShowRecruiterModal(true)}
                className="
                bg-emerald-500
                hover:bg-emerald-600
                text-white
                px-5
                py-2.5
                rounded-xl
                transition
                shadow-sm
                "
              >
                Become Recruiter
              </button>

            )}

            <button
              onClick={() => navigate("/applications")}
              className="
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-5
              py-2.5
              rounded-xl
              transition
              shadow-sm
              "
            >
              My Applications
            </button>

            <button
              onClick={handleLogout}
              className="
              bg-slate-700
              hover:bg-slate-800
              text-white
              px-5
              py-2.5
              rounded-xl
              transition
              shadow-sm
              "
            >
              Logout
            </button>

          </div>

        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">

          <Card
            title="Total Jobs"
            value={stats.total}
            icon={<FaBriefcase />}
          />

          <Card
            title="Applied"
            value={stats.applied}
            icon={<FaFileAlt />}
          />

          <Card
            title="Rejected"
            value={stats.rejected}
            icon={<FaTimesCircle />}
          />

          <Card
            title="Selected"
            value={stats.selected}
            icon={<FaCheckCircle />}
          />

        </div>

        {/* Jobs Section */}

        <div>

          {/* Top Bar */}

          <div className="flex justify-between items-center mb-8">

            <div className="flex items-center gap-6">

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
                outline-none
                focus:ring-2
                focus:ring-blue-500
                bg-white
                "
              />

              <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                Available Jobs
              </h2>

            </div>

            <p className="text-gray-500">
              {jobs.length} jobs available
            </p>

          </div>

          {/* Loading */}

          {loading ? (

            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <p className="text-gray-600 text-lg">
                Loading jobs...
              </p>

            </div>

          ) : jobs.length === 0 ? (

            <div className="bg-white rounded-2xl p-6 shadow-sm">

              <p className="text-gray-600 text-lg">
                No jobs available
              </p>

            </div>

          ) : (

            <>
            
              {/* Jobs Grid */}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {jobs.map((job) => (

                  <JobCard
                    key={job._id}
                    job={job}
                    setSelectedJob={setSelectedJob}
                  />

                ))}

              </div>

              {/* Pagination */}

              <div className="flex justify-center items-center gap-4 mt-10">

                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="
                  bg-slate-700
                  hover:bg-slate-800
                  text-white
                  px-5
                  py-2
                  rounded-xl
                  transition
                  disabled:opacity-50
                  "
                >
                  Prev
                </button>

                <p className="font-medium text-gray-700">
                  Page {page} of {totalPages}
                </p>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="
                  bg-blue-500
                  hover:bg-blue-600
                  text-white
                  px-5
                  py-2
                  rounded-xl
                  transition
                  disabled:opacity-50
                  "
                >
                  Next
                </button>

              </div>

            </>

          )}

        </div>

      </div>

      {/* Apply Modal */}

      <ApplyModal
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        resume={resume}
        setResume={setResume}
        coverLetter={coverLetter}
        setCoverLetter={setCoverLetter}
        handleApply={handleApply}
      />

      <BecomeRecruiterModal
      showRecruiterModal={showRecruiterModal}
      setShowRecruiterModal={setShowRecruiterModal}
      companyName={companyName}
      setCompanyName={setCompanyName}
      handleBecomeRecruiter={handleBecomeRecruiter}
    />

    </div>

  );

};

export default Dashboard;
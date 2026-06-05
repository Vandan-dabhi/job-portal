import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Applications = () => {

  const [applications, setApplications] = useState([]);

  const navigate = useNavigate();

  const fetchApplications = async () => {

    try {

      const res = await axios.get(
        "https://job-portal-qo3w.onrender.com/application/getApplications",
        {
          withCredentials: true
        }
      );

      setApplications(res.data.applications);

    } catch (err) {

      console.log(err.message);

    }
  };

  useEffect(() => {

    fetchApplications();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="max-w-6xl mx-auto px-6 py-10">

       <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            My Applications
          </h1>

          <p className="text-gray-500 mt-2">
            Track all your job applications and their current status.
          </p>

        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="
          bg-slate-700
          hover:bg-slate-800
          text-white
          px-5
          h-11
          rounded-xl
          transition
          shadow-sm
          flex
          items-center
          gap-2
          "
        >

          <FaArrowLeft className="text-sm" />

          Back

        </button>

       </div>
        {applications.length === 0 ? (

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <p className="text-gray-600">
              No applications found
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {applications.map((application) => (

              <div
              key={application._id}
              className="
              bg-white
              rounded-3xl
              p-6
              border border-gray-100
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition
              duration-300
              "
            >

              {/* Header */}

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {application.jobId?.jobTitle}
                  </h2>

                  <p className="text-gray-600 mt-1 font-medium">
                    {application.jobId?.company}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {application.jobId?.location}
                  </p>

                </div>

                {/* Status */}

                <span
                  className={`
                  text-xs
                  font-semibold
                  px-4
                  py-2
                  rounded-full
                  capitalize
                  tracking-wide
                  ${
                    application.status === "selected"
                      ? "bg-green-100 text-green-700"
                      : application.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : application.status === "reviewed"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }
                  `}
                >
                  {application.status}
                </span>

              </div>

              {/* Divider */}

              <div className="border-t border-gray-100 my-5"></div>

              {/* Info Grid */}

              <div className="grid grid-cols-2 gap-5">

                <div>

                  <p className="text-sm text-gray-400">
                    Applied On
                  </p>

                  <p className="text-gray-800 font-medium mt-1">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <div>

                  <p className="text-sm text-gray-400">
                    Application Status
                  </p>

                  <p className="text-gray-800 font-medium mt-1 capitalize">
                    {application.status}
                  </p>

                </div>

              </div>

              {/* Cover Letter */}

              <div className="mt-6">

                <p className="text-sm font-medium text-gray-500 mb-3">
                  Cover Letter
                </p>

                <div className="bg-gray-50 rounded-2xl p-4">

                  <p className="text-sm text-gray-700 leading-7">
                    {application.coverLetter || "No cover letter provided"}
                  </p>

                </div>

              </div>

              {/* Buttons */}

              <div className="flex gap-3 mt-6">

                <a
                  href={application.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  bg-blue-500
                  hover:bg-blue-600
                  text-white
                  px-5
                  h-11
                  rounded-xl
                  text-sm
                  font-medium
                  flex items-center
                  transition
                  "
                >
                  View Resume
                </a>

                <button
                  onClick={() => navigate(`/job/${application.jobId._id}`)}
                  className="
                  bg-gray-100
                  hover:bg-gray-200
                  text-gray-800
                  px-5
                  h-11
                  rounded-xl
                  text-sm
                  font-medium
                  transition
                  "
                >
                  View Job
                </button>

              </div>

            </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Applications;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const RecruiterApplications = () => {

  const { jobId } = useParams();

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  const [count, setCount] = useState(0);

  // Fetch Applications

  const fetchApplications = async () => {

    try {

      const res = await axios.get(
        `https://job-portal-qo3w.onrender.com/recruiter/applications/${jobId}`,
        {
          withCredentials: true
        }
      );

      setApplications(res.data.applications);

      setCount(res.data.count);

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  // Update Status

  const updateStatus = async (applicationId, status) => {

    try {

      await axios.patch(
        `https://job-portal-qo3w.onrender.com/recruiter/application/status/${applicationId}`,
        { status },
        {
          withCredentials: true
        }
      );

      toast.success(`Candidate ${status}`);

      fetchApplications();

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  //Status Updated "Reviewed"

  const markAsReviewed = async (applicationId) => {

  try {

    await axios.patch(
      `https://job-portal-qo3w.onrender.com/recruiter/application/status/${applicationId}`,
      {
        status:"reviewed"
      },
      {
        withCredentials:true
      }
    );

    fetchApplications();

  } catch(err){

    console.log(err);

  }

};

  useEffect(() => {

    fetchApplications();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Back Button */}

       <div className="flex justify-end mb-8">

          <button
            onClick={() => navigate("/recruiter/dashboard")}
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

        {/* Header */}

       <div className="flex justify-between items-start mb-10">

          {/* Left Side */}

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Applications
            </h1>

            <p className="text-gray-500 mt-2">
              Manage candidates for this job
            </p>

          </div>

          {/* Right Side */}

          <div
            className="
            bg-white
            px-4
            py-3
            rounded-xl
            shadow-sm
            border
            border-slate-200
            "
          >

            <p className="text-sm text-gray-500">
              Total Applications
            </p>

            <h2 className="text-2xl font-bold text-gray-800">
              {count}
            </h2>

          </div>

        </div>

        {/* Empty State */}

        {applications.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-200 text-center">

            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              No Applications Yet
            </h3>

            <p className="text-gray-500">
              Candidates will appear here after applying
            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {applications.map((application) => (

              <div
                key={application._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
              >

                {/* Candidate Info */}

                <div className="mb-5">

                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {application.userId?.username}
                  </h2>

                  <p className="text-gray-500 mb-2">
                    {application.userId?.email}
                  </p>

                  <p className="text-gray-500">
                    Status:
                    <span className="ml-2 font-medium text-gray-700 capitalize">
                      {application.status}
                    </span>
                  </p>

                </div>

                {/* Resume */}

                <div className="mb-5">

                  <h3 className="font-semibold text-gray-800 mb-2">
                    Resume
                  </h3>

                 <button
                  onClick={async () => {

                    try {

                      if(application.status?.toLowerCase() === "applied"){

                        await markAsReviewed(application._id);

                      }

                      window.open(application.resume, "_blank");

                    } catch(err){

                      console.log(err);

                    }

                  }}
                  className="text-emerald-600 hover:underline"
                >
                  View Resume
                </button>

                </div>

                {/* Cover Letter */}

                <div className="mb-6">

                  <h3 className="font-semibold text-gray-800 mb-2">
                    Cover Letter
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {application.coverLetter || "No cover letter provided"}
                  </p>

                </div>

                {/* Actions */}

               <div className="flex items-center gap-4">

                {(application.status === "applied" ||
                  application.status === "reviewed") && (
                  <>

                    <button
                      onClick={() =>
                        updateStatus(application._id, "selected")
                      }
                      className="
                      bg-emerald-500
                      hover:bg-emerald-600
                      text-white
                      px-5
                      py-2
                      rounded-xl
                      transition
                      "
                    >
                      Select
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(application._id, "rejected")
                      }
                      className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-5
                      py-2
                      rounded-xl
                      transition
                      "
                    >
                      Reject
                    </button>

                  </>
                )}

                {application.status === "selected" && (

                  <div className="
                    bg-emerald-100
                    text-emerald-700
                    px-4
                    py-2
                    rounded-xl
                    font-medium
                  ">
                    Candidate Selected
                  </div>

                )}

                {application.status === "rejected" && (

                  <div className="
                    bg-red-100
                    text-red-700
                    px-4
                    py-2
                    rounded-xl
                    font-medium
                  ">
                    Candidate Rejected
                  </div>

                )}

              </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
};

export default RecruiterApplications;
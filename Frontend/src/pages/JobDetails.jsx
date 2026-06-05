import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

const JobDetails = () => {

  const [job, setJob] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const fetchJob = async () => {

    try {

      const res = await axios.get(
        `https://job-portal-qo3w.onrender.com/job/getsinglejob/${id}`,
        {
          withCredentials: true
        }
      );

      setJob(res.data.job);

    } catch (err) {

      console.log(err.message);

    }
  };

  useEffect(() => {

    fetchJob();

  }, []);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-slate-50">

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Job Details
            </h1>

            <p className="text-gray-500 mt-2">
              Explore complete information about this opportunity.
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

        {/* Card */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

          <h2 className="text-3xl font-bold text-gray-900">
            {job.jobTitle}
          </h2>

          <p className="text-xl text-gray-600 mt-2">
            {job.company}
          </p>

          <div className="flex gap-3 mt-5">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
            {job.jobType}
          </span>

          <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm">
            {job.workMode}
          </span>

            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
              {job.location}
            </span>

          </div>

          {/* Description */}

          <div className="mt-8">

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Job Description
            </h3>

            <p className="text-gray-700 leading-8">
              {job.description}
            </p>

          </div>

          <div className="mt-8">

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Salary
          </h3>

          <p className="text-2xl font-bold text-emerald-600">
           ₹ {job.salary?.toLocaleString()}
          </p>

        </div>

        <div className="mt-8">

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Skills Required
          </h3>

            <div className="flex flex-wrap gap-3">

              {job.skillsRequired?.map((skill, index) => (

                <span
                  key={index}
                  className="
                  bg-blue-100
                  text-blue-700
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  "
                >
                  {skill}
                </span>

              ))}

            </div>

          </div>

      <div className="mt-8">

        <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recruiter Information
          </h3> 

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

            <div className="flex items-center gap-4">

              {/* Avatar */}

              <div
                className="
                w-14
                h-14
                rounded-full
                bg-blue-500
                text-white
                flex
                items-center
                justify-center
                text-xl
                font-bold
                shrink-0
                "
              >
                {job?.postedBy?.username?.charAt(0)?.toUpperCase() || "R"}
              </div>

              {/* Recruiter Info */}

              <div className="flex flex-col">

                <p className="text-lg font-semibold text-gray-900">
                  {job?.postedBy?.username || "Recruiter"}
                </p>

                <p className="text-gray-600 text-sm mt-1">
                  {job?.postedBy?.email || "No email"}
                </p>

              </div>

            </div>

          </div>

        </div>

        </div>

      </div>

    </div>
  );
};

export default JobDetails;
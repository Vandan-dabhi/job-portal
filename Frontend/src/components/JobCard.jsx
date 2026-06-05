import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaMapMarkerAlt
} from "react-icons/fa";

const JobCard = ({ job, setSelectedJob }) => {

  const navigate = useNavigate();

  const isApplied = job.applied;

  return (

    <div
      className="
      bg-white
      rounded-2xl
      p-6
      shadow-sm
      border
      border-slate-200
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      flex
      flex-col
      justify-between
      "
    >

      <div>

        {/* Job Title */}

        <h2 className="text-2xl font-bold text-slate-800">
          {job.jobTitle}
        </h2>

        {/* Company */}

        <div className="mt-4 flex items-center gap-2 text-gray-600">
          <FaBuilding className="text-blue-500" />
          <span>{job.company}</span>
        </div>

        {/* Location */}

        <div className="mt-2 flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{job.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">

          <span
            className="
            bg-blue-100
            text-blue-700
            text-xs
            px-3
            py-1
            rounded-full
            "
          >
            {job.jobType}
          </span>

          <span
            className="
            bg-emerald-100
            text-emerald-700
            text-xs
            px-3
            py-1
            rounded-full
            "
          >
            {job.workMode}
          </span>

        </div>
        
          </div>

      {/* Buttons */}

      <div className="flex gap-3 mt-6">

        <button
          disabled={isApplied}
          onClick={() => setSelectedJob(job)}
          className={`
          flex-1
          h-11
          rounded-xl
          font-medium
          text-white
          transition
          ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }
          `}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>

        <button
          onClick={() => navigate(`/job/${job._id}`)}
          className="
          flex-1
          bg-slate-100
          hover:bg-slate-200
          text-slate-700
          h-11
          rounded-xl
          font-medium
          transition
          "
        >
          View Details
        </button>

      </div>

    </div>

  );
};

export default JobCard;
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const EditJob = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
    jobTye: "",
    workMode: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const fetchJob = async () => {

    try {

      const res = await axios.get(
        `https://job-portal-qo3w.onrender.com/job/getsinglejob/${id}`,
        {
          withCredentials: true
        }
      );

      const job = res.data.job;

      setFormData({
        company: job.company || "",
        jobTitle: job.jobTitle || "",
        description: job.description || "",
        location: job.location || "",
        salary: job.salary || "",
        skills: job.skillsRequired?.join(", ") || "",
        jobType: job.jobType || "",
        workMode: job.workMode || ""
      });

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Failed to load job"
      );

    }

  };

  useEffect(() => {

    fetchJob();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.company || !formData.jobTitle) {
      return toast.error(
        "Company and Job Title are required"
      );
    }

    try {

      const payload = {
        company: formData.company,
        jobTitle: formData.jobTitle,
        description: formData.description,
        location: formData.location,
        salary: formData.salary,
        skillsRequired: formData.skills
          .split(",")
          .map((skill) => skill.trim()),
          jobType: formData.jobType,
          workMode: formData.workMode
      };

      await axios.put(
        `https://job-portal-qo3w.onrender.com/recruiter/job/${id}`,
        payload,
        {
          withCredentials: true
        }
      );

      toast.success("Job updated successfully");

      navigate("/recruiter/dashboard");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Something went wrong"
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="max-w-3xl mx-auto px-6 py-10">

        <div className="flex justify-end mb-6">

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

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">
            Edit Job
          </h1>

          <p className="text-gray-500 mt-2">
            Update your existing job posting
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="
          bg-white
          rounded-2xl
          shadow-sm
          p-8
          space-y-6
          "
        >

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Ex. Google"
              className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-emerald-500
              "
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title
            </label>

            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Ex. Backend Developer"
              className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-emerald-500
              "
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ahmedabad"
              className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-emerald-500
              "
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary
            </label>

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="25000"
              className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-emerald-500
              "
            />

          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type
          </label>

          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full Time</option>
            <option value="Part-time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Mode
            </label>

            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Work Mode</option>
              <option value="Remote">Remote</option>
              <option value="On-site">Onsite</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills Required
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-emerald-500
              "
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write job details..."
              className="
              w-full
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-emerald-500
              resize-none
              "
            />

          </div>

          <div className="flex items-center gap-4 pt-4">

            <button
              type="submit"
              className="
              bg-blue-500
              hover:bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
              transition
              shadow-sm
              "
            >
              Update Job
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/recruiter/dashboard")
              }
              className="
              bg-slate-200
              hover:bg-slate-300
              text-gray-700
              px-6
              py-3
              rounded-xl
              transition
              "
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default EditJob;
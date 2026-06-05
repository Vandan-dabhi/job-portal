import React from "react";

const ApplyModal = ({
  selectedJob,
  setSelectedJob,
  resume,
  setResume,
  coverLetter,
  setCoverLetter,
  handleApply
}) => {

  if (!selectedJob) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Apply for {selectedJob.jobTitle}
        </h2>

        <p className="text-gray-500 mb-6">
          Upload your resume and optional cover letter.
        </p>

        {/* Resume Upload */}

        <div className="mb-4">

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume
          </label>

          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg p-2"
          />

        </div>

        {/* Cover Letter */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter (Optional)
          </label>

          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write something about yourself..."
            className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none"
          />

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setSelectedJob(null)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 h-10 rounded-lg transition"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-10 rounded-lg transition"
          >
            Submit
          </button>

        </div>

      </div>

    </div>
  );
};

export default ApplyModal;
import React from "react";

const BecomeRecruiterModal = ({
  showRecruiterModal,
  setShowRecruiterModal,
  companyName,
  setCompanyName,
  handleBecomeRecruiter
}) => {

  if (!showRecruiterModal) return null;

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Become Recruiter
        </h2>

        <p className="text-gray-500 mb-5">
          Enter your company name to create jobs and manage applications.
        </p>

        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => {
              setShowRecruiterModal(false);
              setCompanyName("");
            }}
            className="
            px-5
            py-2
            rounded-xl
            bg-gray-200
            hover:bg-gray-300
            transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleBecomeRecruiter}
            className="
            px-5
            py-2
            rounded-xl
            bg-emerald-500
            hover:bg-emerald-600
            text-white
            transition
            "
          >
            Continue
          </button>

        </div>

      </div>

    </div>

  );

};

export default BecomeRecruiterModal;
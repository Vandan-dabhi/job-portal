import React from "react";

const DeleteJobModal = ({
  deleteJobId,
  setDeleteJobId,
  handleDelete,
}) => {

  if (!deleteJobId) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Delete Job
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this job?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={() => setDeleteJobId(null)}
            className="
            px-4 py-2
            bg-gray-200
            hover:bg-gray-300
            rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={() => handleDelete(deleteJobId)}
            className="
            px-4 py-2
            bg-red-500
            hover:bg-red-600
            text-white
            rounded-xl
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteJobModal;
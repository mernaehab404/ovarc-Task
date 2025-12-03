import React from "react";

const EmptyState = ({ type, isAuthenticated }) => {
  if (type === "books") {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-gray-400 text-6xl mb-4">📚</div>
        <p className="text-gray-600 text-lg font-medium">
          No books found in this store.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          {isAuthenticated
            ? "Click 'Add to inventory' to add books to this store."
            : "Sign in to add books to this store."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <div className="text-gray-400 text-6xl mb-4">👤</div>
      <p className="text-gray-600 text-lg font-medium">Authors view coming soon</p>
      <p className="text-gray-500 text-sm mt-2">
        This feature will group books by author for easier browsing.
      </p>
    </div>
  );
};

export default EmptyState;


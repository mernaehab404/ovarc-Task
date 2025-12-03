import React from "react";

const ViewTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex mb-4 w-full justify-center items-center">
      <button
        onClick={() => onTabChange("books")}
        className={`px-4 border-b-2 py-2 ${
          activeTab === "books" ? "border-b-main" : "border-b-transparent"
        }`}
      >
        Books
      </button>
      <button
        onClick={() => onTabChange("authors")}
        className={`px-4 border-b-2 py-2 ${
          activeTab === "authors" ? "border-b-main" : "border-b-transparent"
        }`}
      >
        Authors
      </button>
    </div>
  );
};

export default ViewTabs;


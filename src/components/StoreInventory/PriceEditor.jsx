import React from "react";

const PriceEditor = ({
  book,
  isEditing,
  editPrice,
  onPriceChange,
  onSave,
  onCancel,
  isAuthenticated,
  isSubmitting,
  onEditClick,
}) => {
  if (isEditing) {
    return (
      <div className="flex gap-2 items-center">
        <input
          type="number"
          step="0.01"
          value={editPrice}
          onChange={(e) => onPriceChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSave(book.id);
            }
            if (e.key === "Escape") {
              onCancel();
            }
          }}
          className="border border-gray-300 rounded p-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
          disabled={!isAuthenticated}
        />
        <button
          onClick={() => onSave(book.id)}
          className="bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isAuthenticated || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-2 py-1 rounded text-sm hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold">
        ${book.price?.toFixed(2) || "0.00"}
      </span>
      {isAuthenticated && (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
          onClick={() => onEditClick(book)}
          disabled={isSubmitting}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default PriceEditor;


import React from "react";
import Modal from "../Modal";

const AddBookModal = ({
  show,
  onClose,
  onSave,
  bookSearchTerm,
  onBookSearchChange,
  selectedBookId,
  onBookSelect,
  newPrice,
  onPriceChange,
  availableBooks,
  initialBooks,
  isSubmitting,
  isAuthenticated,
}) => {
  return (
    <Modal
      title="Add Book to Store"
      save={onSave}
      cancel={onClose}
      show={show}
      saveButtonText={isSubmitting ? "Adding..." : "Add Book"}
      saveButtonDisabled={
        !selectedBookId || !newPrice || !isAuthenticated || isSubmitting
      }
    >
      <div className="flex flex-col gap-4 w-full">
        <div>
          <label
            htmlFor="book_search"
            className="block text-gray-700 font-medium mb-1"
          >
            Search Book
          </label>
          <input
            id="book_search"
            type="text"
            value={bookSearchTerm}
            onChange={(e) => onBookSearchChange(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Search by book title..."
          />
        </div>

        <div>
          <label
            htmlFor="book_select"
            className="block text-gray-700 font-medium mb-1"
          >
            Select Book
          </label>
          <select
            id="book_select"
            value={selectedBookId}
            onChange={(e) => onBookSelect(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            required
          >
            <option value="" disabled>
              {availableBooks.length === 0
                ? "No books available"
                : "Select a book"}
            </option>
            {(bookSearchTerm.trim() ? availableBooks : initialBooks).map(
              (book) => (
                <option key={book.id} value={book.id}>
                  {book.name} (Pages: {book.page_count})
                </option>
              )
            )}
          </select>
          {!bookSearchTerm.trim() && availableBooks.length > 7 && (
            <p className="text-sm text-gray-500 mt-1">
              Showing first 7 books. Use search to find more.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 font-medium mb-1"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter Price (e.g., 29.99)"
            required
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddBookModal;


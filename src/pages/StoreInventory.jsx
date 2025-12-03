import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Table from "../components/Table/Table";
import useLibraryDataWithMock from "../hooks/useLibraryDataWithMock";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";
import StatisticsCards from "../components/StoreInventory/StatisticsCards";
import NotificationToast from "../components/StoreInventory/NotificationToast";
import ViewTabs from "../components/StoreInventory/ViewTabs";
import EmptyState from "../components/StoreInventory/EmptyState";
import AddBookModal from "../components/StoreInventory/AddBookModal";
import { useInventoryActions } from "../hooks/useInventoryActions";
import { useInventoryColumns } from "../hooks/useInventoryColumns";
import { useNotification } from "../hooks/useNotification";

const StoreInventory = () => {
  const { storeId } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const { isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState("books");
  const [showModal, setShowModal] = useState(false);
  const [bookSearchTerm, setBookSearchTerm] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    storeBooks,
    books,
    inventory,
    setInventory,
    isLoading,
    currentStore,
  } = useLibraryDataWithMock({ storeId, searchTerm });

  const { notification, showNotification, hideNotification } =
    useNotification();

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalBooks = storeBooks.length;
    const totalValue = storeBooks.reduce(
      (sum, book) => sum + (book.price || 0),
      0
    );
    const averagePrice = totalBooks > 0 ? totalValue / totalBooks : 0;
    const totalPages = storeBooks.reduce(
      (sum, book) => sum + (book.page_count || 0),
      0
    );

    return {
      totalBooks,
      totalValue,
      averagePrice,
      totalPages,
    };
  }, [storeBooks]);

  const view = searchParams.get("view") || "books";
  useEffect(() => {
    if (view === "authors" || view === "books") {
      setActiveTab(view);
    }
  }, [view]);

  const availableBooks = useMemo(() => {
    if (!storeId) return [];

    const storeInventoryBookIds = inventory
      .filter((item) => item.store_id === parseInt(storeId, 10))
      .map((item) => item.book_id);

    let filtered = books.filter(
      (book) => !storeInventoryBookIds.includes(book.id)
    );

    if (bookSearchTerm.trim()) {
      const lowerSearch = bookSearchTerm.toLowerCase();
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(lowerSearch)
      );
    }

    return filtered;
  }, [books, inventory, storeId, bookSearchTerm]);

  const initialBooks = useMemo(() => {
    return availableBooks.slice(0, 7);
  }, [availableBooks]);

  // Modal controls
  const openModal = () => {
    setShowModal(true);
    setBookSearchTerm("");
    setSelectedBookId("");
    setNewPrice("");
  };

  const closeModal = () => {
    setShowModal(false);
    setBookSearchTerm("");
    setSelectedBookId("");
    setNewPrice("");
  };

  // Inventory actions hook
  const {
    editingPriceId,
    editPrice,
    setEditPrice,
    handleEditPrice,
    handleSavePrice,
    handleCancelPriceEdit,
    handleDeleteBook,
    handleAddBook,
  } = useInventoryActions({
    storeId,
    inventory,
    setInventory,
    storeBooks,
    books,
    isAuthenticated,
    showNotification,
    setIsSubmitting,
  });

  // Handle add book with modal state management
  const handleAddBookSubmit = useCallback(async () => {
    const result = await handleAddBook(selectedBookId, newPrice);
    if (result?.success) {
      closeModal();
    }
  }, [handleAddBook, selectedBookId, newPrice]);

  // Table columns hook
  const columns = useInventoryColumns({
    editingPriceId,
    editPrice,
    setEditPrice,
    handleSavePrice,
    handleCancelPriceEdit,
    handleEditPrice,
    handleDeleteBook,
    isAuthenticated,
    isSubmitting,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-6">
      <ViewTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <Header
        addNew={
          isAuthenticated
            ? openModal
            : () =>
                showNotification(
                  "Please sign in to add books to inventory",
                  "error"
                )
        }
        title={`Store Inventory${
          currentStore ? ` - ${currentStore.name}` : ""
        }`}
        buttonTitle="Add to inventory"
        buttonDisabled={!isAuthenticated || isSubmitting}
      />

      <StatisticsCards statistics={statistics} />

      <NotificationToast
        notification={notification}
        onClose={hideNotification}
      />

      {activeTab === "books" ? (
        storeBooks.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table data={storeBooks} columns={columns} />
          </div>
        ) : (
          <EmptyState type="books" isAuthenticated={isAuthenticated} />
        )
      ) : (
        <EmptyState type="authors" isAuthenticated={isAuthenticated} />
      )}

      <AddBookModal
        show={showModal}
        onClose={closeModal}
        onSave={handleAddBookSubmit}
        bookSearchTerm={bookSearchTerm}
        onBookSearchChange={setBookSearchTerm}
        selectedBookId={selectedBookId}
        onBookSelect={setSelectedBookId}
        newPrice={newPrice}
        onPriceChange={setNewPrice}
        availableBooks={availableBooks}
        initialBooks={initialBooks}
        isSubmitting={isSubmitting}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
};

export default StoreInventory;

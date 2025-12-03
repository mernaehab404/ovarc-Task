import { useCallback, useState } from "react";
import { BASE_URL } from "./useLibraryDataWithMock";

export const useInventoryActions = ({
  storeId,
  inventory,
  setInventory,
  storeBooks,
  books,
  isAuthenticated,
  showNotification,
  setIsSubmitting,
}) => {
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  const handleEditPrice = useCallback(
    (book) => {
      if (!isAuthenticated) {
        showNotification("Please sign in to edit book prices", "error");
        return;
      }
      setEditingPriceId(book.id);
      setEditPrice(book.price?.toString() || "");
    },
    [isAuthenticated, showNotification]
  );

  const handleSavePrice = useCallback(
    async (bookId) => {
      if (!isAuthenticated) {
        showNotification("Please sign in to edit book prices", "error");
        return;
      }

      const price = parseFloat(editPrice);
      if (isNaN(price) || price < 0) {
        showNotification("Please enter a valid price", "error");
        return;
      }

      const inventoryItem = inventory.find(
        (item) =>
          item.store_id === parseInt(storeId, 10) && item.book_id === bookId
      );

      if (inventoryItem) {
        try {
          setIsSubmitting(true);
          const response = await fetch(
            `${BASE_URL}/inventory/${inventoryItem.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ price }),
            }
          );

          if (response.ok) {
            const updatedItem = await response.json();
            setInventory((prev) =>
              prev.map((item) =>
                item.id === inventoryItem.id ? updatedItem : item
              )
            );
            setEditingPriceId(null);
            setEditPrice("");
            showNotification("Price updated successfully!", "success");
          } else {
            throw new Error("Failed to update price");
          }
        } catch (error) {
          console.error("Error updating price:", error);
          setInventory((prev) =>
            prev.map((item) =>
              item.id === inventoryItem.id ? { ...item, price } : item
            )
          );
          setEditingPriceId(null);
          setEditPrice("");
          showNotification("Price updated (offline mode)", "success");
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [
      inventory,
      storeId,
      editPrice,
      setInventory,
      isAuthenticated,
      showNotification,
      setIsSubmitting,
    ]
  );

  const handleCancelPriceEdit = useCallback(() => {
    setEditingPriceId(null);
    setEditPrice("");
  }, []);

  const handleDeleteBook = useCallback(
    async (bookId) => {
      if (!isAuthenticated) {
        showNotification(
          "Please sign in to delete books from inventory",
          "error"
        );
        return;
      }
      const book = storeBooks.find((b) => b.id === bookId);
      if (!book) return;

      if (
        window.confirm(
          `Are you sure you want to remove "${book.name}" from this store?`
        )
      ) {
        const inventoryItem = inventory.find(
          (item) =>
            item.store_id === parseInt(storeId, 10) && item.book_id === bookId
        );

        if (inventoryItem) {
          try {
            setIsSubmitting(true);
            const response = await fetch(
              `${BASE_URL}/inventory/${inventoryItem.id}`,
              {
                method: "DELETE",
              }
            );

            if (response.ok) {
              setInventory((prev) =>
                prev.filter((item) => item.id !== inventoryItem.id)
              );
              showNotification(
                `"${book.name}" removed from inventory`,
                "success"
              );
            } else {
              throw new Error("Failed to delete inventory item");
            }
          } catch (error) {
            console.error("Error deleting inventory item:", error);
            setInventory((prev) =>
              prev.filter((item) => item.id !== inventoryItem.id)
            );
            showNotification(`"${book.name}" removed (offline mode)`, "success");
          } finally {
            setIsSubmitting(false);
          }
        }
      }
    },
    [
      storeBooks,
      inventory,
      storeId,
      setInventory,
      isAuthenticated,
      showNotification,
      setIsSubmitting,
    ]
  );

  const handleAddBook = useCallback(
    async (selectedBookId, newPrice) => {
      if (!isAuthenticated) {
        showNotification("Please sign in to add books to inventory", "error");
        return { success: false };
      }

      if (!selectedBookId || !newPrice) {
        showNotification("Please select a book and enter a price", "error");
        return { success: false };
      }

      const price = parseFloat(newPrice);
      if (isNaN(price) || price < 0) {
        showNotification("Please enter a valid price", "error");
        return { success: false };
      }

      const existingItem = inventory.find(
        (item) =>
          item.store_id === parseInt(storeId, 10) &&
          item.book_id === parseInt(selectedBookId, 10)
      );

      if (existingItem) {
        showNotification("This book is already in the store inventory", "error");
        return { success: false };
      }

      try {
        setIsSubmitting(true);
        const selectedBook = books.find(
          (b) => b.id === parseInt(selectedBookId, 10)
        );
        const newInventoryItem = {
          book_id: parseInt(selectedBookId, 10),
          store_id: parseInt(storeId, 10),
          price,
        };

        const response = await fetch(`${BASE_URL}/inventory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newInventoryItem),
        });

        if (response.ok) {
          const createdItem = await response.json();
          setInventory((prev) => [...prev, createdItem]);
          showNotification(
            `"${selectedBook?.name || "Book"}" added to inventory successfully!`,
            "success"
          );
          return { success: true };
        } else {
          throw new Error("Failed to add book to inventory");
        }
      } catch (error) {
        console.error("Error adding book to inventory:", error);
        const maxId =
          inventory.length > 0 ? Math.max(...inventory.map((i) => i.id)) : 0;
        const selectedBook = books.find(
          (b) => b.id === parseInt(selectedBookId, 10)
        );
        const tempItem = {
          id: maxId + 1,
          book_id: parseInt(selectedBookId, 10),
          store_id: parseInt(storeId, 10),
          price,
        };
        setInventory((prev) => [...prev, tempItem]);
        showNotification(
          `"${selectedBook?.name || "Book"}" added (offline mode)`,
          "success"
        );
        return { success: true };
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      inventory,
      storeId,
      setInventory,
      books,
      isAuthenticated,
      showNotification,
      setIsSubmitting,
    ]
  );

  return {
    editingPriceId,
    editPrice,
    setEditPrice,
    handleEditPrice,
    handleSavePrice,
    handleCancelPriceEdit,
    handleDeleteBook,
    handleAddBook,
  };
};


import { useMemo } from "react";
import TableActions from "../components/ActionButton/TableActions";
import PriceEditor from "../components/StoreInventory/PriceEditor";

export const useInventoryColumns = ({
  editingPriceId,
  editPrice,
  setEditPrice,
  handleSavePrice,
  handleCancelPriceEdit,
  handleEditPrice,
  handleDeleteBook,
  isAuthenticated,
  isSubmitting,
}) => {
  const columns = useMemo(
    () => [
      { header: "Book Id", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Pages", accessorKey: "page_count" },
      { header: "Author", accessorKey: "author_name" },
      {
        header: "Price",
        accessorKey: "price",
        cell: ({ row }) => (
          <PriceEditor
            book={row.original}
            isEditing={editingPriceId === row.original.id}
            editPrice={editPrice}
            onPriceChange={setEditPrice}
            onSave={handleSavePrice}
            onCancel={handleCancelPriceEdit}
            isAuthenticated={isAuthenticated}
            isSubmitting={isSubmitting}
            onEditClick={handleEditPrice}
          />
        ),
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => (
          <TableActions
            row={row}
            onEdit={() => handleEditPrice(row.original)}
            onDelete={() => handleDeleteBook(row.original.id)}
            disabled={!isAuthenticated}
          />
        ),
      },
    ],
    [
      editingPriceId,
      editPrice,
      setEditPrice,
      handleSavePrice,
      handleCancelPriceEdit,
      handleEditPrice,
      handleDeleteBook,
      isAuthenticated,
      isSubmitting,
    ]
  );

  return columns;
};


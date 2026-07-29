import { useState } from "react";

import { useDeleteExpenseMutation, useGetExpensesQuery } from "../api";

import { ExpenseDto } from "../api/dtos/expense.dto";

export function useExpenses() {
  const { data = [], isLoading } = useGetExpensesQuery();

  const [deleteExpenseMutation] = useDeleteExpenseMutation();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState<ExpenseDto>();

  async function deleteExpense() {
    if (!selectedExpense) return;

    await deleteExpenseMutation(selectedExpense.id).unwrap();

    closeDeleteDialog();
  }

  function openCreateDrawer() {
    setSelectedExpense(undefined);
    setDrawerOpen(true);
  }

  function openEditDrawer(expense: ExpenseDto) {
    setSelectedExpense(expense);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setSelectedExpense(undefined);
    setDrawerOpen(false);
  }

  function openDeleteDialog(expense: ExpenseDto) {
    setSelectedExpense(expense);
    setDeleteDialogOpen(true);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
  }

  return {
    items: data,

    loading: isLoading,

    drawerOpen,

    deleteDialogOpen,

    selectedExpense,

    deleting: false,

    deleteExpense,

    openCreateDrawer,

    openEditDrawer,

    closeDrawer,

    openDeleteDialog,

    closeDeleteDialog,
  };
}

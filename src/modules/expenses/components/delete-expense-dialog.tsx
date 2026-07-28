import Button from "@/components/ui/button/Button";

import { ExpenseDto } from "../api/dtos/expense.dto";
import { Modal } from "@/components/ui/Modal";

interface Props {
  open: boolean;

  expense?: ExpenseDto;

  loading: boolean;

  onClose(): void;

  onConfirm(): void;
}

export function DeleteExpenseDialog({
  open,
  loading,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal isOpen={open} title="Eliminar gasto" onClose={onClose}>
      <div className="space-y-6">
        <p>¿Desea eliminar este gasto?</p>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-error-500 hover:bg-error-600 disabled:bg-error-300"
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

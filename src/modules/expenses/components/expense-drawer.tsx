import Drawer from "@/components/ui/Drawer";
import { ExpenseDto } from "../api/dtos/expense.dto";
import { ExpenseForm } from "./expense-form";

interface Props {

  open: boolean;

  expense?: ExpenseDto;

  onClose(): void;
}

export function ExpenseDrawer({
  open,
  expense,
  onClose,
}: Props) {

  return (

    <Drawer
      open={open}
      onClose={onClose}
      title={
        expense
          ? "Editar gasto"
          : "Nuevo gasto"
      }
    >

      <ExpenseForm
        expense={expense}
        onSuccess={onClose}
      />

    </Drawer>

  );
}
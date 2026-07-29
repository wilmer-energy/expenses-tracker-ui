import { DashboardContent } from "@/modules/dashboard/components/dashboard-content";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Gestor de gastos"
        description="Gestiona y supervisa tus gastos"
      />
      <DashboardContent />
    </>
  );
}

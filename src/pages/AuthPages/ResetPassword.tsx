import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import ResetPasswordForm from "@/modules/auth/components/reset-password-form";

export default function ResetPassword() {
  return (
    <>
      <PageMeta
        title="Cambiar contraseña"
        description="Usa el código de verificación enviado al correo para cambiar contraseña"
      />
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
}

import ForgotPasswordForm from "@/modules/auth/components/forgot-password-form";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";

export default function ForgotPassword() {
  return (
    <>
      <PageMeta
        title="Cambiar contraseña"
        description="Ingresa tu correo para enviarte un código de verificación"
      />
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    </>
  );
}

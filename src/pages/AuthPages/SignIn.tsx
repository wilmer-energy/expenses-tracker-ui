import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "@/modules/auth/components/sign-in-form";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Iniciar sesión"
        description="Ingresa tu correo y contraseña para continuar"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}

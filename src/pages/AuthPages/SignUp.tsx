import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "@/modules/auth/components/sign-up-form";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Crear cuenta"
        description="Completa tus datos para registrarte"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}

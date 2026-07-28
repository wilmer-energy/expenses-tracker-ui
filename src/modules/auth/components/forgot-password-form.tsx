import { FormProvider } from "react-hook-form";
import { Link } from "react-router";
import Button from "@/components/ui/button/Button";
import { BasicInput } from "@/modules/shared/components/inputs/basic-input";
import { useForgotPasswordForm } from "../custom-hooks/use-forgot-password";

export function ForgotPasswordForm() {
  const { form, onSubmit, isLoading, isValid } = useForgotPasswordForm();

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Cambiar contraseña
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu correo para enviarte un código de verificación.
            </p>
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <BasicInput
                  name="email"
                  label="Correo electrónico"
                  type="email"
                  placeholder="correo@ejemplo.com"
                />
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="sm"
                    disabled={isLoading || !isValid}
                  >
                    {isLoading ? "Solicitando código..." : "Solicitar código"}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              ¿Recuertas tu contraseña?{" "}
              <Link
                to="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;

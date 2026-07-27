import { FormProvider } from "react-hook-form";
import { Link } from "react-router";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import { BasicInput } from "@/modules/shared/components/inputs/basic-input";
import { PasswordInput } from "@/modules/shared/components/inputs/password-input";
import { useSignInForm } from "../custom-hooks/use-sign-in-form";

export function SignInForm() {
  const { form, onSubmit, isLoading, isValid } = useSignInForm();

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Iniciar sesión
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu correo y contraseña para continuar.
            </p>
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <BasicInput
                  name="email"
                  label="Correo electrónico"
                  type="email"
                  placeholder="correo@ejemplo.com"
                />
                <PasswordInput name="password" label="Contraseña" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={form.watch("rememberMe")}
                      onChange={(checked) =>
                        form.setValue("rememberMe", checked, {
                          shouldValidate: true,
                        })
                      }
                    />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Mantener sesión iniciada
                    </span>
                  </div>
                  <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="sm"
                    disabled={isLoading || !isValid}
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;

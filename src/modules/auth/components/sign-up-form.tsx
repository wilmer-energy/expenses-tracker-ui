import { FormProvider } from "react-hook-form";
import { Link } from "react-router";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import { BasicInput } from "@/modules/shared/components/inputs/basic-input";
import { PasswordInput } from "@/modules/shared/components/inputs/password-input";
import { useSignUpForm } from "../custom-hooks/use-sign-up-form";

export function SignUpForm() {
  const { form, onSubmit, isLoading, isValid } = useSignUpForm();

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Crear cuenta
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completa tus datos para registrarte.
            </p>
          </div>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <BasicInput
                  name="name"
                  label="Nombre"
                  placeholder="Tu nombre"
                />
                <BasicInput
                  name="email"
                  label="Correo electrónico"
                  type="email"
                  placeholder="correo@ejemplo.com"
                />
                <PasswordInput name="password" label="Contraseña" />
                <PasswordInput
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  placeholder="Repite tu contraseña"
                />
                <div className="flex items-start gap-3">
                  <Checkbox
                    className="w-5 h-5 mt-0.5"
                    checked={form.watch("acceptTerms")}
                    onChange={(checked) =>
                      form.setValue("acceptTerms", checked, {
                        shouldValidate: true,
                      })
                    }
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Al crear una cuenta aceptas los{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Términos y Condiciones
                    </span>{" "}
                    y nuestra{" "}
                    <span className="text-gray-800 dark:text-white">
                      Política de Privacidad
                    </span>
                    .
                  </p>
                </div>
                {form.formState.errors.acceptTerms?.message && (
                  <p className="text-xs text-error-500">
                    {form.formState.errors.acceptTerms.message}
                  </p>
                )}
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    size="sm"
                    disabled={isLoading || !isValid}
                  >
                    {isLoading ? "Creando cuenta..." : "Registrarse"}
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              ¿Ya tienes una cuenta?{" "}
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

export default SignUpForm;

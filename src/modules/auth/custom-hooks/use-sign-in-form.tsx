import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router";
import { useLoginMutation } from "../api";
import { setAccessToken } from "@/modules/shared/lib/auth-storage";
import { getApiErrorMessage } from "@/modules/shared/types/api-error";

const signInSchema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
  rememberMe: z.boolean(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export function useSignInForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      setAccessToken(response.access_token, data.rememberMe);
      toast.success("Sesión iniciada correctamente");

      const redirectPath =
        (location.state as { from?: { pathname: string } } | null)?.from
          ?.pathname ?? "/";

      navigate(redirectPath, { replace: true });
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(error, "No se pudo iniciar sesión. Verifica tus datos."),
      );
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    isValid: form.formState.isValid,
  };
}

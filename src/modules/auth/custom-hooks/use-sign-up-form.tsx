import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useLoginMutation, useRegisterMutation } from "../api";
import { setAccessToken } from "@/modules/shared/lib/auth-storage";
import { getApiErrorMessage } from "@/modules/shared/types/api-error";

const signUpSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
    password: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
    acceptTerms: z.boolean().refine((value) => value, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export function useSignUpForm() {
  const navigate = useNavigate();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      setAccessToken(response.access_token, true);
      toast.success("Cuenta creada correctamente");
      navigate("/", { replace: true });
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(error, "No se pudo crear la cuenta. Intenta de nuevo."),
      );
    }
  };

  return {
    form,
    onSubmit,
    isLoading: isRegistering || isLoggingIn,
    isValid: form.formState.isValid,
  };
}

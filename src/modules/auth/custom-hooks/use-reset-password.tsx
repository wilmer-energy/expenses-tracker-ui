import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { getApiErrorMessage } from "@/modules/shared/types/api-error";
import { useResetPasswordMutation } from "../api";

const signUpSchema = z
  .object({
    code: z.string().min(1, "El código es requerido"),
    email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
    password: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        "La contraseña debe contener al menos una letra y un número",
      ),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export function useResetPasswordForm() {
  const navigate = useNavigate();
  const [resetPassword, { isLoading: isRegistering }] =
    useResetPasswordMutation();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      code: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await resetPassword({
        email: data.email,
        code: data.code,
        password: data.password
      }).unwrap();

      navigate("/signin", { replace: true });
      toast.success("Contraseña cambiada correctamente.");
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(
          error,
          "No se pudo cambiar la contraseña. Intenta de nuevo.",
        ),
      );
    }
  };

  return {
    form,
    onSubmit,
    isLoading: isRegistering,
    isValid: form.formState.isValid,
  };
}

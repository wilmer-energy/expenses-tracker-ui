import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useForgotPasswordMutation } from "../api";
import { getApiErrorMessage } from "@/modules/shared/types/api-error";

const signUpSchema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export function useForgotPasswordForm() {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading: isRegistering }] =
    useForgotPasswordMutation();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await forgotPassword({
        email: data.email,
      }).unwrap();

      navigate("/reset-password", { replace: true });
      toast.success(
        "Correo enviado correctamente. Revisa tu bandeja de entrada.",
      );
    } catch (error: unknown) {
      toast.error(
        getApiErrorMessage(
          error,
          "No se pudo enviar el correo. Intenta de nuevo.",
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

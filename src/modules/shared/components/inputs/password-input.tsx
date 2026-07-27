import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "@/icons";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

export function PasswordInput({
  name,
  label,
  placeholder = "Ingresa tu contraseña",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message;

  return (
    <div>
      <Label>
        {label} <span className="text-error-500">*</span>
      </Label>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              id={name}
              name={field.name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              value={field.value ?? ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={Boolean(errorMessage)}
              hint={
                typeof errorMessage === "string" ? errorMessage : undefined
              }
            />
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? (
            <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
          ) : (
            <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
          )}
        </button>
      </div>
    </div>
  );
}

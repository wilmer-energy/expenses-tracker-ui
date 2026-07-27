import { useFormContext, Controller } from "react-hook-form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

interface BasicInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number";
}

export function BasicInput({
  name,
  label,
  placeholder,
  type = "text",
}: BasicInputProps) {
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
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            name={field.name}
            type={type}
            placeholder={placeholder}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={Boolean(errorMessage)}
            hint={typeof errorMessage === "string" ? errorMessage : undefined}
          />
        )}
      />
    </div>
  );
}

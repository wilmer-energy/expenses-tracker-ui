import { Controller, useFormContext } from "react-hook-form";

import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

interface Props {
  name: string;
  label: string;
  disabled?: boolean;
}

export function DateInput({
  name,
  label,
  disabled,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message?.toString();

  return (
    <div>
      <Label>{label}</Label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            type="date"
            value={field.value ?? ""}
            onChange={field.onChange}
            disabled={disabled}
          />
        )}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
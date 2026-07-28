import { Controller, useFormContext } from "react-hook-form";

import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";

interface Props {
  name: string;
  label: string;
  rows?: number;
  placeholder?: string;
}

export function TextAreaInput({
  name,
  label,
  rows = 4,
  placeholder,
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
          <TextArea
            rows={rows}
            placeholder={placeholder}
            value={field.value ?? ""}
            onChange={field.onChange}
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
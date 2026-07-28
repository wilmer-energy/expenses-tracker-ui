import { Controller, useFormContext } from "react-hook-form";

import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  options: Option[];
  disabled?: boolean;
}

export function SelectInput({
  name,
  label,
  placeholder,
  options,
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
          <Select
            value={field.value}
            onChange={field.onChange}
            disabled={disabled}
            options={options}
            placeholder={placeholder}
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
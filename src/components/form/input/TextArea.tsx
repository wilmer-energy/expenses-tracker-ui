import React from "react";

export interface TextAreaProps {
  id?: string;

  name?: string;

  placeholder?: string;

  rows?: number;

  value?: string;

  onChange?: (value: string) => void;

  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;

  className?: string;

  disabled?: boolean;

  error?: boolean;

  success?: boolean;

  hint?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  placeholder = "",
  rows = 3,
  value = "",
  onChange,
  onBlur,
  className = "",
  disabled = false,
  error = false,
  success = false,
  hint,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  let textareaClasses =
    "w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3";

  if (disabled) {
    textareaClasses +=
      " bg-gray-100 border-gray-300 text-gray-500 opacity-60 cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400";
  } else if (error) {
    textareaClasses +=
      " bg-transparent border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:border-error-500 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800";
  } else if (success) {
    textareaClasses +=
      " bg-transparent border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:border-success-500 dark:bg-gray-900 dark:text-white/90 dark:focus:border-success-800";
  } else {
    textareaClasses +=
      " bg-transparent border-gray-300 text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800";
  }

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`${textareaClasses} ${className}`}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
                ? "text-success-500"
                : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;

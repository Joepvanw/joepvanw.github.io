import type { ChangeEventHandler, ReactNode } from 'react';
import { cx } from '../cx';

export interface TextFieldProps {
  /** Field id/name; also links the label. */
  id: string;
  label: ReactNode;
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'url' | 'date';
  /** Appends " *" to the label and sets `required`. */
  required?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** Render a resizable `<textarea>` instead of an `<input>`. */
  multiline?: boolean;
  /** Textarea rows. Default 4. */
  rows?: number;
  /** Validation message, shown amber as "LET OP: <message>"; also gives the input a red border. */
  error?: ReactNode;
}

/** Labelled text input or textarea with focus ring and inline "Let op" error (`.form__group`). */
export function TextField({ id, label, type = 'text', required, placeholder, value, defaultValue, onChange, multiline, rows = 4, error }: TextFieldProps) {
  const common = { id, name: id, placeholder, value, defaultValue, onChange, required, className: cx(error != null && 'error') || undefined };
  return (
    <div className="form__group">
      <label htmlFor={id}>{label}{required ? ' *' : ''}</label>
      {multiline ? <textarea rows={rows} {...common} /> : <input type={type} {...common} />}
      {error != null && (
        <span className="form__error letop"><span className="letop-label">Let op:</span> {error}</span>
      )}
    </div>
  );
}

import type { ChangeEventHandler, ReactNode } from 'react';

export interface CheckboxProps {
  id: string;
  /** Muted label text; may contain a `.link` anchor. */
  label: ReactNode;
  /** Appends " *" to the label and sets `required`. */
  required?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Validation message shown amber as "LET OP: <message>". */
  error?: ReactNode;
}

/** Blue-accent checkbox with a muted inline label (`.form__group--checkbox` + `.checkbox-label`). */
export function Checkbox({ id, label, required, checked, defaultChecked, onChange, error }: CheckboxProps) {
  return (
    <div className="form__group form__group--checkbox">
      <label className="checkbox-label">
        <input type="checkbox" id={id} name={id} required={required} checked={checked} defaultChecked={defaultChecked} onChange={onChange} />
        <span>{label}{required ? ' *' : ''}</span>
      </label>
      {error != null && (
        <span className="form__error letop"><span className="letop-label">Let op:</span> {error}</span>
      )}
    </div>
  );
}

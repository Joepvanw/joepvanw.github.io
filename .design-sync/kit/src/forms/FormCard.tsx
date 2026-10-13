import type { FormEventHandler, ReactNode } from 'react';

export interface FormCardProps {
  /** `FormRow` / `TextField` / `Checkbox` / `Button` children. */
  children?: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  noValidate?: boolean;
}

/** White rounded form panel with large shadow and 20px vertical rhythm (`.contact__form`). Sits well on a `dark` Section. */
export function FormCard({ children, onSubmit, noValidate = true }: FormCardProps) {
  return <form className="contact__form" onSubmit={onSubmit} noValidate={noValidate}>{children}</form>;
}

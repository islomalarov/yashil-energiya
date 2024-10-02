import * as React from "react";
interface TheFeedbackProps {
  firstName: string;
  phone: string;
  message: string;
}
export const EmailTemplate: React.FC<Readonly<TheFeedbackProps>> = ({
  firstName,
  phone,
  message,
}) => (
  <div>
    <h1>FIO - {firstName}!</h1>
    <p>Telefon raqam - {phone}</p>
    <p>Murojat - {message}</p>
  </div>
);

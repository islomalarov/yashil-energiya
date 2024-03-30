// import * as React from "react";

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  phone,
  msg,
}) => (
  <div>
    <h1>FIO - {firstName}!</h1>
    <p>Telefon raqam - {phone}</p>
    <p>Murojat - {msg}</p>
  </div>
);

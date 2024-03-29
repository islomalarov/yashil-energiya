// import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  phone: string;
  msg: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  phone,
  msg,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>{phone}</p>
    <p>{msg}</p>
  </div>
);

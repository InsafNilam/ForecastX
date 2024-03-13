import * as React from "react";

interface VerifyEmailTemplateProps {
  confirmLink: string;
}

export const VerifyEmailTemplate: React.FC<
  Readonly<VerifyEmailTemplateProps>
> = ({ confirmLink }) => (
  <div>
    <h1>Welcome, User!</h1>
    <a href={confirmLink}></a>
  </div>
);

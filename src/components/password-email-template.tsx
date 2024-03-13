interface PasswordEmailTemplateProps {
  resetLink: string;
}

export const PasswordEmailTemplate: React.FC<
  Readonly<PasswordEmailTemplateProps>
> = ({ resetLink }) => (
  <div>
    <h1>Welcome, User!</h1>
    <a href={resetLink}></a>
  </div>
);

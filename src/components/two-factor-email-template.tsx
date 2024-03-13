interface TwoFactorEmailTemplateProps {
  token: string;
}

export const TwoFactorEmailTemplate: React.FC<
  Readonly<TwoFactorEmailTemplateProps>
> = ({ token }) => (
  <div>
    <h1>Welcome, User!</h1>
    <p>Your 2FA Code: ${token}</p>
  </div>
);

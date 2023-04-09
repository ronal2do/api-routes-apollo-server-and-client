import { ROUTES } from "../config";
import { Button } from "./Button";
import { User } from "@prisma/client";

interface HeaderLoginButtonProps {
  type: 'desktop' | 'mobile',
  currentUser: Partial<User>
}

export const HeaderLoginButton: React.FC<HeaderLoginButtonProps> = ({
  type,
  currentUser
}) => {
  if (type === 'mobile') {
    return (
      <Button href={ROUTES.signin} variant="outline">
        {currentUser ? currentUser?.name : "Log in"}
      </Button>
    )
  }

  return (
    <Button href={ROUTES.signin} variant="outline" className="hidden lg:block">
      {currentUser ? currentUser?.name : "Log in"}
    </Button>
  )
};
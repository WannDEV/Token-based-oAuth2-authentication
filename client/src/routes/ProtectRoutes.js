import appRoutes from "../constants/appRoutes";
import { useAuth } from "../shared/context/auth";
import { useRouter } from "next/router";

const isBrowser = () => typeof window !== "undefined";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const Router = useRouter();

  let unprotectedRoutes = [appRoutes.LOGIN_PAGE, appRoutes.LANDING_PAGE];

  let pathIsProtected = unprotectedRoutes.indexOf(Router.pathname) === -1;

  console.log(isAuthenticated);
  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    console.log("Path is protected");
    Router.push(appRoutes.LOGIN_PAGE);
  }

  return children;
};

export default ProtectRoute;

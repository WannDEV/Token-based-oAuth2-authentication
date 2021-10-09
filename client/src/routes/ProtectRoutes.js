import { useAuth } from "../shared/context/auth";
import Router from "next/router";

const ProtectRoute = ({ children, pageProps }) => {
  const { user, loading, role } = useAuth();

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (pageProps.protected && !user) {
    Router.push("/");
    return <div></div>;
  } else {
    if (pageProps.userTypes && pageProps.userTypes.indexOf(role) === -1) {
      Router.push("/");
      return <div></div>;
    }
    return children;
  }
};

export default ProtectRoute;

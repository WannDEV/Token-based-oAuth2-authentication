import { useAuth } from "../shared/context/auth";
import Router from "next/router";

const ProtectRoute = ({ children, pageProps }) => {
  const { user, loading } = useAuth();

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
    return children;
  }
};

export default ProtectRoute;

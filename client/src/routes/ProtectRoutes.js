import { useAuth } from "../shared/context/auth";
import { useState, useEffect } from "react";

const ProtectRoute = ({ children, pageProps }) => {
  const { user } = useAuth();

  if (pageProps.protected && !user) {
    console.log("Pageprops statement was executed");
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return children;
};

export default ProtectRoute;

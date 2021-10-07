import { useState } from "react";

import Login from "./login";
import TestButton from "../components/TestButton";
import { useAuth } from "../shared/context/auth";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>Welcome to Google Oauth in Next.js Application</h1>
      <Login />
      <TestButton />
      <p>{isAuthenticated ? user.name : "Not signed in"}</p>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
    },
  };
}

export default Index;

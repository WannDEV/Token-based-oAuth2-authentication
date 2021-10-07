import Cookies from "js-cookie";

import TestButton from "../components/TestButton";
import { useAuth } from "../shared/context/auth";

const ProtectedPage = () => {
  console.log(Cookies.get("accessToken"));
  const { logout } = useAuth();

  return (
    <div>
      <h1>This is a protected page</h1>
      <TestButton />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}

export default ProtectedPage;

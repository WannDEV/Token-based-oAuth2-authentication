import Cookies from "js-cookie";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";

import TestButton from "../components/TestButton";
import { useAuth } from "../shared/context/auth";
import api from "../services/api";

const ProtectedPage = () => {
  const { logout, user, loading } = useAuth();
  const { data, isValidating } = useSWR(
    loading ? false : "/testfetch",
    api.get
  );

  const showSkeleton = isValidating || loading;

  console.log(
    `isValidating: ${isValidating}, loading: ${loading}, data: ${data}, showSkeleton: ${showSkeleton}`
  );

  return (
    <div>
      <h1>This is a protected page</h1>
      <TestButton />
      <button onClick={logout}>Logout</button>
      {!showSkeleton && data.data.message}
      {showSkeleton && <Skeleton height={40} count={5} />}
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      userTypes: ["user", "admin"],
    },
  };
}

export default ProtectedPage;

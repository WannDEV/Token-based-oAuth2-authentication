import { AuthProvider } from "../shared/context/auth";
import Router from "next/router";
import ProtectRoute from "../routes/ProtectRoutes";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  );
}

export default MyApp;

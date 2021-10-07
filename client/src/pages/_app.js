import { AuthProvider } from "../shared/context/auth";
import ProtectRoute from "../routes/ProtectRoutes";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProtectRoute pageProps={pageProps}>
        <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  );
}

export default MyApp;

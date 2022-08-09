import MainLayout from "../components/layout/MainLayout";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AuthProvider>
  );
}

export default MyApp;

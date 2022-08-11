import MainLayout from "../components/layout/MainLayout";
import { AuthProvider } from "../contexts/AuthContext";
import { StateProvider } from "../contexts/StateContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <AuthProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthProvider>
    </StateProvider>
  );
}

export default MyApp;

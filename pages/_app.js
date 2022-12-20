import { useRouter } from "next/router";
import MainLayout from "../components/layout/MainLayout";
import { AuthProvider } from "../contexts/AuthContext";
import { StateProvider } from "../contexts/StateContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  /*   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    console.log(router.pathname);
    if (!user) {
      if (
        router.pathname !== "/" ||
        router.pathname !== "/tutors" ||
        router.pathname !== "/jobs" ||
        router.pathname !== "/login" ||
        router.pathname !== "/register" ||
        router.pathname !== "/tutorsignup" ||
        router.pathname !== "/studentsignup"
        // router.pathname !== "/job-posting"
      ) {
        router.replace("/");
      }
    }
  }, [router]); */

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

import axios from "axios";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { useAuth } from "../contexts/AuthContext";

const useFetch = (url, checkLoggedIn) => {
  console.log(url);
  console.log(checkLoggedIn);
  const router = useRouter();
  const { currentUser } = useAuth();
  const { mutate } = useSWRConfig();

  const { data, error } = useSWR(url, () =>
    axios
      .get(
        url,
        checkLoggedIn && {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.userId}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => router.push("/"))
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    updateData: function () {
      mutate(url);
    },
  };
};

export default useFetch;

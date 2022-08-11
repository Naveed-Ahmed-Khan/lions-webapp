/* import { useEffect, useState } from "react";

const useFetch = (collectionName, check) => {
  const [isloading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);

    const fetchData = async () => {
      setIsloading(true);
      try {
        const fetchedData = await getDocs(collectionRef);
        setData(fetchedData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsloading(false);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
        alert(error);
      }
    };

    fetchData();
  }, [check]);
  // console.log(data);

  return { data, isloading, errorMessage };
};

export default useFetch;
 */

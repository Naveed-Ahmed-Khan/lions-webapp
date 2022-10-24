import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export const StateProvider = ({ children }) => {
  // const { data: quizData } = useFetch("quizes", check);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [itemToEdit, setSelectedItemtoEdit] = useState(null);
  const [tutors, setTutors] = useState(null);
  const [jobs, setJobs] = useState(null);

  // console.log(tutors);

  /*   useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/get-tutors`
        );
        setTutors(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [check]); */

/*   useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/get-jobs`
        );
        setJobs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [check]); */

  const updateCheck = () => {
    setCheck(!check);
  };

  const selectItemToEdit = (value) => {
    setSelectedItemtoEdit(value);
  };

  const value = {
    loading,
    tutors,
    jobs,
    itemToEdit,
    selectItemToEdit,
    updateCheck,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

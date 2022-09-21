import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import BackdropModal from "../../../components/UI/BackdropModal";
import Button from "../../../components/UI/Button";
import FormGroup from "../../../components/UI/FormGroup";
import Input from "../../../components/UI/Input";
import Spinner from "../../../components/UI/loader/Spinner";
import Table from "../../../components/UI/tables/Table";
import useFetch from "../../../hooks/useFetch";

export default function Subjects() {
  const API = `${process.env.NEXT_PUBLIC_API}/get-subjects`;
  const { data, isLoading, isError, updateData } = useFetch(API, false);

  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");

  const addSubject = async () => {
    const ADD_API = `${process.env.NEXT_PUBLIC_API}/add-subject`;
    try {
      const res = await axios.post(
        ADD_API,
        { name: subject },
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );
      if (res.data) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSubject = async (data) => {
    const DEL_API = `${process.env.NEXT_PUBLIC_API}/delete-subject/${data._id}`;

    try {
      const res = await axios.delete(DEL_API, {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      });
      if (res.data) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const header = [{ id: 1, name: "Name", value: "name" }];
  const actions = [
    {
      id: 1,
      name: "Action",
      value: "Delete",
      onClick: deleteSubject,
    },
  ];

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <div className="flex justify-between">
        <h1 className="text-primary-light text-4xl font-medium tracking-wide">
          Subjects
        </h1>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Subject
        </Button>
      </div>

      <section className="mt-8">
        {isLoading ? (
          <Spinner md />
        ) : (
          <Table header={header} body={data} actions={actions} />
        )}
      </section>

      <BackdropModal
        title="Add Subject"
        show={showModal}
        setShow={setShowModal}
        onSave={addSubject}
      >
        <FormGroup>
          <Input
            required
            label="Subject"
            name={"subject"}
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
        </FormGroup>
      </BackdropModal>
    </div>
  );
}

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

export default function TutorClasses() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clas, setClas] = useState("");
  const [selected, setSelected] = useState(null);

  const API = `${process.env.NEXT_PUBLIC_API}/get-classes`;
  const { data, isLoading, isError, updateData } = useFetch(API, true);
  // console.log(data);

  const addClass = async () => {
    const ADD_API = `${process.env.NEXT_PUBLIC_API}/add-class`;
    try {
      const res = await axios.post(
        ADD_API,
        { name: clas, type: "tutor" },
        {
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        }
      );
      console.log(res.data);
      if (res.data) {
        updateData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const edit = async (data) => {
    setSelected(data);
    setClas(data.name);
    setShowEditModal(true);
  };

  const editClass = async () => {
    const UPDATE_API = `${process.env.NEXT_PUBLIC_API}/update-class/${selected._id}`;

    try {
      const res = await axios.patch(
        UPDATE_API,
        { name: clas },
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

  const deleteClass = async (data) => {
    const DEL_API = `${process.env.NEXT_PUBLIC_API}/delete-class/${data._id}`;

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
      value: "Edit",
      onClick: edit,
    },
    {
      id: 2,
      name: "Action",
      value: "Delete",
      onClick: deleteClass,
    },
  ];

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-primary-light text-4xl font-medium tracking-wide">
          Tutor Classes
        </h2>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Class
        </Button>
      </div>
      <section className="mt-8">
        {isLoading ? (
          <Spinner md />
        ) : (
          <Table
            header={header}
            body={data.filter((clas) => clas.type === "tutor")}
            actions={actions}
          />
        )}
      </section>
      <BackdropModal
        title="Edit Class"
        show={showEditModal}
        setShow={setShowEditModal}
        onSave={editClass}
      >
        <FormGroup>
          <Input
            required
            label="Class"
            name={"class"}
            value={clas}
            onChange={(e) => {
              setClas(e.target.value);
            }}
          />
        </FormGroup>
      </BackdropModal>
      <BackdropModal
        title="Add Class"
        show={showModal}
        setShow={setShowModal}
        onSave={addClass}
      >
        <FormGroup>
          <Input
            required
            label="Class"
            name={"class"}
            value={clas}
            onChange={(e) => {
              setClas(e.target.value);
            }}
          />
        </FormGroup>
      </BackdropModal>
    </div>
  );
}

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import BackdropModal from "../../../components/UI/BackdropModal";
import Button from "../../../components/UI/Button";
import FormGroup from "../../../components/UI/FormGroup";
import Input from "../../../components/UI/Input";
import Spinner from "../../../components/UI/loader/Spinner";
import Select from "../../../components/UI/Select";
import Table from "../../../components/UI/tables/Table";
import useFetch from "../../../hooks/useFetch";

export default function Areas() {
  const [selectedCity, setSelectedCity] = useState("Islamabad");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [area, setArea] = useState("");

  const AREAS_API = `${process.env.NEXT_PUBLIC_API}/get-areas?city=${selectedCity}`;
  const CITIES_API = `${process.env.NEXT_PUBLIC_API}/get-cities`;
  const { data, isLoading, updateData } = useFetch(AREAS_API, true);
  const { data: cities, isLoading: isCitiesLoading } = useFetch(
    CITIES_API,
    true
  );

  const addArea = async () => {
    const ADD_API = `${process.env.NEXT_PUBLIC_API}/add-area`;
    try {
      const res = await axios.post(
        ADD_API,
        {
          city_id: selectedCityId,
          name: area,
        },
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
  const deleteArea = async (data) => {
    const DEL_API = `${process.env.NEXT_PUBLIC_API}/delete-area/${data._id}`;
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

  const header = [
    { id: 1, name: "Name", value: "name" },
    { id: 3, name: "City", value: "city_id", nestedValue: "name" },
  ];
  const actions = [
    {
      id: 1,
      name: "Action",
      value: "Delete",
      onClick: deleteArea,
    },
  ];

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <div className="flex justify-between">
        <h1 className="text-primary-light text-4xl font-medium tracking-wide">
          Areas
        </h1>
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Area
        </Button>
      </div>
      <section className="mt-8">
        {isLoading && isCitiesLoading ? (
          <Spinner md />
        ) : (
          <>
            <FormGroup>
              <Select
                label="City"
                name="city"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                }}
              >
                <option value="">Select</option>
                {cities.map((city) => {
                  return (
                    <option key={city._id} value={city.name}>
                      {city.name}
                    </option>
                  );
                })}
              </Select>
            </FormGroup>
            <Table header={header} body={data} actions={actions} />
          </>
        )}
      </section>
      <BackdropModal
        title="Add Area"
        show={showModal}
        setShow={setShowModal}
        onSave={addArea}
      >
        <FormGroup>
          <Select
            label="City"
            name="cityId"
            value={selectedCityId}
            onChange={(e) => {
              setSelectedCityId(e.target.value);
            }}
          >
            <option value="">Select</option>
            {!isLoading &&
              !isCitiesLoading &&
              cities.map((city) => {
                return (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                );
              })}
          </Select>
        </FormGroup>
        <FormGroup>
          <Input
            required
            label="Area"
            name={"area"}
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
            }}
          />
        </FormGroup>
      </BackdropModal>
    </div>
  );
}

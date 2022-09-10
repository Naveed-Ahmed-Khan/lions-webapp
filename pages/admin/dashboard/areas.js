import React, { useState } from "react";
import FormGroup from "../../../components/UI/FormGroup";
import Spinner from "../../../components/UI/loader/Spinner";
import Select from "../../../components/UI/Select";
import Table from "../../../components/UI/tables/Table";
import useFetch from "../../../hooks/useFetch";

export default function Areas() {
  const [selectedCity, setSelectedCity] = useState("Islamabad");
  const AREAS_API = `${process.env.NEXT_PUBLIC_API}/get-areas?city=${selectedCity}`;
  const CITIES_API = `${process.env.NEXT_PUBLIC_API}/get-cities`;
  const { data, isLoading, updateData } = useFetch(AREAS_API, true);
  const { data: cities, isLoading: isCitiesLoading } = useFetch(
    CITIES_API,
    true
  );
  console.log(data);

  /* useEffect(() => {
    const getAreas=()=>{

    }
  }, [third]) */

  const header = [
    { id: 1, name: "Name", value: "name" },
    { id: 3, name: "City", value: "city_id", nestedValue: "name" },
  ];

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg">
      <h1 className="text-primary-light text-4xl font-medium tracking-wide">
        Areas
      </h1>
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
            <Table header={header} body={data} />
          </>
        )}
      </section>
    </div>
  );
}

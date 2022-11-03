import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Collapse from "../../components/UI/Collapse";
import Container from "../../components/UI/Container";
import ProfileSidebar from "../../components/UI/ProfileSidebar";
import Button from "../../components/UI/Button";
import Tabs from "../../components/UI/Tabs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import * as yup from "yup";
import Input from "../../components/UI/Input";
import FormGroup from "../../components/UI/FormGroup";
import Select from "../../components/UI/Select";
import TextArea from "../../components/UI/TextArea";
import CheckBox from "../../components/UI/CheckBox";
import { filetobase64 } from "../../util/filetobase64";
import ProfileCarousel from "../UI/ProfileCarousel";
import { getCookie } from "cookies-next";

export default function EditSections({ tutor, updateData }) {
  const [editMode, setEditMode] = useState(false);
  const [sections, setSections] = useState(["section1"]);
  const [type, setType] = useState("Simple");
  const [title, setTitle] = useState("");
  const [data, setData] = useState({});

  const updateTutor = async (data) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor._id}`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    updateData();
    setEditMode(false);
  };

  console.log(data);
  useEffect(() => {
    const updateSections = () => {
      const sectionData = {};
      sections.forEach((section, index) => {
        sectionData[`heading${index + 1}`] = data[`heading${index + 1}`] || "";
        sectionData[`content${index + 1}`] = data[`content${index + 1}`] || "";
      });
      console.log(sectionData);
      setData(sectionData);
    };
    updateSections();
  }, [sections]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subSections = [];
    let index = 0;
    sections.forEach((element) => {
      const subSectionData = { heading: "", content: "" };
      for (const [key, value] of Object.entries(data)) {
        if (key.includes(`heading${index + 1}`)) {
          subSectionData.heading = value;
        }
        if (key.includes(`content${index + 1}`)) {
          subSectionData.content = value;
        }
      }
      console.log(subSectionData);
      subSections.push(subSectionData);
      index++;
    });
    console.log(subSections);
    try {
      await updateTutor({
        sections: [...tutor.sections, { type, title, subSections }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" pb-12 w-full">
      <h2 className="mb-8 text-xl sm:text-2xl font-semibold text-primary">
        Sections
        <span className="text-primary text-lg font-normal">{` (Optional)`}</span>
      </h2>
      <div className="sm:p-6 sm:border border-gray-300 rounded-lg">
        <div className="sm:flex justify-between">
          <h3 className="text-lg font-medium text-gray-700">
            Profile Sections
          </h3>
          {!editMode ? (
            <div className="my-6 sm:my-0 sm:w-fit">
              <Button fullwidth onClick={() => setEditMode(true)}>
                Add Section
              </Button>
            </div>
          ) : (
            <div className="mt-4 sm:mt-0 space-y-4 sm:space-y-0 sm:flex gap-8">
              <div>
                <Button
                  fullwidth
                  onClick={() => {
                    setSections([...sections, `section${sections.length + 1}`]);
                  }}
                  type="button"
                >
                  Add Content
                </Button>
              </div>
              <div>
                <Button
                  fullwidth
                  onClick={() => {
                    if (sections.length > 1) {
                      sections.pop();
                      setSections([...sections]);
                    }
                  }}
                  type="button"
                >
                  Remove Content
                </Button>
              </div>
            </div>
          )}
        </div>

        {editMode ? (
          <form onSubmit={handleSubmit} className="mt-2 space-y-8 w-full">
            <FormGroup horizontal>
              <Select
                required
                label="Section Type"
                name={"type"}
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
              >
                <option value="">Select</option>
                <option value="Simple">Simple</option>
                <option value="Collapsable">Collapsable</option>
                <option value="Gallery">Gallery</option>
              </Select>
              <Input
                required
                label="Section Title"
                name={"title"}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </FormGroup>

            {sections.map((section, index) => {
              return (
                <div
                  key={section}
                  className="px-5 border border-gray-300 rounded-lg"
                >
                  <FormGroup>
                    {type === "Gallery" ? (
                      <Input
                        type={"file"}
                        required
                        name={`heading${index + 1}`}
                        onChange={async (e) => {
                          const imagePath = await filetobase64(
                            e.target.files[0]
                          );
                          data[`heading${index + 1}`] = imagePath;
                        }}
                      />
                    ) : (
                      <Input
                        required
                        label="Sub Heading"
                        name={`heading${index + 1}`}
                        onChange={(e) => {
                          data[`heading${index + 1}`] = e.target.value;
                        }}
                      />
                    )}
                  </FormGroup>
                  <FormGroup>
                    {type === "Gallery" ? (
                      <Input
                        required
                        label="Image Title"
                        name={`content${index + 1}`}
                        onChange={(e) => {
                          data[`content${index + 1}`] = e.target.value;
                        }}
                      />
                    ) : (
                      <TextArea
                        required
                        label="Content"
                        name={`content${index + 1}`}
                        onChange={(e) => {
                          data[`content${index + 1}`] = e.target.value;
                        }}
                      />
                    )}
                  </FormGroup>
                </div>
              );
            })}

            <div className="sm:pt-4 space-y-4 sm:space-y-0 sm:flex gap-8">
              <Button
                fullwidth
                onClick={() => {
                  setEditMode(false);
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button fullwidth type="submit">
                Save
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-6 space-y-8">
            {tutor.sections.map((section) => {
              console.log(section);
              return (
                <div key={section._id}>
                  {section.type === "Simple" && (
                    <Simple
                      section={section}
                      tutor={tutor}
                      updateTutor={updateTutor}
                    />
                  )}
                  {section.type === "Gallery" && (
                    <Gallery
                      section={section}
                      tutor={tutor}
                      updateTutor={updateTutor}
                    />
                  )}
                  {section.type === "Collapsable" && (
                    <Collapsable
                      section={section}
                      tutor={tutor}
                      updateTutor={updateTutor}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function Simple({ section, tutor, updateTutor }) {
  const { title, subSections } = section;
  return (
    <div className="sm:p-6 bg-white sm:bg-gray-100 rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl text-primary font-semibold">
          {title}
        </h2>
        {tutor && updateTutor && (
          <button
            onClick={async () => {
              const filtered = tutor.sections.filter(
                (item) => item._id !== section._id
              );
              // console.log(filtered);
              try {
                await updateTutor({
                  sections: filtered,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500 opacity-60 hover:opacity-100 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="space-y-5 bg-white rounded sm:p-6">
        {subSections.map((subSection) => {
          const { heading, content } = subSection;
          return (
            <div className="text-justify" key={subSection._id}>
              <h3 className="mb-2 text-base sm:text-lg text-gray-700 font-medium">
                {heading}:
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export function Gallery({ section, tutor, updateTutor }) {
  const { title, subSections } = section;
  return (
    <div className="sm:p-6 bg-white sm:bg-gray-100 rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl text-primary font-semibold">
          {title}
        </h2>
        {tutor && updateTutor && (
          <button
            onClick={async () => {
              const filtered = tutor.sections.filter(
                (item) => item._id !== section._id
              );
              // console.log(filtered);
              try {
                await updateTutor({
                  sections: filtered,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500 opacity-60 hover:opacity-100 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
      <ProfileCarousel images={subSections} />
    </div>
  );
}
export function Collapsable({ section, tutor, updateTutor }) {
  const { title, subSections } = section;
  return (
    <div className="sm:p-6 bg-white sm:bg-gray-100 rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl text-primary font-semibold">
          {title}
        </h2>
        {title !== "Profile" && tutor && updateTutor && (
          <button
            onClick={async () => {
              const filtered = tutor.sections.filter(
                (item) => item._id !== section._id
              );
              // console.log(filtered);
              try {
                await updateTutor({
                  sections: filtered,
                });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500 opacity-60 hover:opacity-100 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="space-y-5 rounded">
        {subSections.map((subSection) => {
          const { heading, content } = subSection;
          return (
            <Collapse key={subSection._id} label={heading} open={true}>
              {content}
            </Collapse>
          );
        })}
      </div>
    </div>
  );
}

import axios from "axios";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../components/UI/Button";
import Collapse from "../../components/UI/Collapse";
import FormGroup from "../../components/UI/FormGroup";
import Input from "../../components/UI/Input";
import TextArea from "../../components/UI/TextArea";
import BackdropModal from "../UI/BackdropModal";
import ProfileCarousel from "../UI/ProfileCarousel";

export default function EditSections({ tutor, updateData }) {
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedModal, setSelectedModal] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState("")


  const updateTutor = async (data) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API}/update-tutor/${tutor._id}`,
      data,
      { headers: { Authorization: `Bearer ${getCookie("token")}` } }
    );
    updateData();
    setEditMode(false);
  };

  const formik = useFormik({
    initialValues: {
      subSections: selected?.subSections || [],
      title: selected?.title || "",
      type: selected?.type || "Collapsable",
      heading: selectedModal?.heading || "",
      content: selectedModal?.content || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setError("");
      console.log(tutor?.sections)
      if (values.subSections.length > 0) {
        let payload = {}
        if (selected) {
          tutor?.sections.forEach(item => {
            if (item._id === selected._id) {
              item.title = values.title
              item.name = values.name
              item.classes = values.subSections
            }
          })
          payload = { sections: tutor?.sections }
        } else {
          payload = { sections: [...tutor?.sections, { type: values.type, title: values.title, subSections: values.subSections }] }
        }
        console.log(payload)
        try {
          await updateTutor(payload);
          setEditMode(false);
          setSelected(null);
          setSelectedModal(null)
        } catch (error) {
          console.log(error);
        }
      } else {
        setError("Subsection cannot be empty");
      }
    },
  });

  const addSubSection = () => {
    if (selectedModal) {
      formik.values.subSections.forEach(item => {
        if (item._id === selectedModal._id) {
          item.heading = formik.values.heading
          item.content = formik.values.content
        }
      })
      console.log(formik.values.subSections)
      formik.setFieldValue("subSections",
        formik.values.subSections,
      );
      setSelectedModal(null)
    } else {
      formik.setFieldValue("subSections", [
        ...formik.values.subSections,
        { heading: formik.values.heading, content: formik.values.content },
      ]);
    }
  };
  const deleteSubSection = (item) => {
    const updated = formik.values.subSections.filter(
      (val) => val.heading !== item.heading
    );
    formik.setFieldValue("subSections", updated);
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
            {`${editMode ? selected ? "Edit Section" : "Add Section" : "Profile Section"}`}

          </h3>
          {!editMode &&
            <div className="my-6 sm:my-0 sm:w-fit">
              <Button fullwidth onClick={() => setEditMode(true)}>
                Add Section
              </Button>
            </div>
          }
        </div>

        {editMode ? (
          <>
            <form onSubmit={formik.handleSubmit} className="mt-2 space-y-8 w-full">
              <FormGroup horizontal>
                {/* <Select
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
              </Select> */}
                <Input
                  required
                  disabled={formik.values.title === "Profile" ? true : false}
                  label="Section Title"
                  name={"title"}
                  formik={formik}
                />
              </FormGroup>
              <div className="mt-6 sm:p-6 sm:border border-gray-300 rounded-lg">
                <div className="mb-6 sm:flex justify-between">
                  <h3 className="mb-4 text-gray-600 font-medium">Subsections</h3>
                  {editMode &&
                    <div>
                      <Button
                        fullwidth
                        onClick={() => {
                          setShowModal(true)
                        }}
                        type="button"
                      >
                        Add Subsection
                      </Button>
                    </div>
                  }
                </div>
                {formik.values.subSections.length > 0 ?
                  <div className="space-y-6">
                    {formik.values.subSections.map((subSection, index) => {
                      const { heading, content } = subSection;
                      return (
                        <div key={index} className=" bg-gray-200 border border-gray-300 rounded-lg overflow-hidden">
                          <div className="">
                            <div className="p-4 border-b border-b-gray-300 flex items-center justify-between">
                              <h4 className="text-lg font-medium text-primary-light">
                                {heading}
                              </h4>
                              <div className="space-x-4 ">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowModal(true)
                                    setSelectedModal(subSection)
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={2} stroke="currentColor"
                                    className="h-5 w-5 text-gray-500 opacity-60 hover:opacity-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                  </svg>
                                </button>
                                {formik.values.title !== "Profile" &&
                                  <button
                                    type="button"
                                    onClick={deleteSubSection}
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
                                }
                              </div>
                            </div>
                            <div>
                              <p className="p-4 bg-gray-50 text-gray-600">
                                {content}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div> :
                  <div>
                    <p className="py-4 text-center text-gray-500">
                      {"No Subsection Added"}
                    </p>
                  </div>
                }
              </div>
              {error && (
                <div onClick={() => setError("")} className="mt-6 px-5 xl:px-0">
                  <p className="max-w-screen-xl mx-auto cursor-pointer mt-2 text-center font-archivo text-red-500 px-6 py-3 border border-red-500 rounded-lg">
                    {error}
                  </p>
                </div>
              )}
              <div className="sm:pt-4 space-y-4 sm:space-y-0 sm:flex gap-8">
                <Button
                  fullwidth
                  onClick={() => {
                    setEditMode(false);
                    selected && setSelected(null);
                    selectedModal && setSelectedModal(null)
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
            <BackdropModal
              title={selectedModal ? "Edit Subsection" : "Add Subsection"}
              show={showModal}
              setShow={setShowModal}
              onSave={addSubSection}
              onCancel={() => selectedModal && setSelectedModal(null)}
            >
              <div className="mb-6">
                <FormGroup>
                  <Input
                    disabled={formik.values.heading !== "About Me" && formik.values.heading !== "Achievements" ? false : true}
                    required
                    label="Sub Heading"
                    name="heading"
                    formik={formik}
                  />
                </FormGroup>
                <FormGroup>
                  <TextArea
                    required
                    label="Content"
                    name="content"
                    formik={formik}
                  />
                </FormGroup>
              </div>
            </BackdropModal>
          </>
        ) : (
          <div className="mt-6 space-y-8">
            {tutor.sections.map((section) => {
              console.log(section);
              return (
                <div key={section._id}>
                  {section.type === "Collapsable" && (
                    <Collapsable
                      section={section}
                      tutor={tutor}
                      updateTutor={updateTutor}
                      setEditMode={setEditMode}
                      setSelected={setSelected}
                    />
                  )}
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function Collapsable({ section, tutor, updateTutor, setSelected, setEditMode }) {
  const router = useRouter()
  const { title, subSections } = section;
  return (
    <div className="sm:p-6 bg-white sm:bg-gray-100 rounded-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl text-primary font-semibold">
          {title}
        </h2>
        <div className="space-x-4">
          {router.pathname.includes("admin") &&
            <button
              onClick={() => {
                setEditMode(true)
                setSelected(section)
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
                strokeWidth={2} stroke="currentColor"
                className="h-5 w-5 text-gray-500 opacity-60 hover:opacity-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>}

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


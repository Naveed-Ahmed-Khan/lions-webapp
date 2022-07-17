import React from "react";
import Collapse from "../components/UI/Collapse";
import Container from "../components/UI/Container";
import ProfileSidebar from "../components/UI/ProfileSidebar";

const TutorProfile = () => {
  return (
    <>
      <Container color={"gray-100"}>
        <header
          className="h-[25vh] bg-no-repeat bg-cover bg-white"
          style={{
            backgroundImage: "images/flag.jpg",
          }}
        >
          <img
            className="h-full w-full object-cover"
            src="images/flag.png"
            alt=""
          />
        </header>
        <main className="p-6 flex gap-6 bg-white ">
          <div className="w-[420px]">
            <ProfileSidebar />
          </div>
          <section className="w-full flex flex-col gap-10 ">
            <div className="bg-[#EAEAEA] rounded p-8">
              <h2 className=" mb-8 text-primary text-xl font-semibold">
                My Profile
              </h2>
              <div className="flex flex-col gap-8">
                <Collapse label="Personal Information">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus odio distinctio deleniti deserunt est ad
                  perspiciatis veritatis delectus voluptatibus fuga? Quia qui
                  repudiandae ratione. Sint vero impedit saepe et quidem
                  expedita quisquam ex debitis cupiditate? Qui similique totam
                  ut atque.
                </Collapse>
                <Collapse label="About me">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus odio distinctio deleniti deserunt est ad
                  perspiciatis veritatis delectus voluptatibus fuga? Quia qui
                  repudiandae ratione. Sint vero impedit saepe et quidem
                  expedita quisquam ex debitis cupiditate? Qui similique totam
                  ut atque.
                </Collapse>
                <Collapse label="Looking for">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus odio distinctio deleniti deserunt est ad
                  perspiciatis veritatis delectus voluptatibus fuga? Quia qui
                  repudiandae ratione. Sint vero impedit saepe et quidem
                  expedita quisquam ex debitis cupiditate? Qui similique totam
                  ut atque.
                </Collapse>
              </div>
            </div>
            <div className="bg-[#EAEAEA] rounded p-8">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-primary text-xl font-semibold">
                  Chandri Anggara Feedbacks
                </h2>
                <div className="flex mt-2 item-center">
                  <svg
                    className="w-5 h-5 text-yellow-400 fill-current dark:text-gray-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>

                  <svg
                    className="w-5 h-5 text-yellow-400 fill-current dark:text-gray-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>

                  <svg
                    className="w-5 h-5 text-yellow-400 fill-current dark:text-gray-300"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>

                  <svg
                    className="w-5 h-5 text-gray-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>

                  <svg
                    className="w-5 h-5 text-gray-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                  <p className="ml-1 -mt-0.5 text-gray-600">(25)</p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className=" flex flex-col gap-2 bg-white rounded py-4 px-8">
                  <h3 className="text-black opacity-80 text-lg font-semibold">
                    Awais
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Tempore aut numquam voluptatem eveniet velit doloribus
                    quisquam autem rem cupiditate possimus!
                    <p className="text-primary text-end text-sm cursor-pointer">
                      Read More
                    </p>
                  </p>
                </div>
                <div className=" flex flex-col gap-2 bg-white rounded py-3 px-9">
                  <h3 className="text-black opacity-80 text-lg font-semibold">
                    Awais
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Tempore aut numquam voluptatem eveniet velit doloribus
                    quisquam autem rem cupiditate possimus!
                    <p className="text-primary text-end text-sm cursor-pointer">
                      Read More
                    </p>
                  </p>
                </div>
                <div className=" flex flex-col gap-2 bg-white rounded py-3 px-9">
                  <h3 className="text-black opacity-80 text-lg font-semibold">
                    Awais
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Tempore aut numquam voluptatem eveniet velit doloribus
                    quisquam autem rem cupiditate possimus!
                    <p className="text-primary text-end text-sm cursor-pointer">
                      Read More
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Container>
    </>
  );
};

export default TutorProfile;

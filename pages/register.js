/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Container from "../components/UI/Container";
import Image from "next/image";

export default function Register() {
  const router = useRouter();
  return (
    <Container color={"white"}>
      <section className="relative flex justify-center flex-wrap lg:h-screen lg:items-center">
        <div
          className="group relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full overflow-clip cursor-pointer"
          onClick={() => {
            router.push("/studentsignup");
          }}
        >
          <Image
            layout="fill"
            className="absolute object-cover object-bottom group-hover:scale-110 
            blur-none group-hover:blur-[2px] transition-all duration-300 ease-out"
            src="/images/student.jpg"
            alt=""
          />

          {/* desktop */}
          <div
            className="hidden p-6 bg-white bg-opacity-40 absolute w-full h-full lg:flex items-center justify-center
            translate-y-full group-hover:translate-y-0 
            opacity-0 group-hover:opacity-100 transition-all duration-300 "
          >
            <h2 className="text-5xl font-bold text-center text-green-900">
              Sign up as a Student/Parent
            </h2>
          </div>

          {/* mobile */}
          <div
            className="lg:hidden p-6 bg-white bg-opacity-40 absolute w-full h-full flex items-center justify-center 
            transition-all duration-300"
          >
            <h2 className="px-6 text-3xl font-bold text-center text-green-900">
              Sign up as a Student/Parent
            </h2>
          </div>
        </div>
        <div className="lg:hidden w-full flex items-center gap-4 -my-4 z-30">
          <div className="w-full border-b border-b-gray-300" />
          <p className="text-xl text-green-900 font-bold">OR</p>
          <div className="w-full border-b border-b-gray-300" />
        </div>
        <div
          className="group relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full overflow-clip cursor-pointer"
          onClick={() => {
            router.push("/tutorsignup");
          }}
        >
          <Image
            layout="fill"
            className="absolute object-cover object-top group-hover:scale-110 
            blur-none group-hover:blur-[2px] transition-all duration-300 ease-out"
            src="/images/teacher.jpg"
            alt=""
          />

          {/* desktop */}
          <div
            className="hidden p-6 bg-white bg-opacity-40 absolute w-full h-full lg:flex items-center justify-center
            -translate-y-full group-hover:translate-y-0 
            opacity-0 group-hover:opacity-100 transition-all duration-300 "
          >
            <h2 className="text-5xl font-bold text-center text-green-900">
              Sign up as a Tutor
            </h2>
          </div>

          {/* mobile */}
          <div
            className="lg:hidden p-6 bg-white bg-opacity-40 absolute w-full h-full flex items-center justify-center 
            transition-all duration-300"
          >
            <h2 className="px-6 text-3xl font-bold text-center text-green-900">
              Sign up as a Tutor
            </h2>
          </div>
        </div>
      </section>
    </Container>
  );
}

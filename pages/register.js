/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import Container from "../components/UI/Container";

export default function Register() {
  const router = useRouter();
  return (
    <Container color={"white"}>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div
          className="group relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full overflow-clip cursor-pointer"
          onClick={() => {
            router.push("/studentsignup");
          }}
        >
          {/* <Image
            layout="fill"
            className="absolute group-hover:scale-110 
            blur-none group-hover:blur-[2px] transition-all duration-300 ease-out"
            src="/images/student.jpg"
            alt=""
          /> */}
          <img
            className="absolute object-cover group-hover:scale-110 
            blur-none group-hover:blur-[2px] transition-all duration-300 ease-out"
            src="images/student.jpg"
            alt=""
          />
          <div
            className="p-6 bg-white bg-opacity-50 absolute w-full h-full flex items-center justify-center
            translate-y-full group-hover:translate-y-0 
            opacity-0 group-hover:opacity-100 transition-all duration-300 "
          >
            <h1 className="text-5xl font-bold text-center text-green-900">
              Sign up as a Student/Parent
            </h1>
          </div>
        </div>
        <div
          className="group relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full overflow-clip cursor-pointer"
          onClick={() => {
            router.push("/tutorsignup");
          }}
        >
          {/* <Image
            layout="fill"
            className="absolute group-hover:scale-110 
            blur-none group-hover:blur-[2px] transition-all duration-300 ease-out"
            src="/images/teacher.jpg"
            alt=""
          /> */}
          <img
            className="absolute object-cover group-hover:scale-110 
            blur-none group-hover:blur-[2px] transition-all duration-300 ease-out"
            src="images/teacher.jpg"
            alt=""
          />
          <div
            className="p-6 bg-white bg-opacity-50 absolute w-full h-full flex items-center justify-center
            -translate-y-full group-hover:translate-y-0 
            opacity-0 group-hover:opacity-100 transition-all duration-300 "
          >
            <h1 className="text-5xl font-bold text-center text-green-900">
              Sign up as a Tutor
            </h1>
          </div>
        </div>
      </section>
    </Container>
  );
}

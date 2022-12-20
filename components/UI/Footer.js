import Link from "next/link";
import React from "react";

const Footer = ({ classes }) => {
  classes;
  const links = [
    {
      id: 1,
      category: "Subject",

      items: [
        { title: "English", href: "tutors?subject=English" },
        { title: "Urdu", href: "tutors?subject=Urdu" },
        { title: "Maths", href: "tutors?subject=Maths" },
        { title: "Physics", href: "tutors?subject=Physics" },
        { title: "Chemistry", href: "tutors?subject=Chemistry" },
        { title: "Biology", href: "tutors?subject=Biology" },
      ],
    },
    {
      id: 3,
      category: "City",

      items: [
        { title: "Islamabad", href: "tutors?city=Islamabad" },
        { title: "Rawalpindi", href: "tutors?city=Rawalpindi" },
        { title: "Karachi", href: "tutors?city=Karachi" },
        { title: "Lahore", href: "tutors?city=Lahore" },
        { title: "Peshawar", href: "tutors?city=Peshawar" },
        { title: "Queta", href: "tutors?city=Queta" },
      ],
    },
    /* {
      id: 2,
      category: "Classes",

      items: [
        { title: "Junior(1-5)", href: "tutors?class=Junior" },
        { title: "Middle(6-8)", href: "tutors?class=Middle" },
        { title: "Matric(9-10)", href: "tutors?class=Matric" },
        { title: "Intermediate(11-12)", href: "tutors?class=Intermediate" },
        { title: "Bachelors", href: "tutors?class=Bachelors" },
        { title: "Masters", href: "tutors?class=Masters" },
      ],
    }, */
  ];

  return (
    <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-700">
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <a
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <h2 className="text-white text-2xl font-semibold">
                Educationists
              </h2>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-gray-100">
                Educationist is a team of dedicated professionals aiming to
                produce quality education via providing tutoring services
                online/home tutoring.
              </p>
              <p className="mt-4 text-sm text-gray-100">
                We are with an excellent track record of trust, professionalism
                and quality of education services provided online across the
                world and home tutoring services across Pakistan.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4 ">
            <p className="text-white text-lg font-medium col-span-full">
              Find Home/Online Tutors w.r.t
            </p>
            {links.map((link) => {
              return (
                <div key={link.id} className="">
                  <p className="font-medium tracking-wide text-white">
                    {link.category}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {link.items.map((item) => {
                      return (
                        <li key={item.title}>
                          <Link
                            href={`${process.env.NEXT_PUBLIC_URL}/${item.href}`}
                          >
                            <a className="font-roboto tracking-wider text-white hover:underline hover:underline-offset-2 ">
                              {item.title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            <div className="">
              <p className="font-medium tracking-wide text-white">Class</p>
              <ul className="mt-2 space-y-2">
                {classes?.map((item) => {
                  return (
                    <li key={item._id}>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_URL}/tutors?class=${item.name}`}
                      >
                        <a className="font-roboto tracking-wider text-white hover:underline hover:underline-offset-2 ">
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-200 sm:flex-row">
          <p className="text-sm text-white">
            © Copyright {new Date().getFullYear()} The Educationists. All rights
            reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a className="transition-colors duration-300 text-purple-500 ">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 text-white"
              >
                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
              </svg>
            </a>
            <a className="transition-colors duration-300 text-purple-500 ">
              <svg
                viewBox="0 0 30 30"
                fill="currentColor"
                className="h-6 text-white"
              >
                <circle cx="15" cy="15" r="4" />
                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
              </svg>
            </a>
            <a className="transition-colors duration-300 text-purple-500 ">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 text-white"
              >
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

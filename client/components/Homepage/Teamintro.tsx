import React from "react";
import Image from "next/image";
import mehrajvai from "./assets/mehrajvai.jpeg";
import shawonvai from "./assets/shawonvai.jpeg";
import nafi from "./assets/nafi.jpeg";

const Teamintro = () => {
  return (
    <section
      id="Team"
      className="text-gray-400 bg-transparent body-font w-full"
    >
      <div className="text-black text-5xl  text-center font-bold">Our Team</div>
      <div className="container px-5 py-24 w-full mx-auto">
        <div className="flex m-4">
          <div className="lg:w-1/3 lg:mb-0 mb-6 p-4 mx-4 bg-white ">
            <div className="h-full text-center">
              <Image
                width={200}
                height={200}
                alt="testimonial"
                className="w-64 h-64 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-800 bg-gray-800 bg-opacity-10"
                src="/shawonvai.jpeg"
              />
              <p className="leading-relaxed">
                I'm a student currently studying Software Engineering at
                Shahjalal University of Science & Technology. I really enjoy
                learning data structures and algorithms. And I love doing
                Competitive Programming. I'm also interested in exploring core
                Object Oriented Programming concepts.
              </p>
              <span className="inline-block h-1 w-10 rounded bg-slate-500 mt-6 mb-4"></span>
              <h2 className="text-black font-medium title-font tracking-wider text-lg">
                Shawon Majid{" "}
              </h2>
              <p className="text-gray-900">Backend Developer</p>
            </div>
          </div>
          <div className="lg:w-1/3 lg:mb-0 mb-6 p-4 mr-4 bg-white ">
            <div className="h-full text-center ">
              <Image
                width={200}
                height={200}
                alt="testimonial"
                className="w-64 h-64 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-800 bg-gray-800 bg-opacity-10"
                src="/mehrajvai.jpeg"
              />
              <p className="leading-relaxed">
                A highly motivated and hardworking individual, who is seeking an
                apprenticeship in the IT industry to build upon a keen
                scientific interest and start a career as an IT Expert and a
                critical problem solver. The eventual career goal is to become a
                fully-qualified and experienced Software Developer.
              </p>
              <span className="inline-block h-1 w-10 rounded bg-slate-500 mt-6 mb-4"></span>
              <h2 className="text-black font-medium title-font tracking-wider text-lg">
                Md Mehrajul Islam
              </h2>
              <p className="text-gray-900">MERN Develeoper</p>
            </div>
          </div>
          <div className="lg:w-1/3 lg:mb-0 p-4 bg-white">
            <div className="h-full text-center">
              <Image
                width={200}
                height={200}
                alt="testimonial"
                className="w-64 h-64 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-800 bg-gray-800 bg-opacity-10"
                src="/nafi.jpeg"
              />
              <p className="leading-relaxed">
                I am a dedicated and energetic software developer with a diverse
                skill set. My expertise covers a range of areas, including Cloud
                Technology, mobile app and web development. In the realm of web
                development, I've successfully executed projects using Next.js,
                React.js, and JavaScript.
              </p>
              <span className="inline-block h-1 w-10 rounded bg-slate-500 mt-6 mb-4"></span>
              <h2 className="text-black font-medium title-font tracking-wider text-lg">
                Nafi Ullah Shafin
              </h2>
              <p className="text-gray-900">Frontend Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teamintro;

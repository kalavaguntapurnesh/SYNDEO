import Lottie from "lottie-react";
import HeaderLottie from "../assets/lotties/Header.json";

const Hero = () => {
  return (
    <div className="w-full bg-white pt-28 pb-8 h-auto ">
      <div className="max-w-[1400px] m-auto grid md:grid-cols-2 ">
        <div className="flex flex-col gap-4 w-full">
          <div className=" flex items-center lg:justify-start justify-center mt-4 mx-3">
            <h1 className="xl:text-6xl text-[48px] font-bold lg:px-2 xl:leading-[72px] lg:leading-[60px] lg:text-start text-center text-colorFive">
              Find & Book your dream
              <span className="text-colorFour"> appointment with us</span>
            </h1>
          </div>

          <div className="flex items-center lg:justify-start justify-center mx-3">
            <h1 className="lg:text-[24px] text-[24px] font-semibold lg:px-2 lg:text-start text-center text-colorFive">
              Want to know how this happens ?
            </h1>
          </div>

          <div className="flex items-center lg:justify-start justify-center mx-3">
            <p className="lg:text-lg text-[16px] text-gray-600 lg:px-2 lg:text-start text-center">
              But you might feel a bit lost on how to get started. So, Calendly
              does the hard work for you! Everything you need to know is on one
              platform. You will receive guidance throughout the whole
              application process-all completely free.
            </p>
          </div>

          <div className="flex items-center lg:justify-start justify-center md:mx-5">
            <a
              href="/login"
              className="bg-colorFour hover:bg-[#14a800] font-semibold outline-none
              rounded-md hover:shadow-form transition duration-1000 ease-in-out text-white px-8 py-2.5 text-center"
            >
              Get Started Now
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end items-center ">
          <Lottie
            animationData={HeaderLottie}
            loop={true}
            className="lg:w-10/12 w-11/12 lg:h-96 h-92"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

import left from "../assets/left.svg";
import right from "../assets/right.svg";
import Lottie from "lottie-react";
import CarouselOne from "../assets/lotties/CarouselOne.json";
import CarouselTwo from "../assets/lotties/AboutTwo.json";
import CarouselThree from "../assets/lotties/AboutThree.json";
import CarouselFour from "../assets/lotties/CarouselFour.json";
import CarouselFive from "../assets/lotties/CarouselFive.json";
import TwoLottie from "../assets/lotties/TwoLottie.json";

const Carousel = () => {
  return (
    <div className="bg-white">
      <div className="relative pt-8 pb-4">
        <div className="w-full">
          <div className="w-full px-4 mx-auto max-w-[1400px]">
            <div className="justify-center w-full text-center pb-8">
              <div className="w-full max-w-[14000px] mx-auto space-y-4">
                <div className="flex flex-wrap flex-col items-center">
                  <div className="flex items-center justify-center">
                    <img
                      src={left}
                      alt=""
                      width={27}
                      height={52}
                    ></img>
                    <h1 className="text-4xl font-bold tracking-normal text-colorThree dark:text-black mx-1">
                      {" "}
                      Why Use Calendly?
                    </h1>
                    <img
                      src={right}
                      alt=""
                      width={27}
                      height={52}
                    ></img>
                  </div>
                  <div className="md:w-52 w-44 h-1 border-b-4 border-colorFour mt-2"></div>
                </div>

                <div className="text-gray-600 dark:text-gray-800 my-4">
                  <p className="font-medium leading-relaxed md:text-[17px] text-[16px] text-center tracking-wide">
                    Open doors to a world of possibilities with education loans,
                    expert study abroad counseling, comprehensive exam
                    preparation, forex services, credit card solutions,
                    accommodation support, and a rich array of informational
                    resources including scholarships and insightful blogs.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 my-4">
                  <div className="flex flex-col gap-2  justify-center items-center">
                    <Lottie
                      animationData={CarouselFour}
                      loop={true}
                      className="w-[310px] h-[200px]"
                    />
                    <h1 className="font-bold tracking-wide leading-relaxed text-xl text-colorThree">
                      Notifications via SMS
                    </h1>
                    <p>Your own mobile-optimised booking</p>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Lottie
                      animationData={CarouselFive}
                      loop={true}
                      className="w-[310px] h-[200px]"
                    />
                    <h1 className="font-bold tracking-wide leading-relaxed text-xl text-colorThree">
                      Simple Navigation
                    </h1>
                    <p>Your own mobile-optimised booking</p>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Lottie
                      animationData={TwoLottie}
                      loop={true}
                      className="w-[310px] h-[200px]"
                    />
                    <h1 className="font-bold tracking-wide leading-relaxed text-xl text-colorThree">
                      Easy Scheduling
                    </h1>
                    <p>Your own mobile-optimised booking</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-1 gap-4 my-4">
                  <div className="flex flex-col gap-2  justify-center items-center">
                    <Lottie
                      animationData={CarouselOne}
                      loop={true}
                      className="w-[310px] h-[200px]"
                    />
                    <h1 className="font-bold tracking-wide leading-relaxed text-xl text-colorThree">
                      Security & Compliance
                    </h1>
                    <p>Your own mobile-optimised booking</p>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Lottie
                      animationData={CarouselTwo}
                      loop={true}
                      className="w-[310px] h-[200px]"
                    />
                    <h1 className="font-bold tracking-wide leading-relaxed text-xl text-colorThree">
                      Simple Navigation
                    </h1>
                    <p>Your own mobile-optimised booking</p>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <Lottie
                      animationData={CarouselThree}
                      loop={true}
                      className="w-[310px] h-[200px]"
                    />
                    <h1 className="font-bold tracking-wide leading-relaxed text-xl text-colorThree">
                      Easy Scheduling
                    </h1>
                    <p>Your own mobile-optimised booking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

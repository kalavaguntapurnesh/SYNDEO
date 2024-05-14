import Lottie from "lottie-react";
import Calendar from "../assets/lotties/Calendar.json";

const AboutTwo = () => {
  return (
    <div className="bg-white">
      <div className="relative pt-8 pb-8">
        <div className="w-full">
          <div className="w-full px-4 mx-auto max-w-[1400px]">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex items-center justify-center py-4">
                {/* <Image
                  src="/aboutOne.jpg"
                  alt=""
                  width={600}
                  height={400}
                  className="rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] overflow-hidden"
                ></Image> */}
                <Lottie
                  animationData={Calendar}
                  loop={true}
                  className="w-[600px] h-[400px]"
                />
              </div>
              <div className="">
                <div className="w-full space-y-8">
                  <div className=" flex items-center justify-center ">
                    <h3 className="lg:text-start text-center lg:text-4xl text-3xl font-bold tracking-normal text-colorThree dark:text-black">
                      Why Calendly is superior than our{" "}
                      <span className="text-colorFour">competitors?</span>
                    </h3>
                  </div>
                  <div className="flex items-center justify-center content-center">
                    <p className="w-full leading-relaxed tracking-wide font-medium lg:text-start text-center md:text-[17px] text-[16px] text-gray-600 dark:text-gray-800 ">
                      Our experience in various business verticals/domains and
                      different technologies allows us to serve customers of all
                      sizes around the world, providing with software system
                      development; product development in web, mobile / client
                      server environments; or software maintenance and QA.
                    </p>
                  </div>
                  <ul className="space-y-3 pb-4">
                    <li className="space-x-3 ">
                      <div className=" flex flex-row space-x-3 justify-center lg:justify-start items-center">
                        <svg
                          className="flex-shrink-0 w-6 h-6 text-colorFour hover:text-primaryColor transition duration-1000 ease-in-out"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="font-medium md:text-[17px] text-[16px] text-gray-600 dark:text-gray-800 tracking-wide leading-relaxed">
                          Progressively introduce new features with interactive
                          Tours
                        </span>
                      </div>
                    </li>
                    <li className="space-x-3 ">
                      <div className=" flex flex-row space-x-3 justify-center lg:justify-start items-center">
                        <svg
                          className="flex-shrink-0 w-6 h-6 text-colorFour hover:text-primaryColor transition duration-1000 ease-in-out"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="font-medium md:text-[17px] text-[16px] text-gray-600 dark:text-gray-800 tracking-wide leading-relaxed">
                          Target the most receptive users for efficient feature
                          adoption
                        </span>
                      </div>
                    </li>
                    <li className="space-x-3">
                      <div className=" flex flex-row space-x-3 justify-center lg:justify-start items-center">
                        <svg
                          className="flex-shrink-0 w-6 h-6 text-colorFour hover:text-primaryColor transition duration-1000 ease-in-out"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="font-medium md:text-[17px] text-[16px] text-gray-600 dark:text-gray-800 tracking-wide leading-relaxed">
                          Offer additional guidance in Tooltips to drive users
                          to value
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="my-4 flex justify-center lg:justify-start">
                  <a
                    href="/contact"
                    className="bg-colorThree text-white text-center hover:bg-colorTwo transition duration-1000 ease-in-out font-semibold rounded-lg px-8 py-3"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTwo;

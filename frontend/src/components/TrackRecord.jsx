
import { Clock8, Earth, CalendarCheck, Laptop } from "lucide-react";

const TrackRecord = () => {
  return (
    <div className="bg-white md:pt-12 pt-4 pb-4">
      <div className="relative pb-4">
        <div className="w-full">
          <div className="w-full px-4 mx-auto max-w-[1400px]">
            <div className="justify-center w-full text-center pb-4">
              <div className="w-full max-w-[14000px] mx-auto space-y-4 ">
                <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
                  <div className=" flex flex-col justify-center items-center">
                    <div className="my-2">
                      <Earth className="md:w-[50px] md:h-[50px] w-[35px] h-[35px] text-colorFour" />
                    </div>
                    <div className="my-2 w-full">
                      <h1 className="text-colorThree font-semibold w-full text-center">
                        Worldwide Access Availablity
                      </h1>
                    </div>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className="my-2">
                      <Clock8 className="md:w-[50px] md:h-[50px] w-[35px] h-[35px] text-colorFour" />
                    </div>
                    <div className="my-2 w-full">
                      <h1 className="text-colorThree font-semibold w-full text-center">
                        Scalable Timing Facility
                      </h1>
                    </div>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className="my-2">
                      <CalendarCheck className="md:w-[50px] md:h-[50px] w-[35px] h-[35px] text-colorFour" />
                    </div>
                    <div className="my-2 w-full">
                      <h1 className="text-colorThree font-semibold w-full text-center">
                        Simple Navigation Procedure
                      </h1>
                    </div>
                  </div>
                  <div className=" flex flex-col justify-center items-center">
                    <div className="my-2">
                      <Laptop className="md:w-[50px] md:h-[50px] w-[35px] h-[35px] text-colorFour" />
                    </div>
                    <div className="my-2 w-full">
                      <h1 className="text-colorThree font-semibold w-full text-center">
                        Complete Online Approach
                      </h1>
                    </div>
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

export default TrackRecord;

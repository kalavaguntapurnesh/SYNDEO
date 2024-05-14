import { useNavigate } from "react-router-dom";

const ParticiDataList = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="p-2 cursor-pointer w-full rounded-xl my-2 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
        onClick={() => navigate(`/book-appointment/${user._id}`)}
      >
        <div className="flex md:flex-row flex-col justify-between">
          <div className="md:w-1/3 flex  justify-center items-center">
            <img src="" alt="" />
          </div>
          <div className="md:w-1/3  flex flex-col justify-center items-center">
            <div className="my-1">
              <h1 className="font-semibold text-[16px] text-gray-600">
                Name:{" "}
                <span className="font-bold text-colorThree">
                  {user.firstName} {user.lastName}
                </span>
              </h1>
            </div>
            <div className="my-1">
              <h1 className="font-semibold text-[16px] text-gray-600">
                Email:{" "}
                <span className="font-bold text-colorThree">{user.email}</span>
              </h1>
            </div>
            <div className="my-1">
              <h1 className="font-semibold text-[16px] text-gray-600">
                Country of Residence:{" "}
                <span className="font-bold text-colorThree">
                  {user.selectedCountry.name}
                </span>
              </h1>
            </div>
            <div className="my-1">
              <h1 className="font-semibold text-[16px] text-gray-600">
                State of Residence:{" "}
                <span className="font-bold text-colorThree">
                  {user.selectedState.name}
                </span>
              </h1>
            </div>
          </div>
          <div className="md:w-1/3  flex justify-center items-center">
            <p className="lg:p-4 p-[11px] cursor-pointer font-medium">
              <a
                className="bg-colorFour
        rounded-[4px] text-white px-8 md:py-5 py-2.5 text-center"
              >
                Book an Appointment{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticiDataList;

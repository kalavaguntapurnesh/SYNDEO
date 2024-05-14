import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import One from "../../public/lotties/scheduleOne.svg";
import Two from "../../public/lotties/calendar.svg";
import Three from "../../public/lotties/scheduleThree.svg";
import { useNavigate } from "react-router-dom";
import Check from "../../public/lotties/check.svg";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [customer, setCustomer] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [mySchedules, setMySchedules] = useState([]);
  const navigate = useNavigate();
  const [counterOn, setCounterOn] = useState(false);

  const getMySchedules = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/existingSchedules",
        { doctorId: user?._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status) {
        setSchedules(response.data.data);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const getSchedules = async () => {
    try {
      //   dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8080/auth/userSchedules",
        { doctorId: user?._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      //   dispatch(hideLoading());
      if (response.data.status) {
        setMySchedules(response.data.data);
        // console.log(
        //   "Called the booking for me by other users... which is userSchedules",
        //   mySchedules
        // );
      }
    } catch (error) {
      console.log(error);
      //   dispatch(hideLoading());
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const getCustomerInfo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/getUserData",
        { userId: user?._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        setCustomer(response.data.data);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    getCustomerInfo();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMySchedules();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getSchedules();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="pt-3 pb-3 font-bold text-colorFour leading-normal tracking-normal text-lg">
          Hello, {customer?.firstName} {customer?.lastName}!!!
        </h1>

        <div className="grid md:grid-cols-6 grid-cols-1 md:gap-4">
          <div className="col-span-4">
            <ScrollTrigger
              onEnter={() => setCounterOn(true)}
              onExit={() => setCounterOn(false)}
            >
              <div className="grid md:grid-cols-3 grid-cols-1 gap-3 ">
                <div className=" h-36 bg-white rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <div className="flex flex-col justify-center items-center">
                    <div className=" flex justify-center items-center my-3">
                      <img src={One} alt="" className="w-12 h-14" />
                    </div>
                    <div className=" flex justify-center items-center flex-col">
                      <h2 className="font-bold text-xl text-center text-colorFour">
                        {" "}
                        {counterOn && (
                          <CountUp
                            start={0}
                            end={138}
                            duration={3}
                            delay={0}
                          ></CountUp>
                        )}
                      </h2>
                      <h1 className="uppercase font-medium text-xs text-center">
                        Your total schedules
                      </h1>
                    </div>
                  </div>
                </div>
                <div className=" h-36 bg-white rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <div className="flex flex-col justify-center items-center">
                    <div className=" flex justify-center items-center my-3">
                      <img src={Two} alt="" className="w-12 h-14" />
                    </div>
                    <div className=" flex justify-center items-center flex-col">
                      <h2 className="font-bold text-xl text-center text-colorFour">
                        {" "}
                        {counterOn && (
                          <CountUp
                            start={0}
                            end={100}
                            duration={3}
                            delay={0}
                          ></CountUp>
                        )}
                      </h2>
                      <h1 className="uppercase font-medium text-center text-xs">
                        Successful Schedules
                      </h1>
                    </div>
                  </div>
                </div>
                <div className=" h-36 bg-white rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <div className="flex flex-col justify-center items-center">
                    <div className=" flex justify-center items-center my-3">
                      <img src={Three} alt="" className="w-12 h-14" />
                    </div>
                    <div className=" flex justify-center items-center flex-col">
                      <h2 className="font-bold text-xl text-center text-colorFour">
                        {" "}
                        {counterOn && (
                          <CountUp
                            start={0}
                            end={38}
                            duration={3}
                            delay={0}
                          ></CountUp>
                        )}
                      </h2>
                      <h1 className="uppercase text-center font-medium text-xs">
                        Current Active Schedules
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollTrigger>

            <div className="grid md:grid-cols-2 gap-4 mt-5">
              <div className="bg-white h-auto rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <div className="grid grid-cols-4 mt-3 mb-3 ">
                  <div className="col-span-3 items-center flex ">
                    <h1 className="uppercase text-[#1a0dab] font-semibold px-2">
                      bookings by me
                    </h1>
                  </div>
                  <div className="col-span-1 flex justify-center items-center ">
                    <button
                      onClick={() =>
                        navigate(`/existingSchedules/${user?._id}`)
                      }
                      className="cursor-pointer text-[#1a73e8] text-sm"
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="border-b-4 border-[#f8f9f8]"></div>
                <div>
                  {schedules?.map((item) => (
                    <div key={item} className="rounded-lg">
                      <div className="grid grid-cols-3 gap-1 p-3">
                        <div className="flex justify-center items-center">
                          <img
                            src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                            className="rounded-lg w-[35px] h-[35px]"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-center items-start text-sm">
                          <p>
                            {item.doctorFirstName} {item.doctorLastName}
                          </p>
                          <p className="text-xs">{item.doctorCountry}</p>
                        </div>
                        <div className="flex  justify-center items-start">
                          <p className="text-xs">{item.startTime}</p>
                        </div>
                      </div>
                      <div className="border-b-2 border-[#f8f9f8]"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white h-auto rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                <div className="grid grid-cols-4 mt-3 mb-3 ">
                  <div className="col-span-3 items-center flex ">
                    <h1 className="uppercase text-[#1a0dab] font-semibold px-2">
                      Bookings for me
                    </h1>
                  </div>
                  <div className="col-span-1 flex justify-center items-center ">
                    <button
                      onClick={() => navigate("/notifications")}
                      className="cursor-pointer text-[#1a73e8] text-sm"
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="border-b-4 border-[#f8f9f8]"></div>
                <div>
                  <div>
                    {mySchedules?.map((item) => (
                      <div key={item} className="rounded-lg">
                        <div className="grid grid-cols-3 gap-1 p-3">
                          <div className="flex justify-center items-center">
                            <img
                              src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                              className="rounded-lg w-[35px] h-[35px]"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col justify-center items-start text-sm">
                            <p>{item.bookedName}</p>
                            <p className="text-xs">{item.doctorCountry}</p>
                          </div>
                          <div className="flex  justify-center items-start">
                            <p className="text-xs">{item.startTime}</p>
                          </div>
                        </div>
                        <div className="border-b-2 border-[#f8f9f8]"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white h-auto md:mt-0 mt-5 col-span-2 rounded-lg shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <div className="grid grid-cols-4 mt-3 mb-3 ">
              <div className="col-span-3 items-center flex ">
                <h1 className="uppercase text-[#1a0dab] font-semibold px-2">
                  alerts
                </h1>
              </div>
              <div className="col-span-1 flex justify-center items-center ">
                <button
                  onClick={() => navigate("/notifications")}
                  className="cursor-pointer text-[#1a73e8] text-sm"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="border-b-4 border-[#f8f9f8]"></div>
            <div>
              {user?.notification.map((item) => (
                <div
                  className="flex flex-row justify-center items-center rounded-lg p-3 bg-[#FAFAFA] text-sm border-b-4 border-white cursor-pointer gap-2"
                  key={item.message}
                >
                  <div className="w-[15%] flex justify-center items-center">
                    <img src={Check} alt="" />
                  </div>
                  <div
                    // onClick={() => navigate(`/userSchedules/${user?._id}`)}
                    onClick={() => navigate("/notifications")}
                    className="text-gray-500 w-[85%]"
                  >
                    {item.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

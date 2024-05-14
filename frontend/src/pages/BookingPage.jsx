import Layout from "../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { isWeekend } from "date-fns";

const BookingPage = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [facilitator, setFacilitator] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    // console.log("Current Date:", currentDate);
    const selectedDate = new Date(time);
    // console.log("Selected Date:", selectedDate);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const isWeekendDay = (date) => {
    return isWeekend(date);
  };

  const filterWeekends = (date) => {
    return !isWeekendDay(date);
  };

  const getFacilitators = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/getSingleUser",
        { id: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status) {
        setFacilitator(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8080/auth/book-appointment",
        {
          doctorId: params.id,
          userId: user?._id,
          startTime: startTime.toString(),
          endTime: endTime.toString(),
          doctorFirstName: facilitator?.firstName,
          doctorLastName: facilitator?.lastName,
          doctorEmail: facilitator?.email,
          doctorCountry: facilitator?.selectedCountry.name,
          doctorCity: facilitator?.selectedCity.name,
          bookedName: user?.firstName,
          bookedEmail: user?.email,
          bookedCountry: user?.selectedCountry.name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.status) {
        navigate("/dashboard");
        Swal.fire({
          title: "Appointment Booking Success",
          icon: "success",
        });
        console.log(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8080/auth/booking-availability",
        {
          doctorId: params.id,
          startTime: startTime.toString(),
          endTime: endTime.toString(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.status) {
        Swal.fire({
          title: "Appointment Available",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Appointment Not Available",
          text: "Please pick some other time!!!",
          icon: "error",
        });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getFacilitators();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className="m-3 text-center font-bold text-colorFour leading-normal tracking-normal text-xl">
        Booking Page
      </h1>
      {facilitator && (
        <div className="rounded-xl w-full bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <div className="flex justify-center items-center mt-2">
            <h1 className="text-center font-bold text-xl text-black mt-3">
              {facilitator.firstName} {facilitator.lastName}
            </h1>
          </div>
          <div className="flex justify-center items-center mt-2">
            <p className="text-md font-semibold text-gray-600">
              {facilitator.email}
            </p>
          </div>
          {/* <div className="flex justify-center items-center mt-2">
            <h1 className="text-md font-semibold text-black">
              <span className="font-semibold">Country of Residence: </span>{" "}
              {facilitator.selectedCountry.name}
            </h1>
          </div> */}
          <div className="flex justify-center items-center">
            <h1 className="font-semibold">Select Starting Time:</h1>
            <div>
              <DatePicker
                className="m-2 w-full rounded p-3"
                required="true"
                minDate={new Date()}
                isClearable
                placeholderText="Select start time"
                filterTime={filterPassedTime}
                filterDate={filterWeekends}
                showTimeSelect
                withPortal
                dateFormat="dd/MM/yyyy h:mm aa"
                minTime={new Date(0, 0, 0, 9, 30)}
                maxTime={new Date(0, 0, 0, 20, 0)}
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                // highlightDates={new Date()}
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <h1 className="font-semibold">Select Ending Time:</h1>
            <div>
              <DatePicker
                className="m-2 w-full rounded p-3"
                minDate={new Date()}
                placeholderText="Select ending time"
                showTimeSelect
                isClearable
                withPortal
                filterTime={filterPassedTime}
                filterDate={filterWeekends}
                dateFormat="dd/MM/yyyy h:mm aa"
                minTime={new Date(0, 0, 0, 9, 30)}
                maxTime={new Date(0, 0, 0, 20, 0)}
                selected={endTime}
                onChange={(date) => setEndTime(date)}
              />
            </div>
          </div>

          <div className="flex items-center justify-center mt-2">
            <button
              className="p-2 bg-colorThree text-white text-center font-medium rounded-lg w-full m-2 md:w-[25%]"
              onClick={handleAvailability}
            >
              Check Availablity
            </button>
          </div>

          {/* {!isAvailable && ( */}
          <div className="flex items-center justify-center mt-2 pb-8">
            <button
              className="p-2 bg-colorThree text-white text-center font-medium rounded-lg w-full m-2 md:w-[25%]"
              onClick={handleBooking}
            >
              Book an Appointment
            </button>
          </div>
          {/* )} */}
        </div>
      )}
    </Layout>
  );
};

export default BookingPage;

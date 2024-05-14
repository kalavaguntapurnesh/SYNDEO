import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Table } from "antd";

const UserSchedules = () => {
  const { user } = useSelector((state) => state.user);

  const params = useParams();
  //   const dispatch = useDispatch();

  console.log("User is ", user);
  console.log(params?._id);

  const [schedules, setSchedules] = useState([]);
  console.log(schedules);

  const getMySchedules = async () => {
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
      console.log("Called the API");
      //   dispatch(hideLoading());
      if (response.data.status) {
        setSchedules(response.data.data);
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

  useEffect(() => {
    getMySchedules();
    //eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
    },
    {
      title: "First Name",
      dataIndex: "bookedName",
    },
    {
      title: "User Name",
      dataIndex: "bookedEmail",
    },
    {
      title: "User Country",
      dataIndex: "bookedCountry",
    },
    {
      title: "Starting Time",
      dataIndex: "startTime",
    },
    {
      title: "Ending Time",
      dataIndex: "endTime",
    },
  ];

  return (
    <Layout>
      <h1 className="m-3 text-center font-bold text-colorFour leading-normal tracking-normal text-xl">
         Schedules History
      </h1>
      <Table className="my-4" columns={columns} dataSource={schedules} />
    </Layout>
  );
};

export default UserSchedules;

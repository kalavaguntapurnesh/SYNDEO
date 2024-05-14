import { Tabs, message } from "antd";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Right from "../../public/right.png";
import Swal from "sweetalert2";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8080/auth/getNotifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.status) {
        console.log(response.data.status);
        Swal.fire({
          title: "All Notifications Marked as Read",
          icon: "success",
        });
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        console.log(response.data.status);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:8080/auth/deleteNotifications",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.status) {
        Swal.fire({
          title: "All Notifications Deleted Successfully",
          icon: "success",
        });
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <Layout>
      <h1 className="font-bold text-colorFour tracking-normal text-4xl leading-relaxed ">
        Notifications
      </h1>

      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="flex justify-end">
            <h1
              className="p-2 bg-colorThree cursor-pointer font-normal rounded-md text-center text-white hover:bg-colorOne transition ease-in-out duration-1000"
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h1>
          </div>

          <div className="mt-2">
            <h1 className="text-xl font-semibold">Most Recent Notifications</h1>
          </div>

          {user?.notification.map((item) => (
            <div key={item.message} className="mt-2 mb-2">
              <div className=" flex flex-row justify-start items-center text-lg mt-2 p-3 border-b">
                <div className="w-[5%] flex justify-center items-center">
                  <img src={Right} alt="right" className="w-6 h-6" />
                </div>
                <div
                  // onClick={() => navigate(`/userSchedules/${user?._id}`)}
                  className="mt-2 mb-2 w-[95%] font-medium ml-4 flex justify-start items-center"
                >
                  {item.message}
                </div>
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="flex justify-end mb-2">
            <h1
              className="p-2 bg-colorThree cursor-pointer font-normal rounded-md text-center text-white hover:bg-colorThree transition ease-in-out duration-1000"
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h1>
          </div>

          <div className="mt-2">
            <h1 className="text-xl font-semibold">Most Recent Notifications</h1>
          </div>

          {user?.seenNotification.map((item) => (
            <div key={item.message} className="mt-2 mb-2">
              <div className=" flex flex-row justify-start items-center text-lg mt-2 p-3 border-b">
                <div className="w-[5%] flex justify-center items-center">
                  <img src={Right} alt="right" className="w-6 h-6" />
                </div>
                <div
                  // onClick={() => navigate(`/userSchedules/${user?._id}`)}
                  className="mt-2 mb-2 w-[95%] font-medium ml-4 flex justify-start items-center"
                >
                  {item.message}
                </div>
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;

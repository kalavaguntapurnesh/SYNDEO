import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import { LiaToolsSolid } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Badge } from "antd";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoMdNotificationsOutline } from "react-icons/io";

const DashboardNavbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [bell, setBell] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const handleBell = () => {
    setBell(!bell);
  };

  const handleLogout = () => {
    localStorage.clear();
    Swal.fire({
      title: "Logged Out Successfully",
      icon: "success",
    });
    navigate("/login");
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  };

  const adminMenu = [
    {
      name: "Home",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      name: "Facilitators",
      path: "/admin/facilitators",
      icon: LiaToolsSolid,
    },
    {
      name: "Organizers",
      path: "/admin/organizers",
      icon: MdOutlineTimer,
    },
    {
      name: "Participants",
      path: "/admin/users",
      icon: MdOutlineTimer,
    },
  ];

  const userMenu = [
    {
      name: "Home",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      name: "My Schedules",
      path: `/userSchedules/${user?._id}`,
      icon: MdOutlineTimer,
    },
    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: FaRegUser,
    },
  ];

  const facilitatorMenu = [
    {
      name: "Create Schedule",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      name: "Organizers",
      path: "/facilitator/organizers",
      icon: MdOutlineTimer,
    },
    {
      name: "Participants",
      path: "/participants",
      icon: FaHome,
    },
    {
      name: "Upcoming Schedules",
      path: `/existingSchedules/${user?._id}`,
      icon: FaHome,
    },
    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: FaRegUser,
    },
  ];

  const organizerMenu = [
    {
      name: "Create Schedule",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      name: "Participants",
      path: "/participants",
      icon: FaHome,
    },
    {
      name: "Upcoming Schedules",
      path: `/existingSchedules/${user?._id}`,
      icon: FaHome,
    },
    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: FaRegUser,
    },
  ];

  const NavbarMenu =
    user?.role === "facilitator"
      ? facilitatorMenu
      : user?.role === "organizer"
      ? organizerMenu
      : user?.role === "participant"
      ? userMenu
      : adminMenu;

  return (
    <div className="w-full fixed  md:z-20 z-20 bg-white border-b border-gray-600">
      <div className="w-full mx-auto max-w-[1400px]">
        <div className="justify-center w-full ">
          <div className="text-black flex justify-between md:shadow-none shadow-xl h-24 w-full md:top-0 top-0 bg-white max-w-[1400px] mx-auto">
            <div className="flex justify-center items-center">
              <div className=" text-[30px] block ml-4">
                <h2 className="text-colorThree font-bold">SYNDÈO.</h2>
              </div>
            </div>

            <div className="hidden md:flex md:pt-4 ">
              {NavbarMenu.map((item) => (
                <a
                  key={item}
                  href={item.path}
                  className="lg:p-4 p-[11px] cursor-pointer text-colorThree font-medium text-base tracking-wider"
                >
                  {item?.name}
                </a>
              ))}

              <div
                className="lg:p-4 p-[11px] cursor-pointer font-medium"
                onClick={handleLogout}
              >
                <a
                  // href="/login"
                  className="bg-colorFour
        rounded-[4px] text-white px-8 py-2.5 text-center"
                >
                  Logout
                </a>
              </div>
              <div
                className="lg:p-4 p-[11px] cursor-pointer text-colorThree "
                // onClick={handleBell}
              >
                <Badge
                  className="cursor-pointer "
                  count={user && user?.notification.length}
                  onClick={() => {
                    // handleBell();
                    navigate("/notifications");
                  }}
                >
                  <div>
                    {!bell ? (
                      <FaRegBell count className=" w-8 h-6" />
                    ) : (
                      <IoMdNotificationsOutline count className=" w-8 h-6" />
                    )}
                  </div>
                </Badge>
              </div>
              {/* <div className="lg:p-4 p-[11px] cursor-pointer text-colorThree ">
                <h1>Hello {user?.username}</h1>
              </div> */}
            </div>

            <div onClick={handleNav} className="block md:hidden cursor-pointer">
              {!nav ? (
                <AiOutlineMenu size={30} className=" mr-4 mt-6" />
              ) : (
                <AiOutlineClose size={30} className=" mr-4 mt-6" />
              )}
            </div>

            <div
              className={
                !nav
                  ? "md:hidden fixed left-[-100%] h-[75%] ease-in-out duration-1000 "
                  : "md:hidden fixed left-0 top-0 w-[70%] border-r  h-[75%] bg-white dark:bg-[#000300] ease-in-out duration-1000 rounded-b-lg z-10 shadow-xl"
              }
            >
              <a
                href="/"
                className="w-full text-2xl text-colorFour font-bold m-4 cursor-pointer"
              >
                SYNDÈO.
              </a>
              <div className=" uppercase p-4">
                {NavbarMenu.map((item) => (
                  <div
                    key={item}
                    className="p-4 border-b border-gray-600 text-colorThree cursor-pointer font-medium dark:text-white"
                  >
                    <a href={item.path}>{item.name}</a>
                  </div>
                ))}
                <a
                  href="/notifications"
                  className="p-4 border-gray-600 text-colorThree cursor-pointer font-medium dark:text-white uppercase"
                >
                  Notifications
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;

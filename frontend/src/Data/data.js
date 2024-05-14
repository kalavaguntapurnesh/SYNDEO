import { LiaToolsSolid } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export const adminMenu = [
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
  // {
  //   name: "Profile",
  //   path: "/admin/profile/:id",
  //   icon: FaRegUser,
  // },
];

export const userMenu = [
  {
    name: "Home",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    name: "Apply as Interviewer",
    path: "/apply-doctor",
    icon: LiaToolsSolid,
  },
  {
    name: "Participant Profile",
    path: "/profile",
    icon: FaRegUser,
  },
  {
    name: "Appointments ",
    path: "/appointments",
    icon: MdOutlineTimer,
  },
];

export const facilitatorMenu = [
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
    name: "Existing Schedules",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    name: "Facilitator Profile",
    // path: "/doctor/profile/${user?._id}",
    path: "/profile",
    icon: FaRegUser,
  },
];

export const organizerMenu = [
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
    name: "Existing Schedules",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    name: "Organizer Profile",
    path: "/profile",
    icon: FaRegUser,
  },
];

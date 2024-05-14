import DashboardNavbar from "./DashboardNavbar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex justify-between items-start bg-[#f8f9f8] ">
      <DashboardNavbar />
      <div className=" w-full h-full">
        <div className="relative pt-24 pb-4">
          <div className="w-full">
            <div className="w-full px-4 mx-auto max-w-[1400px] ">
              <div className="w-full p-4 bg-[#f8f9f8] overflow-y-auto h-full">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

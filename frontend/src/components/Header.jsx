import Profile from "../assets/My_Profile.jpg";

const Header = () => {
  return (
    <section className="w-full bg-slate-50 lg:h-20 h-fit flex lg:flex-row flex-col justify-between items-center p-4 rounded-xl lg:gap-2 gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-wide text-colorThree">
          Overview
        </h1>
      </div>
      <div className="flex justify-between items-center gap-10">
        {/* <IoSearch className="w-6 h-6 cursor-pointer hover:scale-150 hover:text-yellow-500 transition-all" /> */}
        <div
          id="client-info"
          className="flex justify-center items-center gap-4"
        >
          <img
            src={Profile}
            alt=""
            className="w-12 h-12 rounded-full"
            width={100}
            height={100}
          ></img>
          <div className="flex flex-col justify-center items-start border-2">
            <div className="flex justify-center items-center -mb-1 gap-2">
              <h1 className="text-lg font-semibold text-colorThree">
                Hi, Purnesh
              </h1>
            </div>
            <p className="text-colorThree">Admin</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;

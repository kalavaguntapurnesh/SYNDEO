import Layout from "../components/Layout";
// import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const ScheduleCreate = () => {
  const yesterday = moment().subtract(1, "day");
  const disPastDate = (current) => {
    return current.isAfter(yesterday);
  };

  const today = moment();

  const disWeekends = (current) => {
    return current.day() !== 0 && current.day() !== 6;
  };

  return (
    <Layout>
      <h1 className="m-3 text-center font-bold text-colorFour leading-normal tracking-normal text-xl">
        Create a Schedule
      </h1>

      <div className="flex justify-center items-center flex-col">
        <h2 className="mb-3">
          React Disable, Future, Weekend Dates in Example
        </h2>
        <div className="mb-4">
          <p className="mb-2">
            <strong>Disable Past Dates:</strong>
          </p>
          <DatePicker timeFormat={true} isValidDate={disPastDate} />
        </div>
        <div className="mb-4">
          <p className="title">
            <strong>Disable Weekends:</strong>
          </p>
          <DatePicker timeFormat={false} isValidDate={disWeekends} />
        </div>
      </div>
    </Layout>
  );
};

export default ScheduleCreate;

import { ToastContainer } from "react-toastify";

const ErrorComponent = () => {
  return (
    <div className="request-state-div">
      An error occured while fetching data, please try again later.
      <ToastContainer />
    </div>
  );
};

export default ErrorComponent;

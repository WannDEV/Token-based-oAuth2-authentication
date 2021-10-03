import api from "../services/api";

const apiCall = () => {
  api({
    method: "POST",
    url: "testroute",
  }).catch((err) => console.log(err));
};

const TestButton = () => {
  return <button onClick={apiCall}>Make test API call</button>;
};

export default TestButton;

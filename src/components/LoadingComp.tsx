import ReactLoading from "react-loading";

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type="spin" color="#1d81e2" />
    </div>
  );
};

export default LoadingComponent;

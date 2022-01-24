export function Loader() {
  return (
    <div className="loader-container">
      <img
        className="loader-logo"
        src={process.env.PUBLIC_URL + "/logo.svg"}
        alt="Loading..."
      />
    </div>
  );
}

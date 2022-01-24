import { Helmet } from "react-helmet";
import { NavBar } from "../../components/NavBar";

export function Account() {
  return (
    <div className="account-container">
      <Helmet>
        <title>Mon compte</title>
      </Helmet>
      <NavBar />
      <div className="account-content"></div>
    </div>
  );
}

import { Helmet } from "react-helmet";
import { NavBar } from "../../components/NavBar";

export function Settings() {
  return (
    <div className="settings-container">
      <Helmet>
        <title>Paramètres</title>
      </Helmet>
      <NavBar />
    </div>
  );
}

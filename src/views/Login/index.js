import { Helmet } from "react-helmet";
import { Loader } from "../../components/Loader";
import { useEffect, useState } from "react";
import { Form } from "../../components/Form";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { constants } from "../../constants";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    const getToken = localStorage.getItem(constants.tokenStorageKey);
    if (getToken) {
      history.push("Home");
    }
  }, [history]);

  const handleLogin = () => {
    if (!username || !password) {
      toast.error("Veuillez renseigner tous les champs");
      return;
    }
    setLoading(true);
    axios
      .post("auth/login", {
        username,
        password,
      })
      .then(async (res) => {
        setLoading(false);
        const { user, token } = res.data;
        user.password = password;
        localStorage.setItem(
          constants.userPayloadStorageKey,
          JSON.stringify(user)
        );
        localStorage.setItem(constants.tokenStorageKey, token);
        toast.success("Authentification réussie");
        window.location.reload();
      })
      .catch(async (err) => {
        setLoading(false);
        toast.error(
          "Erreur d'authentification: " +
            (err && err.response ? err.response.data : "")
        );
      });
  };

  const inputs = [
    {
      label: "Identifiant",
      onChange: (v) => setUsername(v.target.value),
      id: "username",
      value: username,
    },
    {
      label: "Mot de passe",
      onChange: (v) => setPassword(v.target.value),
      id: "password",
      type: "password",
      value: password,
    },
  ];

  const actions = [
    {
      onClick: handleLogin,
      value: "Se connecter",
    },
  ];

  const links = [
    {
      href: "/#/signup",
      label: "S'inscrire",
    },
  ];

  if (loading) return <Loader />;

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)` }}
    >
      <Helmet>
        <title>LOGIN</title>
      </Helmet>
      <Form title="Login" inputs={inputs} actions={actions} links={links} />
    </div>
  );
}

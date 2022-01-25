import { Helmet } from "react-helmet";
import { Loader } from "../../components/Loader";
import { useState } from "react";
import { Form } from "../../components/Form";
import { toast } from "react-toastify";
import axios from "axios";

export function Signup() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignup = () => {
    if (!username || !password || !passwordConfirm) {
      toast.error("Veuillez renseigner tous les champs");
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("Les mots de passes doivent correspondre");
      return;
    }
    setLoading(true);
    axios
      .post("auth/signup", {
        username,
        password,
      })
      .then(async (res) => {
        setLoading(false);
        toast.success(
          "Succès! Vous pouvez désormais vous connecter avec vos identifiants!"
        );
      })
      .catch(async (err) => {
        console.log(err.response.data);
        setLoading(false);
        toast.error(
          "Erreur lors de l'inscription: " +
            (err && err.response ? err.response.data : "")
        );
      });
  };

  const inputs = [
    {
      label: "Identifiant",
      onChange: (v) => setUsername(v.target.value),
      id: "identifiant",
      value: username,
    },
    {
      label: "Mot de passe",
      onChange: (v) => setPassword(v.target.value),
      id: "password",
      type: "password",
      value: password,
    },
    {
      label: "Confirmation du mot de passe",
      onChange: (v) => setPasswordConfirm(v.target.value),
      id: "password-confirm",
      type: "password",
      value: passwordConfirm,
    },
  ];

  const actions = [
    {
      onClick: handleSignup,
      value: "S'inscrire",
    },
  ];

  const links = [
    {
      href: "/",
      label: "Se connecter",
    },
  ];

  if (loading) return <Loader />;

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)` }}
    >
      <Helmet>
        <title>SIGNUP</title>
      </Helmet>
      <Form
        title="Inscription"
        inputs={inputs}
        actions={actions}
        links={links}
        inputContainerHeight="12rem"
      />
    </div>
  );
}

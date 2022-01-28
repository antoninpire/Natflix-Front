import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NavBar } from "../../components/NavBar";
import axios from "axios";
import { Loader } from "../../components/Loader";
import { constants } from "../../constants";
import Box from "@mui/material/Box";
import { Input } from "../../components/Input";
import { Btn } from "../../components/Btn";
import { toast } from "react-toastify";

export function Account() {
  const [loading, setLoading] = useState(false);
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  useEffect(() => {
    setLoading(true);
    const userStorage = localStorage.getItem(constants.userPayloadStorageKey);
    const user = JSON.parse(userStorage);
    setIdentifiant(user.identifiant);
    setLoading(false);
  }, []);

  const handleSaveUsername = () => {
    const userStorage = localStorage.getItem(constants.userPayloadStorageKey);
    const user = JSON.parse(userStorage);
    if (!identifiant) {
      toast.error("Veuillez renseigner tous les champs!");
      return;
    }
    if (identifiant === user.identifiant) return;
    setLoading(true);
    axios
      .put("auth/update", {
        id: user.id,
        username: identifiant,
      })
      .then(async (res) => {
        setLoading(false);
        user.identifiant = identifiant;
        localStorage.setItem(
          constants.userPayloadStorageKey,
          JSON.stringify(user)
        );
        toast.success("Votre identifiant a été changé avec succès!");
      })
      .catch(async (err) => {
        console.log(err.response.data);
        setLoading(false);
        setIdentifiant(user.identifiant);
        toast.error(
          "Erreur lors de la modification de l'identifiant: " +
            (err && err.response ? err.response.data : "")
        );
      });
  };

  const handleSavePassword = () => {
    const userStorage = localStorage.getItem(constants.userPayloadStorageKey);
    const user = JSON.parse(userStorage);
    if (!password || !newPassword || !newPasswordConfirmation) {
      toast.error("Veuillez renseigner tous les champs!");
      return;
    }
    if (user.password !== password) {
      toast.error("L'ancien mot de passe n'est pas bon!");
      return;
    }
    if (newPassword !== newPasswordConfirmation) {
      toast.error("La confirmation du nouveau mot de passe ne correspond pas!");
      return;
    }
    if (user.password === newPassword) {
      toast.error(
        "Le nouveau mot de passe ne peut pas être le même que l'ancien!"
      );
      return;
    }
    setLoading(true);
    axios
      .put("auth/update", {
        id: user.id,
        password: newPassword,
      })
      .then(async (res) => {
        setLoading(false);
        user.password = newPassword;
        localStorage.setItem(
          constants.userPayloadStorageKey,
          JSON.stringify(user)
        );
        toast.success(
          "La modification de votre mot de passe a été effectuée avec succès!"
        );
      })
      .catch(async (err) => {
        console.log(err.response.data);
        setLoading(false);
        toast.error("Erreur lors de la modification du mot de passe: ");
      });
    setPassword("");
    setNewPassword("");
    setNewPasswordConfirmation("");
  };

  if (loading) return <Loader />;

  return (
    <div className="account-container">
      <Helmet>
        <title>Mon compte</title>
      </Helmet>
      <NavBar />
      <div className="account-content">
        <Box
          component="form"
          className="account-form-container"
          noValidate
          autoComplete="off"
        >
          <div>
            <p className="account-form-label">Changement d'identifiant</p>
            <Input
              label="Identifiant"
              style={{ minWidth: "400px", margin: "0 0 1rem" }}
              value={identifiant}
              onChange={(event) => setIdentifiant(event.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Btn
                value="Enregistrer"
                style={{ maxWidth: "200px" }}
                onClick={handleSaveUsername}
              />
            </div>
          </div>

          <div>
            <p className="account-form-label">Changement de mot de passe</p>
            <Input
              label="Mot de passe actuel"
              style={{ minWidth: "400px", margin: "0 0 1rem" }}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            <Input
              label="Nouveau mot de passe"
              style={{ minWidth: "400px", margin: "0 0 1rem" }}
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              type="password"
            />
            <Input
              label="Confirmation mot de passe"
              style={{ minWidth: "400px", margin: "0 0 1rem" }}
              value={newPasswordConfirmation}
              onChange={(event) =>
                setNewPasswordConfirmation(event.target.value)
              }
              type="password"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Btn
                value="Enregistrer"
                style={{ maxWidth: "200px" }}
                onClick={handleSavePassword}
              />
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

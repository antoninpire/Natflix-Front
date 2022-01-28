import { Helmet } from "react-helmet";
import { NavBar } from "../../components/NavBar";
import { SettingCard } from "./SettingCard";
import { useEffect, useState } from "react";
import { constants } from "../../constants";

const t1 = `Content based filtering (par défaut)`;
const d1 = `Vos recommandations inclueront des films similaires aux films que vous avez le plus apprécié. C'est le type de filtre utilisé pour récupérer les Films similaires sur la page d'un film. Ce filtre utilise uniquement des mots clés pour comparer la similitude entre des films (genres, producteurs), et les notes des autres utilisateurs n'ont donc pas d'impact.`;

const t2 = `Item based collaborative filtering`;
const d2 = `Vos recommandations inclueront des films étant supposés similaires aux films que vous avez aimé par le passé. Ainsi, on compare les notes des utilisateurs pour des films donnés, et basé sur la similarité de ces notes et les notes en elles-mêmes on peut supposer une prétendue similarité entre les films.`;

const t3 = `User based collaborative filtering`;
const d3 = `Vos recommandations inclueront des films ayant été aimés par des utilisateurs similaires à vous. Ainsi, si un utilisateur a un passif similaire au votre en termes de goûts, alors vous êtes susceptibles d'aimer les films qu'il a aimé. On cherche donc tous les utilisateurs similaires et on renvoie les films que vous n'avez pas vus et qu'ils ont aimé.`;

const t4 = `Affichage en affiches (par défaut)`;
const d4 = `Les films seront affichés sous la forme de posters sur lequel apparaît déjà le titre. Pour ajouter à une liste ou voir le titre autrement, il sera nécessaire de survoler celui-ci.`;

const t5 = `Affichage en blocs`;
const d5 = `Les films seront affichés sous la forme de blocs, l'image sera une version étirée et sans titre. Le titre ainsi que la date de diffusion seront affichés en bas de celui-ci, et vous pourrez ajouter un film à une liste grâce à l'icône '+'.`;

export function Settings() {
  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedDisplay, setSelectedDisplay] = useState(1);

  useEffect(() => {
    setSelectedValue(
      localStorage.getItem(constants.recommandationSettingStorageKey) || 1
    );
    setSelectedDisplay(
      localStorage.getItem(constants.displaySettingStorageKey) || 1
    );
  }, []);

  return (
    <div className="settings-container">
      <Helmet>
        <title>Paramètres</title>
      </Helmet>
      <NavBar />
      <div className="settings-content">
        <div className="settings-content-title">
          <h2>Paramètre de recommandation</h2>
          <p style={{ color: "white", fontStyle: "italic" }}>
            Si vous n'avez noté aucun film, ces filtres ne s'appliqueront pas et
            vous aurez des recommandations peu personnalisées.
          </p>
        </div>

        <SettingCard
          titre={t1}
          description={d1}
          value={1}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          storageKey={constants.recommandationSettingStorageKey}
        />
        <SettingCard
          titre={t2}
          description={d2}
          value={2}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          storageKey={constants.recommandationSettingStorageKey}
        />
        <SettingCard
          titre={t3}
          description={d3}
          value={3}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          storageKey={constants.recommandationSettingStorageKey}
        />
        <div className="settings-content-title">
          <h2>Paramètre d'affichage (pages Recherche et Recommandations)</h2>
        </div>

        <SettingCard
          value={1}
          selectedValue={selectedDisplay}
          setSelectedValue={setSelectedDisplay}
          titre={t4}
          description={d4}
          storageKey={constants.displaySettingStorageKey}
        />
        <SettingCard
          value={2}
          selectedValue={selectedDisplay}
          setSelectedValue={setSelectedDisplay}
          titre={t5}
          description={d5}
          storageKey={constants.displaySettingStorageKey}
        />
      </div>
    </div>
  );
}

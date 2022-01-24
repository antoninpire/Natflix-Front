import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Loader } from "../../components/Loader";
import { NavBar } from "../../components/NavBar";
import axios from "axios";
import { requests } from "../../requests";

import { Lists } from "./Lists";
import { Posters } from "./Posters";

export function MyLists() {
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userStorage = localStorage.getItem("user");
      const user = JSON.parse(userStorage);
      const request = await axios.get(requests.fetchLists + user.id);
      setLists(request.data);
      setLoading(false);
    }
    fetchData();
  }, [deleted]);

  if (loading) return <Loader />;
  return (
    <div className="myLists-container">
      <Helmet>
        <title>Mes listes</title>
      </Helmet>
      <NavBar />
      <div className="myLists-content">
        <h2>{lists.length ? lists[selectedListIndex].nom : "Aucune liste"}</h2>
        <Lists
          lists={lists}
          selectedListIndex={selectedListIndex}
          setSelectedListIndex={setSelectedListIndex}
          setDeleted={setDeleted}
          deleted={deleted}
        />
        <Posters movies={lists.length ? lists[selectedListIndex].films : []} />
      </div>
    </div>
  );
}

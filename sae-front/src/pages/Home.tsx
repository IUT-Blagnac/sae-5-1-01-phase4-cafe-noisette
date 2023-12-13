import {useAuthUser} from "../contexts/AuthUserContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function Home() {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Accueil</h1>
    </div>
  );
}

export default Home;
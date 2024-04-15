import React, { useState } from "react";
import { useNavigate, Router } from "react-router-dom";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import { FaAngleLeft } from "react-icons/fa";
import "./Header.css";
// import { useAddToHomescreenPrompt } from "src/hooks/AddToHomeScreen";
import { useAddToHomescreenPrompt } from "../../hooks/AddToHomeScreen";
import { Link } from "react-router-dom";

// <Button onClick={onClose}>Закрыть</Button>
const Header = () => {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();

  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const { user, onClose } = useTelegram();
  const navigate = useNavigate();

  React.useEffect(() => {
    isPWAInstalled();
  }, []);

  const isPWAInstalled = async () => {
    console.log('checking if app is alredy installed')
    if ("getInstalledRelatedApps" in window.navigator) {
        console.log('in get Installed related apps')
      const relatedApps = await navigator.getInstalledRelatedApps();
      let installed = false;
      relatedApps.forEach((app) => {
        //if your PWA exists in the array it is installed
        console.log(app.platform, app.url);
        if (app.url === "https://reference-tg-web-app.vercel.app/manifest.json") { //FIXME: change link
          installed = true;
        }
      });
      setIsAppInstalled(installed);
      console.log('app installed status: ' + installed)
    }
  };

  return (
    <div className={"header"}>
    <Button className={"backbutton"} onClick={() => navigate(-1)}>
      <FaAngleLeft className="backicon" />
    </Button>

      {!isAppInstalled ? (
        <button className="pwa-install-button" onClick={promptToInstall}>Add to Home Screen</button>
      ) : (
        <div>PlanzUp</div>
      )}
      
      <span className={"username"}>{user?.first_name} {user?.last_name}</span>

      <Link to='/sandbox'>
        <div className="user_icon round_icon df">
            <span style={{ margin: "auto" }}>{user?.username.charAt(0)}</span>
        </div>
      </Link>
    </div>
  );
};

export default Header;

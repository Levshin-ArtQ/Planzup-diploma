import React, { useState } from "react";
import { useNavigate, Router } from "react-router-dom";
import { Button, Flex } from "antd";
import WebApp from "@twa-dev/sdk";
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
  // const { user, onClose } = useTelegram();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (WebApp) {
      setUser(WebApp.initData.username);
    }
    isPWAInstalled();
  }, []);

  const isPWAInstalled = async () => {
    console.log("checking if app is alredy installed");
    if ("getInstalledRelatedApps" in window.navigator) {
      console.log("in get Installed related apps");
      const relatedApps = await navigator.getInstalledRelatedApps();
      let installed = false;
      relatedApps.forEach((app) => {
        //if your PWA exists in the array it is installed
        console.log(app.platform, app.url);
        if (
          // check if platform is web not standalone and not ios and safari
          app.url === "https://planz-up-sample.vercel.app/manifest.json"
        ) {
          //FIXME: change link
          installed = true;
        }
      });
      setIsAppInstalled(installed);
      console.log("app installed status: " + installed);
    }
  };

  return (
    <div className={"header"}>
      <Button className={"backbutton"} onClick={() => navigate(-1)}>
        <FaAngleLeft className="backicon" />
      </Button>

      {!isAppInstalled ? (
        <Button className="pwa-install-button" onClick={promptToInstall}>
          Установить
        </Button>
      ) : (
        <div>PlanzUp</div>
      )}

      <span className={"username"}>
        {user} 
      </span>

      <Link to="/profile">
        <div className="user_icon round_icon df">
          <span style={{ margin: "auto" }}>{user?.charAt(0)}</span>
        </div>
      </Link>
      <Flex align="center">

      </Flex>


    </div>
  );
};

export default Header;

import { Link } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import s from "./WelcomeSection.module.css";
import { useTranslation } from "react-i18next"; 

const WelcomeSection = () => {
  const { t } = useTranslation(); 
  return (
    <div className={s.welcomeSection}>
      <Logo />
      <p className={s.welcomeText}>{t("welcomeSection.welcomeText")}</p> 
      <h1 className={s.welcomeTitle}>{t("welcomeSection.welcomeTitle")}</h1>
      <nav className={s.welcomeBtn}>
        <Link to="/signup" className={s.btnTracker}>
        {t("welcomeSection.tryTracker")}
        </Link>
        <Link to="/signin" className={s.btnSignIn}>
        {t("welcomeSection.signIn")}
        </Link>
      </nav>
    </div>
  );
};

export default WelcomeSection;

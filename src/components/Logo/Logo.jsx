import { Link } from "react-router-dom";
import s from "./Logo.module.css";
import LangButton from "../LangButton/LangButton.jsx";

const Logo = () => {
  return (
    <div className={s.logo}>
      <Link to="/" className={s.logoTitle}>
        AquaTrack
      </Link>
      <LangButton />
    </div>
  );
};

export default Logo;

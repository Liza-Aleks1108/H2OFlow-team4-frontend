import { useState } from "react";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors.js";

const UserBar = () => {
  const user = useSelector(selectUser);

  const [isActive, setIsActive] = useState(false);
  const toogle = () => setIsActive((prev) => !prev);
  return (
    <div className={css.userBar}>
      <button className={css.userBarButton} onClick={toogle}>
        <p className={css.userName}>{user.name ? user.name : "User"}</p>
        <div className={css.userImageCont}>
          <img
            src={user.avatarUrl}
            alt="user-image"
            className={css.userImage}
          />
        </div>
        <svg className={isActive ? css.svgActive : css.svg}>
          <use
            href="/sprite.svg#icon-chevron-down"
            className={css.svgUse}
          ></use>
        </svg>
      </button>
      {isActive && <UserBarPopover />}
    </div>
  );
};
export default UserBar;

import Sidebar from "../../_components/sidebar/Sidebar";
import Header from "../../_components/header/Header";
import style from "./page.module.css";
import { RestaurantDetails } from "@/context/restaurentDetailsContext";
const dashLayout = ({ children }) => {
  return (
    <RestaurantDetails>
      <div className={style.container}>
        <div className={style.left}>
          <Sidebar />
        </div>

        <div className={style.right}>
          <div className={style.rightTop}>
            <Header />
          </div>

          <div className={style.rightBottom}>{children}</div>
        </div>
      </div>
    </RestaurantDetails>
  );
};

export default dashLayout;

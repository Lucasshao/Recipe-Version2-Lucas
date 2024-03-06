import React from "react";
import styles from "./index.module.scss";
import { classNameStyled } from "@/utils";
import Button from "@/components/Button";

const Header = (props) => {
  const { header_info, id, deleteHandler, className, ...rest } = props;
  return (
    <div className={styles["recipe_header"]}>
      <h3 className={styles["recipe_title"]}>{header_info}</h3>
      <div className={styles["recipe_btn-group"]}>
        <Button
          className="btn-danger"
          onClick={(e) => {
            e.stopPropagation();
            deleteHandler(id);
          }}
        >
          {/* stopPropagation 很重要 */}
          {/* 这里的className像平常那样写，是因为className function里做了解析 */}
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import Button from "@mui/material/Button";
import styles from "./styles.module.css";
function AddDishButton() {
  return (
    <Button variant="contained" className={styles.customButton}>
      Add Menu
    </Button>
  );
}

export default AddDishButton;

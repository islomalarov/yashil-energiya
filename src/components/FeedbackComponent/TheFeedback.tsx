import TheForm from "@/src/components/FormComponent/TheForm";
import styles from "./page.module.scss";
import "@/scss/globals.scss";
import { TheContacts } from "../ContactsComponent/TheContacts";

export const TheFeedback = () => {
  return (
    <div className={styles.main}>
      <div className="container">
        <div className={styles.block}>
          <TheForm />
          <TheContacts />
        </div>
      </div>
    </div>
  );
};

import "@/scss/globals.scss";
import { TheForm } from "@/src/components/FormComponent/TheForm";
import styles from "./TheFeedback.module.scss";
import { TheContacts } from "../ContactsComponent/TheContacts";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";

export const TheFeedback = () => {
  return (
    <div className={styles.main}>
      <TheMotionWrapper>
        <div className={styles.block}>
          <TheForm />
          <TheContacts />
        </div>
      </TheMotionWrapper>
    </div>
  );
};

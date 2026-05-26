
import styles from "./TheFeedback.module.scss";
import { TheContacts } from "../ContactsComponent/TheContacts";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";
import { TheFeedbackFormLoader } from "./TheFeedbackFormLoader";

export const TheFeedback = () => {
  return (
    <div className={styles.main}>
      <TheMotionWrapper motionKey="feedback">
        <div className={styles.block}>
          <section className={styles.formPane}>
            <TheFeedbackFormLoader />
          </section>
          <section className={styles.contactsPane}>
            <TheContacts />
          </section>
        </div>
      </TheMotionWrapper>
    </div>
  );
};

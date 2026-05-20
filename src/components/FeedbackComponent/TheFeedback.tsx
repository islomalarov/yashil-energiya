
import { TheForm } from "@/components/FormComponent/TheForm";
import styles from "./TheFeedback.module.scss";
import { TheContacts } from "../ContactsComponent/TheContacts";
import { TheMotionWrapper } from "../MotionWrapper/TheMotionWrapper";

export const TheFeedback = () => {
  return (
    <div className={styles.main}>
      <TheMotionWrapper motionKey="feedback">
        <div className={styles.block}>
          <section className={styles.formPane}>
            <TheForm />
          </section>
          <section className={styles.contactsPane}>
            <TheContacts />
          </section>
        </div>
      </TheMotionWrapper>
    </div>
  );
};

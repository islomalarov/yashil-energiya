import { User, MapPin, Mail, Globe } from "lucide-react";
import s from "./Procurement.module.scss";

type ContactPlaqueProps = {
  name: string;
  role: string;
  address: string;
  email: string;
  website: string;
};

export const ContactPlaque = ({
  name,
  role,
  address,
  email,
  website,
}: ContactPlaqueProps) => {
  const websiteHref = website.startsWith("http")
    ? website
    : `https://${website}`;

  return (
    <address className={s.contactPlaque}>
      <div className={s.contactRow}>
        <span className={s.contactIcon}>
          <User size={18} aria-hidden="true" />
        </span>
        <span>
          <b className={s.contactName}>{name}</b>
          <span className={s.contactRole}>{role}</span>
        </span>
      </div>
      <div className={s.contactRow}>
        <span className={s.contactIcon}>
          <MapPin size={18} aria-hidden="true" />
        </span>
        <span>{address}</span>
      </div>
      <div className={s.contactRow}>
        <span className={s.contactIcon}>
          <Mail size={18} aria-hidden="true" />
        </span>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
      <div className={s.contactRow}>
        <span className={s.contactIcon}>
          <Globe size={18} aria-hidden="true" />
        </span>
        <a href={websiteHref} target="_blank" rel="noopener noreferrer">
          {website}
        </a>
      </div>
    </address>
  );
};

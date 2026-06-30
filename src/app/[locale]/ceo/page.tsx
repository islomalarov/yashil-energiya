import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";
import Image from "next/image";
import { BadgeCheck, Mail } from "lucide-react";
import { TheHero } from "@/components/HeroComponent/TheHero";
import { TheFeedback } from "@/components/FeedbackComponent/TheFeedback";
import {
  leadershipTeam,
  resolveLeadershipMembers,
} from "@/content/leadership";
import { isUnsupportedCmsLocale } from "@/lib/cms-locale";
import { getLocale, getTranslations } from "next-intl/server";
import { ManagerService } from "services/managers.service";
import type { Manager } from "services/managers.service";
import s from "./page.module.scss";

// Set to false to render Hygraph/local leadership photos again.
const useLeadershipPhotoPlaceholders = true;

export default async function Ceo() {
  const locale = await getLocale();
  const t = await getTranslations("CeoPage");
  const aboutT = await getTranslations("AboutPage");
  const managers = await getManagers(locale);
  const members = resolveLeadershipMembers(
    managers,
    (key) => t(`positions.${key}`),
    { preferLocalPositions: isUnsupportedCmsLocale(locale) },
  ).map((member) => ({
    ...member,
    image: useLeadershipPhotoPlaceholders
      ? null
      : resolveLeadershipImage(member.image),
  }));
  const featuredMember = members.find((member) => member.isFeatured) ?? members[0];
  const leadershipMembers = members.filter(
    (member) => member.id !== featuredMember?.id,
  );

  return (
    <>
      <TheHero
        title1={aboutT("heroTitle1")}
        url1="about"
        title2={t("hero.title")}
        url2="ceo"
        activeUrl="ceo"
      />
      <main className={s.page}>
        {featuredMember && (
          <section className={s.featuredSection} aria-labelledby="ceo-title">
            <div className="container">
              <article className={s.featuredCard}>
                <div className={s.featuredMedia}>
                  <LeadershipPhoto
                    image={featuredMember.image}
                    name={featuredMember.name}
                    alt={t("photoAlt", { name: featuredMember.name })}
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                </div>
                <div className={s.featuredBody}>
                  <span className={s.badge}>
                    <BadgeCheck aria-hidden="true" />
                    {t("ceoBadge")}
                  </span>
                  <div>
                    <h2 id="ceo-title" className={s.featuredName}>
                      {featuredMember.name}
                    </h2>
                    <p className={s.featuredPosition}>
                      {featuredMember.jobTitle}
                    </p>
                  </div>
                  <EmailLink
                    email={featuredMember.email}
                    label={t("email")}
                    className={s.featuredEmail}
                  />
                </div>
              </article>
            </div>
          </section>
        )}

        <section className={s.teamSection}>
          <div className="container">
            <div className={s.teamGrid}>
              {leadershipMembers.map((member, index) => (
                <article
                  className={s.memberCard}
                  key={member.id}
                  style={{ "--member-index": index } as CSSProperties}
                >
                  <div className={s.memberMedia}>
                    <LeadershipPhoto
                      image={member.image}
                      name={member.name}
                      alt={t("photoAlt", { name: member.name })}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className={s.memberBody}>
                    <h3 className={s.memberName}>{member.name}</h3>
                    <p className={s.memberPosition}>{member.jobTitle}</p>
                    <EmailLink email={member.email} label={t("email")} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <TheFeedback />
    </>
  );
}

async function getManagers(locale: string): Promise<Manager[]> {
  if (isUnsupportedCmsLocale(locale)) {
    return [];
  }

  try {
    const data = await ManagerService.getAllManagers(locale);

    return data?.managers ?? [];
  } catch (error) {
    console.error("Failed to load leadership managers:", error);

    return [];
  }
}

function LeadershipPhoto({
  image,
  name,
  alt,
  priority = false,
  sizes,
}: {
  image: string | null;
  name: string;
  alt: string;
  priority?: boolean;
  sizes: string;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={alt}
        width={1200}
        height={1500}
        className={s.photo}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    <div className={s.placeholder} aria-label={alt} role="img">
      <span>{getInitials(name)}</span>
    </div>
  );
}

function EmailLink({
  email,
  label,
  className,
}: {
  email: string;
  label: string;
  className?: string;
}) {
  return (
    <a className={`${s.emailLink} ${className ?? ""}`} href={`mailto:${email}`}>
      <Mail aria-hidden="true" />
      <span className={s.emailLabel}>{label}</span>
      <span>{email}</span>
    </a>
  );
}

function resolveLeadershipImage(image: string | null) {
  if (!image) {
    return null;
  }

  if (image.startsWith("https://")) {
    return image;
  }

  const publicPath = join(process.cwd(), "public", image.replace(/^\/+/, ""));

  return existsSync(publicPath) ? image : null;
}

function getInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return initials || leadershipTeam[0].name[0];
}

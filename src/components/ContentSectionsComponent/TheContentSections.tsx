import { ArrowRight, Calculator, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import s from "./TheContentSections.module.scss";

type ParagraphNode = { type: "p"; text: string };
type ListNode = { type: "list" | "steps"; items: string[] };
type QaNode = { type: "qa"; q: string; a: string };
type BodyNode = ParagraphNode | ListNode | QaNode;

export type ContentSection = {
  id: string;
  title: string;
  body: BodyNode[];
};

type Props = {
  sections?: ContentSection[] | null;
  // Optional call-to-action button rendered after the sections.
  cta?: { href: string; label: string } | null;
};

// Split "Lead sentence. Rest of the text" into a bold lead + remainder, used
// for advantage lists and numbered steps so they stay scannable.
function splitLead(text: string): [string, string] {
  const match = text.match(/^(.{3,70}?[.:])\s+(.+)$/s);
  if (match) {
    return [match[1], match[2]];
  }
  return ["", text];
}

function ListItem({ text }: { text: string }) {
  const [lead, rest] = splitLead(text);
  if (lead) {
    return (
      <>
        <strong>{lead}</strong> {rest}
      </>
    );
  }
  return <>{text}</>;
}

export function TheContentSections({ sections, cta }: Props) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className={s.wrap}>
      {sections.map((section) => {
        const isFaq = section.body[0]?.type === "qa";
        const headingId = `content-${section.id}`;

        return (
          <section
            key={section.id}
            className={s.section}
            aria-labelledby={headingId}
          >
            <div className="container">
              <h2 id={headingId} className={s.title}>
                {section.title}
              </h2>

              {isFaq ? (
                <div className={s.faq}>
                  {section.body.map((node, i) =>
                    node.type === "qa" ? (
                      <details key={i} className={s.faqItem}>
                        <summary className={s.faqQuestion}>
                          <span>{node.q}</span>
                          <ChevronDown aria-hidden="true" />
                        </summary>
                        <p className={s.faqAnswer}>{node.a}</p>
                      </details>
                    ) : null,
                  )}
                </div>
              ) : (
                <div className={s.body}>
                  {section.body.map((node, i) => {
                    if (node.type === "p") {
                      return (
                        <p key={i} className={s.paragraph}>
                          {node.text}
                        </p>
                      );
                    }
                    if (node.type === "steps") {
                      return (
                        <ol key={i} className={s.steps}>
                          {node.items.map((item, j) => (
                            <li key={j}>
                              <span className={s.stepNumber}>{j + 1}</span>
                              <span className={s.stepText}>
                                <ListItem text={item} />
                              </span>
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    if (node.type === "list") {
                      return (
                        <ul key={i} className={s.list}>
                          {node.items.map((item, j) => (
                            <li key={j}>
                              <ListItem text={item} />
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {cta ? (
        <div className={s.ctaRow}>
          <div className="container">
            <Link className={s.ctaButton} href={cta.href}>
              <Calculator aria-hidden="true" />
              <span>{cta.label}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

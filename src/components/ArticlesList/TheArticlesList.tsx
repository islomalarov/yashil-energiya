import s from "./TheArticlesList.module.scss";
import { Article, ArticlesResponse } from "services/articles.service";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { TheClampedText } from "../ClampedText/TheClampedText";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

type TheArticlesListProps = ArticlesResponse & {
  linkLabel: string;
};

export const TheArticlesList = ({
  articles,
  linkLabel,
}: TheArticlesListProps) => {
  return (
    <div className={s.articlesList}>
      {articles.map(({ id, cover, title, excerpt, slug }: Article) => (
        <Card
          key={id}
          sx={{
            borderRadius: 2,
            boxShadow: "0px 2px 14px 0px rgba(0,0,0,.1)",
            display: "grid",
            gridTemplateRows: {
              xs: "160px minmax(0, 1fr) 52px",
              sm: "185px minmax(0, 1fr) 54px",
              md: "200px minmax(0, 1fr) 56px",
            },
            height: { xs: 420, sm: 460, md: 500 },
            overflow: "visible",
            transition:
              "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
            "&:hover": {
              boxShadow: "0 16px 36px rgba(18,144,62,.16)",
              transform: "translateY(-6px)",
              zIndex: 5,
            },
          }}
        >
          <Link className={s.mediaLink} href={`/articles/${slug}`}>
            <Image
              className={s.mediaImage}
              alt={cover ? cover.fileName : "Article cover image"}
              src={cover ? cover.url : "/hero.png"}
              width={cover?.width || 1280}
              height={cover?.height || 720}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              overflow: "hidden",
              p: { xs: 1.6, sm: 2 },
            }}
          >
            <Typography
              component="div"
              variant="h5"
              gutterBottom
              sx={{
                fontSize: { xs: "1.05rem", sm: "1.18rem", md: "1.34rem" },
                lineHeight: 1.25,
                overflowWrap: "anywhere",
              }}
            >
              {title}
            </Typography>
            <TheClampedText className={s.excerpt} lines={4}>
              {excerpt}
            </TheClampedText>
          </CardContent>
          <CardActions
            sx={{
              alignItems: "center",
              flexShrink: 0,
              px: 2,
              py: 1.25,
            }}
          >
            <Button
              size="medium"
              sx={{ color: "#12903e" }}
              href={`/articles/${slug}`}
            >
              {linkLabel}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

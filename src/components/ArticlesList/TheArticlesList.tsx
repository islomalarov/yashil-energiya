"use client";

import s from "./TheArticlesList.module.scss";
import { Article, ArticlesResponse } from "services/articles.service";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { TheClampedText } from "../ClampedText/TheClampedText";
import { Link } from "@/i18n/navigation";

export const TheArticlesList = ({ articles }: ArticlesResponse) => {
  const t = useTranslations("TheArticlesList");

  return (
    <div className={s.articlesList}>
      {articles.map(({ id, cover, title, excerpt, slug }: Article) => (
        <Card
          key={id}
          sx={{
            borderRadius: 2,
            boxShadow: "0px 2px 14px 0px rgba(0,0,0,.1)",
            display: "grid",
            gridTemplateRows: "200px minmax(0, 1fr) 56px",
            height: { xs: 470, md: 500 },
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
            <CardMedia
              component="img"
              alt={cover ? cover.fileName : "Article cover image"}
              image={cover ? cover.url : "/placeholder.jpg"}
              sx={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                display: "block",
                height: "100%",
                objectFit: "cover",
                transition: "transform .35s ease",
                width: "100%",
              }}
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
                fontSize: { xs: "1.2rem", sm: "1.28rem", md: "1.36rem" },
                lineHeight: 1.25,
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
              {t("link")}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

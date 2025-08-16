"use client";

import "@/scss/globals.scss";
import s from "./TheArticlesList.module.scss";
import { Article, ArticlesResponse } from "@/services/articles.service";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";

export const TheArticlesList = ({ articles }: ArticlesResponse) => {
  const t = useTranslations("TheArticlesList");

  return (
    <div className={s.articlesList}>
      {articles.map(({ id, cover, title, excerpt, slug }: Article) => (
        <Card
          key={id}
          sx={{
            borderRadius: "10px",
            boxShadow: "0px 2px 14px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardMedia
            component="img"
            alt={cover ? cover.fileName : "News cover image"}
            image={cover ? cover.url : "/placeholder.jpg"}
            height="200"
          />

          <CardContent>
            <Typography component="div" variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography className="description" component="p">
              {excerpt}
            </Typography>
          </CardContent>
          <CardActions>
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

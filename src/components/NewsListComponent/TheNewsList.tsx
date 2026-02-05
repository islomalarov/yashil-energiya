"use client";


import s from "./TheNewsList.module.scss";
import { NewResponse } from "services/news.service.types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { useTranslations } from "next-intl";
interface NewsProps {
  news: NewResponse[];
}

export const TheNewsList = ({ news }: NewsProps) => {
  const t = useTranslations("TheLastNews");

  return (
    <div className={s.newsList}>
      {news.map(({ id, cover, date, title, excerpt, slug }: NewResponse) => (
        <Card
          key={id}
          sx={{
            borderRadius: 2,
            boxShadow: "0px 2px 14px 0px rgba(0,0,0,.1)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            alt={cover ? cover.fileName : "News cover image"}
            image={cover ? cover.url : "/placeholder.jpg"}
            sx={{ height: 200, width: "100%", objectFit: "cover", display: "block" }}
          />

          <CardContent
          sx={{
            display: "flex", 
            flexDirection: "column", 
            flexGrow: 1
          }}>
            <Typography component="div" gutterBottom sx={{ color: "#12903e" }}>
              {date}
            </Typography>
            <Typography component="div" variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography className="description" component="p" sx={{ flexGrow: 1 }}>
              {excerpt}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="medium"
              sx={{ color: "#12903e" }}
              href={`/news/${slug}`}
            >
              {t("link")}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

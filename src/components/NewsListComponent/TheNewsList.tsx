"use client";


import s from "./TheNewsList.module.scss";
import { NewResponse } from "services/news.service.types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import { useTranslations } from "next-intl";
import { TheClampedText } from "../ClampedText/TheClampedText";
import { Link } from "@/i18n/navigation";

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
            display: "grid",
            gridTemplateRows: "200px minmax(0, 1fr) 56px",
            height: { xs: 500, md: 520 },
            overflow: "visible",
            transition:
              "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 16px 36px rgba(18,144,62,.16)",
            },
          }}
        >
          <Link className={s.mediaLink} href={`/news/${slug}`}>
            <CardMedia
              component="img"
              alt={cover ? cover.fileName : "News cover image"}
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
              gutterBottom
              sx={{ color: "#12903e", fontSize: { xs: 13, md: 14 } }}
            >
              {date}
            </Typography>
            <Typography
              component="div"
              variant="h5"
              gutterBottom
              sx={{
                flex: "0 0 auto",
                fontSize: { xs: "1.2rem", sm: "1.28rem", md: "1.36rem" },
                lineHeight: 1.25,
              }}
            >
              {title}
            </Typography>
            <TheClampedText className={s.excerpt} lines={3}>
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

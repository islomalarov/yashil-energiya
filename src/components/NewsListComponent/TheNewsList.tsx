import s from "./TheNewsList.module.scss";
import { NewResponse } from "services/news.service.types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import { TheClampedText } from "../ClampedText/TheClampedText";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface NewsProps {
  news: NewResponse[];
  linkLabel: string;
}

export const TheNewsList = ({ news, linkLabel }: NewsProps) => {
  return (
    <div className={s.newsList}>
      {news.map(({ id, cover, date, title, excerpt, slug }: NewResponse) => (
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
            height: { xs: 430, sm: 470, md: 520 },
            overflow: "visible",
            transition:
              "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 16px 36px rgba(18,144,62,.16)",
              zIndex: 5,
            },
          }}
        >
          <Link className={s.mediaLink} href={`/news/${slug}`}>
            <Image
              className={s.mediaImage}
              alt={cover ? cover.fileName : "News cover image"}
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
                fontSize: { xs: "1.05rem", sm: "1.18rem", md: "1.34rem" },
                lineHeight: 1.25,
                overflowWrap: "anywhere",
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
            <Link className={s.actionLink} href={`/news/${slug}`}>
              {linkLabel}
            </Link>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

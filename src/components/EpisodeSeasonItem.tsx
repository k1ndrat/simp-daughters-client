import { Box, Typography } from "@mui/material";
import EpisodeItem from "./EpisodeItem";

type props = {
  episodes: Episode[];
  season: string;
  setOptimisticEpisodes: any;
};

const EpisodeSeasonItem = ({
  episodes,
  season,
  setOptimisticEpisodes,
}: props) => {
  return (
    <Box
      component="div"
      sx={{
        mb: "1rem",
      }}
    >
      <Typography
        sx={{
          whiteSpace: "nowrap",
          fontSize: "1.875rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: "2",
          padding: "0.625rem 0.9375rem",
          borderRadius: "0.3125rem",
          overflow: "hidden",
          transition: "all 0.3s ease 0s",
          // textTransform: "uppercase",
        }}
      >
        {season} Сезон
      </Typography>
      <Box
        component="ul"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {episodes.map((ep) => (
          <EpisodeItem
            key={ep._id}
            episode={ep}
            setOptimisticEpisodes={setOptimisticEpisodes}
          />
        ))}
      </Box>
    </Box>
  );
};

export default EpisodeSeasonItem;

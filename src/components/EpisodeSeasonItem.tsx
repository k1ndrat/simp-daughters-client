import { Box, Typography } from "@mui/material";
import EpisodeItem from "./EpisodeItem";
import { useState } from "react";
import { motion } from "framer-motion";

type props = {
  episodes: Episode[];
  season: string;
};

const EpisodeSeasonItem = ({ episodes, season }: props) => {
  const watchedEpisodes = episodes.filter((ep) => ep.state?.isWatched).length;

  const [countWatched, setCountWatched] = useState<number>(watchedEpisodes);
  return (
    <motion.div
      style={{
        marginBottom: "1rem",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        type: "spring",
        // stiffness: 50,
        // damping: 20,
        delay: 0.1,
        duration: 1.5,
      }}
    >
      <Box
        component="div"
        sx={{
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: "2",
          padding: "0.625rem 0.9375rem",
          borderRadius: "0.3125rem",
          overflow: "hidden",
          transition: "all 0.3s ease 0s",
          marginBottom: "1rem",
          "&:before": {
            content: '""',
            position: "absolute",
            height: "100%",
            backgroundColor:
              countWatched / episodes.length === 1
                ? "#fc477e"
                : "rgba(255, 255, 255, 0.2)",
            width: `${(countWatched / episodes.length) * 100}%`,
            left: 0,
            top: 0,
            transition: "all 0.3s ease",
            zIndex: -1,
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "1.875rem",
          }}
        >
          {season} Сезон
        </Typography>
        <Typography
          sx={{
            fontSize: "1.25rem",
          }}
        >
          {Math.round((countWatched / episodes.length) * 10000) / 100}%
        </Typography>
      </Box>
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
            key={season + "_" + ep._id}
            episode={ep}
            setCountWatched={setCountWatched}
          />
        ))}
      </Box>
    </motion.div>
  );
};

export default EpisodeSeasonItem;

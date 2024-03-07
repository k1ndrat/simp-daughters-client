import { Box } from "@mui/material";
import EpisodeItem from "./EpisodeItem";

type props = {
  season: Episode[];
  setOptimisticEpisodes: any;
};

const EpisodeSeasonItem = ({ season, setOptimisticEpisodes }: props) => {
  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {season.map((ep) => (
        <EpisodeItem
          key={ep._id}
          episode={ep}
          setOptimisticEpisodes={setOptimisticEpisodes}
        />
      ))}
    </Box>
  );
};

export default EpisodeSeasonItem;

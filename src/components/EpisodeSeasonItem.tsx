import EpisodeItem from "./EpisodeItem";

type props = {
  season: Episode[];
};

const EpisodeSeasonItem = ({ season }: props) => {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {season.map((ep) => (
        <EpisodeItem episode={ep} />
      ))}
    </ul>
  );
};

export default EpisodeSeasonItem;

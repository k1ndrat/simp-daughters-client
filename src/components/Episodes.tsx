import { Container, Typography } from "@mui/material";
import EpisodeSeasonItem from "./EpisodeSeasonItem";
import Loader from "./Loader";
import { QueryStatus } from "@reduxjs/toolkit/query";

interface props {
  status: QueryStatus;
  isLoading: boolean;
  episodes: any;
  usePercentage?: boolean;
}

const Episodes = ({
  status,
  isLoading,
  episodes,
  usePercentage = true,
}: props) => {
  const isEmpty = Object.keys(episodes).length === 0;

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && status === "fulfilled" && (
        <Container
          style={{
            margin: "7rem auto 0",
            padding: "0 15px",
            maxWidth: "1400px",
            paddingTop: "50px",
            paddingBottom: "50px",
            display: !isEmpty ? "grid" : "block",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          {isEmpty && (
            <Typography
              sx={{
                textAlign: "center",
              }}
            >
              There are no episodes here yet
            </Typography>
          )}

          {!isEmpty &&
            Object.keys(episodes).map((key) => (
              <EpisodeSeasonItem
                key={key}
                episodes={episodes[key]}
                season={key}
                usePercentage={usePercentage}
              />
            ))}
        </Container>
      )}
    </>
  );
};

export default Episodes;

import { Container, Typography } from "@mui/material";
import EpisodeSeasonItem from "./EpisodeSeasonItem";
import Loader from "./Loader";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { motion } from "framer-motion";

interface props {
  isSuccess: boolean;
  isLoading: boolean;
  episodes: any;
  usePercentage?: boolean;
  error?: any;
}

const Episodes = ({
  isSuccess,
  isLoading,
  episodes,
  usePercentage = true,
  error,
}: props) => {
  const isEmpty = episodes && Object.keys(episodes).length === 0;

  return (
    <>
      {error && <p>{error.error}</p>}
      {isLoading && <Loader />}
      {!isLoading && isSuccess && (
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
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {isEmpty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
              }}
              style={{
                textAlign: "center",
              }}
            >
              There are no episodes here yet
            </motion.div>
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

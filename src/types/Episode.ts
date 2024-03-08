interface Episode {
  _id: string;
  episode: number;
  season: number;
  title: string;
  link: string;
  state?: State;
}

interface State {
  isLiked: boolean | undefined;
  isWatched: boolean | undefined;
  isForLater: boolean | undefined;
}

type Episodes = {
  [season: string]: Episode[];
};

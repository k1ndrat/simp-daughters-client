interface Episode {
  _id: string;
  episode: number;
  season: number;
  title: string;
  link: string;
  state?: State;
}

interface State {
  isLiked: boolean;
  isWatched: boolean;
  isForLater: boolean;
}

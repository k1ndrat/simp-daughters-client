type props = {
  episode: Episode;
};

const EpisodeItem = ({ episode }: props) => {
  return (
    <li
      style={{
        position: "relative",
        borderRadius: "5px",
        transition: "all 0.3s ease 0s",
        // display: "flex",
        gap: "15px",
        fontSize: "16px",
        fontWeight: "500",
        listStyle: "none",
        hover: {
          backgroundColor: "blue",
        },
      }}
    >
      <a
        href={episode.link}
        target="_blank"
        rel="noreferrer"
        style={{
          transition: "all 0.3s ease 0s",
          borderRadius: " 0.3125rem",
          padding: "0.625rem 0.9375rem",
          width: "100%",
          display: "flex",
          gap: "0.9375rem",
          zIndex: "2",
          backgroundColor: "#354051",
        }}
      >
        <div className="item__number">{episode.episode}</div>
        <div className="item__title-body">
          <div className="item__title-episode">{episode.title}</div>
        </div>
      </a>

      <div
        className="item__actives"
        style={{
          position: "absolute",
          width: "100%",
          backgroundColor: "#1a2028",
          left: "0",
          bottom: "0",
          height: "40px",
          zIndex: "-1",
          borderRadius: "0.3125rem",
          transition: "all 0.3s ease 0s",
          padding: "0.625rem 0.9375rem",
          display: "flex",
          justifyContent: "space-evenly",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <button>
          <svg
            className="item__like"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            style={{
              fill: episode?.state?.isLiked === true ? "#fc477e" : "",
            }}
          >
            <path d="M24,11.034a2.5,2.5,0,0,0-2.5-2.5H15.189a.25.25,0,0,1-.237-.328,8.684,8.684,0,0,0,.52-4.407c-.588-2.095-1.834-2.7-2.809-2.565A2,2,0,0,0,11,3.284C11,6.03,8.871,9.03,6.966,10.345a.5.5,0,0,0-.216.412V20.873a.5.5,0,0,0,.405.491c.357.069.681.135.987.2a17.309,17.309,0,0,0,4.108.471h6.5c1.957,0,2.25-1.1,2.25-1.75a2.24,2.24,0,0,0-.232-.994,2.248,2.248,0,0,0,1-3A2.252,2.252,0,0,0,23,14.284a2.226,2.226,0,0,0-.273-1.072A2.5,2.5,0,0,0,24,11.034Z"></path>
            <path d="M5.25,10.784a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v11a1,1,0,0,0,1,1H4.25a1,1,0,0,0,1-1Zm-1.5,9.25a.75.75,0,1,1-.75-.75A.75.75,0,0,1,3.75,20.034Z"></path>
          </svg>
        </button>

        <button>
          <svg
            className="item__dislike"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            style={{
              transform: "rotateZ(180deg)",
              fill: episode?.state?.isLiked === false ? "#fc477e" : "",
            }}
          >
            <path d="M24,11.034a2.5,2.5,0,0,0-2.5-2.5H15.189a.25.25,0,0,1-.237-.328,8.684,8.684,0,0,0,.52-4.407c-.588-2.095-1.834-2.7-2.809-2.565A2,2,0,0,0,11,3.284C11,6.03,8.871,9.03,6.966,10.345a.5.5,0,0,0-.216.412V20.873a.5.5,0,0,0,.405.491c.357.069.681.135.987.2a17.309,17.309,0,0,0,4.108.471h6.5c1.957,0,2.25-1.1,2.25-1.75a2.24,2.24,0,0,0-.232-.994,2.248,2.248,0,0,0,1-3A2.252,2.252,0,0,0,23,14.284a2.226,2.226,0,0,0-.273-1.072A2.5,2.5,0,0,0,24,11.034Z"></path>
            <path d="M5.25,10.784a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v11a1,1,0,0,0,1,1H4.25a1,1,0,0,0,1-1Zm-1.5,9.25a.75.75,0,1,1-.75-.75A.75.75,0,0,1,3.75,20.034Z"></path>
          </svg>
        </button>

        <button>
          <svg
            className="item__later"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            // xlink="http://www.w3.org/1999/xlink"
            width={24}
            fill={episode?.state?.isForLater === true ? "#fc477e" : ""}
          >
            <defs>
              <path d="M0 0h48v48H0V0z" id="a"></path>
            </defs>
            <clipPath id="b">
              <use overflow="visible" href="#a"></use>
            </clipPath>
            <path
              clipPath="url(#b)"
              d="M23.98 4C12.94 4 4 12.96 4 24s8.94 20 19.98 20C35.04 44 44 35.04 44 24S35.04 4 23.98 4zm8.52 28.3L22 26V14h3v10.5l9 5.34-1.5 2.46z"
            ></path>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default EpisodeItem;

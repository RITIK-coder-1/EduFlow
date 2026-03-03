/* ----------------------------------------------------------------------------------------------
ReactPlayer.jsx
Returns the React Video Player component for videoplayback
------------------------------------------------------------------------------------------------- */

import ReactPlayer from "react-player";

function ReactVideoPlayer({src}) {
  return <ReactPlayer width="100%" height="100%" src={src}/>;
}

export default ReactVideoPlayer;

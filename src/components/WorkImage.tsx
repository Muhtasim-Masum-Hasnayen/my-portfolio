
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);

      const response = await fetch(`/videos/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      setVideo(blobUrl);
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link || undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target={props.link ? "_blank" : undefined}
        rel={props.link ? "noreferrer" : undefined}
        data-cursor="disable"
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}

        <img
          src={
            props.image.startsWith("/")
              ? props.image
              : `/images/${props.image}`
          }
          alt={props.alt || "Project preview"}
        />

        {isVideo && video && (
          <video
            src={video}
            autoPlay
            muted
            playsInline
            loop
          />
        )}
      </a>
    </div>
  );
};

export default WorkImage;

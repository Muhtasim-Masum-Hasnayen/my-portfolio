import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent < 100) return;

    const loadedTimeout = window.setTimeout(() => {
      setLoaded(true);
    }, 600);
    const welcomeTimeout = window.setTimeout(() => {
      setIsLoaded(true);
    }, 1600);

    return () => {
      window.clearTimeout(loadedTimeout);
      window.clearTimeout(welcomeTimeout);
    };
  }, [percent]);

  useEffect(() => {
    if (!isLoaded) return;

    setClicked(true);
    const timeout = window.setTimeout(() => {
      import("./utils/initialFX")
        .then(({ initialFX }) => initialFX())
        .catch((error: unknown) => {
          console.error("Unable to start the landing animations:", error);
        })
        .finally(() => setIsLoading(false));
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          Logo
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> A Creative FULL Stack Web Developer</span> <span>A Creative QA Engineer</span>
            <span> A Creative FULL Stack Web Developer</span> <span>A Creative QA Engineer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;
  let completed = false;

  const update = (value: number) => {
    if (completed) return;
    percent = Math.max(percent, Math.min(99, Math.floor(value)));
    setLoading(percent);
  };

  function clear() {
    completed = true;
    percent = 100;
    setLoading(100);
  }

  function loaded() {
    clear();
    return Promise.resolve(percent);
  }
  return { update, loaded, clear };
};

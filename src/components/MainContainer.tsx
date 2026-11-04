import {
  lazy,
  PropsWithChildren,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLoading } from "../context/LoadingProvider";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Education from "./Education";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const { setLoading } = useLoading();
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [shouldLoadTechStack, setShouldLoadTechStack] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      const desktopView = window.innerWidth > 1024;
      setIsDesktopView(desktopView);
      if (!desktopView) setLoading(100);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [setLoading]);

  useEffect(() => {
    if (shouldLoadTechStack || !techStackRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadTechStack(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(techStackRef.current);

    return () => observer.disconnect();
  }, [shouldLoadTechStack]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Education />
            <Work />
            <div className="techstack-slot" ref={techStackRef}>
              {shouldLoadTechStack && (
                <Suspense fallback={null}>
                  <TechStack />
                </Suspense>
              )}
            </div>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

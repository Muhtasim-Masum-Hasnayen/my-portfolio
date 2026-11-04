import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll<HTMLAnchorElement>(".header ul a");
    const handleLinkClick = (event: MouseEvent) => {
      if (window.innerWidth <= 1024) return;
      event.preventDefault();
      const section = (event.currentTarget as HTMLAnchorElement).getAttribute(
        "data-href"
      );
      if (section) smoother.scrollTo(section, true, "top top");
    };
    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };

    links.forEach((link) => link.addEventListener("click", handleLinkClick));
    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleLinkClick)
      );
      window.removeEventListener("resize", handleResize);
      smoother.kill();
    };
  }, []);
  return (
    <>
      <div className="header">
        
<a href="/#" className="navbar-title logo-link" data-cursor="disable">
  <svg
    className="animated-logo"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="MMH logo"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>

    <circle
      className="logo-orbit"
      cx="50"
      cy="50"
      r="43"
      fill="none"
      stroke="url(#logoGradient)"
      strokeWidth="2"
      strokeDasharray="12 7"
    />

    <path
      d="M25 68 V34 L40 53 L50 39 L60 53 L75 34 V68"
      fill="none"
      stroke="url(#logoGradient)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <circle cx="76" cy="24" r="4" fill="#22d3ee" />
  </svg>

  <span className="logo-text">MASUM<span>.</span></span>
</a>

        <a
          href="mailto:hasnayenmasum@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          hasnayenmasum@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#education" href="#education">
              <HoverLinks text="EDUCATION" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;

import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    const resetPositions = () => {
      social.querySelectorAll("a").forEach((link) => {
        link.style.setProperty("--siLeft", "50%");
        link.style.setProperty("--siTop", "50%");
      });
    };

    const onMouseMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const item = target.closest("span");
      if (!item || !social.contains(item)) return;

      const link = item.querySelector("a");
      if (!link) return;

      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const isNearIcon = x < 40 && x > 10 && y < 40 && y > 5;

      link.style.setProperty("--siLeft", isNearIcon ? `${x}px` : "50%");
      link.style.setProperty("--siTop", isNearIcon ? `${y}px` : "50%");
    };

    social.addEventListener("mousemove", onMouseMove, { passive: true });
    social.addEventListener("mouseleave", resetPositions);

    return () => {
      social.removeEventListener("mousemove", onMouseMove);
      social.removeEventListener("mouseleave", resetPositions);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/Muhtasim-Masum-Hasnayen" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://www.linkedin.com/in/muhtasim-masum-hasnayen-048517273/" target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://x.com/HasnayenMasum" target="_blank">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/mh_masum209/" target="_blank">
            <FaInstagram />
          </a>
        </span>
        <span>
          <a href="https://www.facebook.com/mh.masum.908" target="_blank">
            <FaFacebookF />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/resume.pdf"
        download="Muhtasim-Masum-Hasnayen-Resume.pdf"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;

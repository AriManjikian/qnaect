import {
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaTelegram,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const socialMediaPlatforms: { [key: string]: JSX.Element } = {
  github: <FaGithub />,
  twitter: <FaXTwitter />,
  youtube: <FaYoutube />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedin />,
  dribble: <FaDribbble />,
  twitch: <FaTwitch />,
  telegram: <FaTelegram />,
  medium: <FaMedium />,
};

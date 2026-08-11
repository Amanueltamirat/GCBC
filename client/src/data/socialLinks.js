// import { Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { FaFacebook, FaYoutube, FaInstagram, FaTelegram } from "react-icons/fa";

// Real links, pulled from the original site. Send stands in for Telegram —
// lucide-react doesn't ship a dedicated Telegram brand mark.
const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/share/196r4LP1ZS/?mibextid=wwXIfr', Icon: FaFacebook },
  { name: 'YouTube', url: 'https://www.youtube.com/@SoddoBaptistChurch', Icon: FaYoutube },
  { name: 'Instagram', url: 'https://www.instagram.com/soddobaptistchurch/', Icon: FaInstagram },
  { name: 'Telegram', url: 'https://t.me/GCBCS', Icon: FaTelegram },
];

export default socialLinks;

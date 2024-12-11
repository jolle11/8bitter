import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiHashnode } from "react-icons/si";
import { VscGithubInverted } from "react-icons/vsc";

import "./Footer.scss";

const socialLinks = [
    {
        href: "https://github.com/jolle11",
        label: "Link to my github repository",
        icon: <VscGithubInverted />,
    },
    {
        href: "https://www.linkedin.com/in/jordi-oll%C3%A9-ballest%C3%A9-8398b181/",
        label: "Link to my linkedin profile",
        icon: <FaLinkedinIn />,
        className: "footer__link--linkedin",
    },
    {
        href: "https://jordi0lle.hashnode.dev/",
        label: "Link to my hashnode blog",
        icon: <SiHashnode />,
        className: "footer__link--hashnode",
    },
    {
        href: "https://twitter.com/jordi0lle",
        label: "Link to my X (formerly Twitter) profile",
        icon: <FaXTwitter />,
        className: "footer__link--twitter",
    },
    {
        href: "https://www.instagram.com/jordi0lle/",
        label: "Link to my instagram profile",
        icon: <AiFillInstagram />,
        className: "footer__link--instagram",
    },
];

const Footer = () => {
    return (
        <div className="footer">
            <p className="footer__text">Created by Jordi Ollé</p>
            <div className="footer__links">
                {socialLinks.map(({ href, label, icon, className = "" }) => (
                    <a
                        key={href}
                        href={href}
                        className={`footer__link ${className}`}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Footer;

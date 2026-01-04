import React from "react";
import { footerStyles as styles } from "../assets/dummystyles";
import { Link } from "react-router-dom";
import logo from "../assets/logoicon.png";
import { quickLinks, socialLinks } from "../assets/dummydata";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.logoBlock}>
            <Link to="/" className={styles.logoLink}>
              <img src={logo} className={styles.logoImg} />
              <h1 className={styles.logoText}>BookShell</h1>
            </Link>
            <p className={styles.aboutText}>
              BookShell is your cozy corner for discovering timeless stories,
              modern reads, and everything in between.
            </p>
            <div className={styles.socialWrap}>
              {socialLinks.map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialButton}
                >
                  <Icon className={styles.socialIcon} />
                </a>
              ))}
            </div>
          </div>
          <div className={styles.quickLinksBlock}>
            <h3 className={styles.quickLinksTitle}>Quick Links</h3>

            <ul className={styles.quickLinksList}>
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.url} className={styles.quickLinkItem}>
                    <span className={styles.quickLinkDot}></span>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.newsletterBlock}>
            <h3 className={styles.newsletterTitle}>Stay Updated</h3>

            <p className={styles.newsletterText}>
              Subscribe to get updates on new books and special offers.
            </p>

            <div className={styles.formWrap}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.input}
              />

              <button type="submit" className={`${styles.button} mt-0.5`}>
                <ArrowRight className="h-4 w-4 cursor-pointer" />
              </button>
            </div>
          </div>
          <div className={styles.contactBlock}>
            <h3 className={styles.contactTitle}>Contact Us</h3>

            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                123 BookStreet, Reading City, 45678
              </li>

              <li className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                contact@bookshell.com
              </li>

              <li className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                03089183548
              </li>
            </ul>
          </div>
        </div>
        <div className={`${styles.copyrightWrap} w-full`}>
          <p className={`${styles.copyrightText} text-center`}>
            &copy; {new Date().getFullYear()} BookShell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

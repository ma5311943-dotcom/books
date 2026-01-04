import React from "react";
import homeAboutImage from "../assets/homeaboutimage.png";
import { featuredBooks, hastats } from "../assets/dummydata";
import { homeAboutStyles as s } from "../assets/dummystyles";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const HomeAbout = () => {
  return (
    <div className={s.wrapper}>
      <div className="relative inset-0  overflow-hidden">
        <div className={s.bgBlur1}></div>
        <div className={s.bgBlur2}></div>
      </div>
      <div className={s.container}>
        <div className={s.aboutGrid}>
          <div className={s.imageWrapper}>
            <div className={s.imageGlow}></div>
            <div className={s.imageContainer}>
              <img className={s.aboutImage} src={homeAboutImage} />
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className={s.aboutHeader}>Out Literary Journey</h2>
              <div className={s.underline}></div>
            </div>
            <p className={s.aboutText}>
              Founded with a passion for literature, Bookshell brings readers
              closer to stories that inspire, educate, and entertain.
            </p>
            <div className={s.statGrid}>
              {hastats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={s.statCard}>
                    <div className={s.statIconWrap}>
                      <Icon className={s.statIcon} />
                    </div>
                    <div className={s.statValue}>{stat.value}</div>
                    <div className={s.statLabel}>{stat.label}</div>
                  </div>
                );
              })}
            </div>
            <Link to="/about" className={s.aboutButton}>
              <span>Learn More About Us</span>
              <ArrowRight className={s.arrowIcon} />
            </Link>
          </div>
        </div>
        <div className="mb-12 text-center">
          <h2 className={s.sectionHeader}>Legendary Volumes</h2>
          <div className={s.headerUnderline}></div>
          <p className={s.headerText}>
            Explore timeless masterpieces that shaped literature and continue to
            inspire readers across generations.
          </p>
        </div>
        <div className={s.bookGrid}>
          {featuredBooks.map((book, index) => (
            <div key={index} className={s.bookCardWrap}>
              <div className={s.bookCardGlow}></div>
              <div className={s.bookCard}>
                <div className={s.bookImageWrapper}>
                  <img
                    src={book.image}
                    alt={book.title}
                    className={s.bookImage}
                  />
                </div>
                <div className={s.bookContent}>
                  <h3 className={s.bookTitle}>{book.title}</h3>
                  <p className={s.bookAuthor}>{book.author}</p>
                  <p className={s.bookDesc}>{book.description}</p>
                  <span className={`${s.discoverLink} cursor-pointer`}>
                    Discover More
                    <span className={s.arrowSmall}>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;

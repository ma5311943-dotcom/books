// ===== Imports =====
import React from "react";
import aboutStyles from "../assets/dummystyles";
import { apstats, apteamMembers, apbranches } from "../assets/dummydata";
import AboutUsImage from "../assets/AboutUsImage.png";
import { Target, Heart, Users, MapPin, Clock } from "lucide-react";

// ===== About Component =====
const About = () => {
  return (
    <div className={aboutStyles.container}>
      <section className={aboutStyles.section}>
        <div className={aboutStyles.innerContainer}>
          <div className={aboutStyles.headingWrapper}>
            <h1 className={aboutStyles.heading}>Crafting Literary Futures</h1>
            <p className={aboutStyles.subText}>
              We build quality-driven solutions with passion, trust, and
              innovation.
            </p>
          </div>
        </div>
      </section>

      <section className={aboutStyles.statsSection}>
        <div
          className={`${aboutStyles.innerContainer} grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6`}
        >
          {apstats.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={aboutStyles.statCard}>
                <div className={aboutStyles.statIconWrapper}>
                  <Icon size={22} />
                </div>
                <div className={aboutStyles.statValue}>{item.value}</div>
                <div className={aboutStyles.statLabel}>{item.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={aboutStyles.aboutSection}>
        <div
          className={`${aboutStyles.innerContainer} grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}
        >
          <div className={aboutStyles.aboutImageWrapper}>
            <img src={AboutUsImage} className={aboutStyles.aboutImage} />
            <div className={aboutStyles.aboutOverlay}></div>
            <div className={aboutStyles.aboutCaption}>
              <h3 className={aboutStyles.aboutTitle}>Our Vision</h3>
              <p className={aboutStyles.aboutSubtitle}>Growth with integrity</p>
            </div>
          </div>

          <div className={aboutStyles.aboutTextSection}>
            <div className={aboutStyles.aboutHeadingSection}>
              <h2 className={aboutStyles.aboutHeading}>Who We Are</h2>
              <p className={aboutStyles.aboutParagraph}>
                We focus on scalable, modern, and efficient digital experiences.
              </p>
            </div>

            <div className={aboutStyles.aboutBoxGrid}>
              <div className={aboutStyles.aboutBox}>
                <Target size={26} className="mb-3 text-[#43C6AC]" />
                <h4 className={aboutStyles.aboutBoxHeading}>Mission</h4>
                <p className={aboutStyles.aboutBoxText}>
                  Deliver impactful digital products.
                </p>
              </div>

              <div className={aboutStyles.aboutBox}>
                <Heart size={26} className="mb-3 text-[#43C6AC]" />
                <h4 className={aboutStyles.aboutBoxHeading}>Values</h4>
                <p className={aboutStyles.aboutBoxText}>
                  Trust, quality, and transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={aboutStyles.teamSection}>
        <div className={aboutStyles.innerContainer}>
          <h2
            className={`${aboutStyles.sectionTitle} text-center flex items-center justify-center gap-3`}
          >
            <Users size={32} />
            Our Team
          </h2>
          <div className={aboutStyles.sectionUnderline}></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {apteamMembers.map((member) => (
              <div key={member.id} className={aboutStyles.teamCard}>
                <div className={aboutStyles.teamImageWrapper}>
                  <img src={member.image} className={aboutStyles.teamImage} />
                  <div className={aboutStyles.teamOverlay}></div>
                </div>
                <h4 className={aboutStyles.teamName}>{member.name}</h4>
                <p className={aboutStyles.teamPosition}>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={aboutStyles.branchSection}>
        <div className={aboutStyles.innerContainer}>
          <div className="text-center mb-14">
            <h2 className={aboutStyles.sectionTitle}>Our Global Branches</h2>
            <div className={aboutStyles.sectionUnderline}></div>
            <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-lg">
              Visit our thoughtfully designed spaces across the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {apbranches.map((branch, i) => (
              <div key={i} className={aboutStyles.branchCard}>
                <div className={aboutStyles.branchImageWrapper}>
                  <img src={branch.image} className={aboutStyles.branchImage} />
                  <div className={aboutStyles.branchOverlay}></div>
                </div>

                <div className={aboutStyles.branchInfoWrapper}>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-[#43C6AC]" />
                    <span className={aboutStyles.branchLocation}>
                      {branch.location}
                    </span>
                  </div>

                  <div className={aboutStyles.branchHours}>
                    <Clock size={16} />
                    <span>{branch.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

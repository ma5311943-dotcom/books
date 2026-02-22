// assets/dummy/dummystyles.js

// Updated navbarStyles
export const navbarStyles = {
  nav: (scrolled) =>
    `fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 ${scrolled ? "shadow-md py-2" : "py-4"
    }`,

  container: "container mx-auto px-4 lg:px-[35px]",
  logoContainer: "flex items-center justify-between",
  logoGradient: "absolute -inset-3 rounded-full opacity-0 blur-xl group-hover:opacity-30 transition-opacity bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE]",
  logoImage: "h-7 w-7 lg:h-8 lg:w-8 rounded-full z-10",
  logoText: "text-lg lg:text-xl font-semibold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent",
  logoUnderline: "h-0.5 w-0 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] group-hover:w-full transition-all duration-500",
  desktopNavWrapper: "hidden lg:flex items-center",
  navLink: "relative group px-3 xl:px-6 py-3.5 rounded-lg transition-all duration-300 overflow-hidden text-xs xl:text-sm",

  navIconWrapper: (color) =>
    `absolute -inset-1 bg-gradient-to-r ${color} rounded-full opacity-0 blur group-hover:opacity-30 transition-opacity duration-500`,


  navIcon: (isActive, color) => {
    const baseColor = color ? (color.includes('violet') ? 'violet' : color.split('-')[1]) : 'emerald';
    return `relative h-5 w-5 xl:h-6 xl:w-6 ${isActive ? `text-${baseColor}-500` : "text-gray-600 group-hover:text-gray-900"} transition-colors duration-300 z-10`;
  },

  navText: (isActive, color) =>
    `ml-2  ${isActive
      ? `bg-gradient-to-r ${color} bg-clip-text text-transparent font-semibold`
      : "text-gray-600 group-hover:text-gray-900 font-semibold"
    }`,


  navUnderline: (color) =>
    `absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r ${color} rounded-full`,

  rightIconsWrapper: "hidden lg:flex items-center space-x-4 xl:space-x-5 ml-4 xl:ml-6",


  cartWrapper: "relative group",
  cartGradient: "absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500",
  cartIcon: "relative h-5 w-5 xl:h-6 xl:w-6 text-gray-600 group-hover:text-amber-600 transition-colors duration-300 z-10",
  cartBadge:
    "absolute top-[-14px] right-[-14px] flex items-center justify-center w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-600 text-[10px] font-medium text-white rounded-full",

  loginWrapper: "relative group",
  loginGradient: "absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500",
  loginIcon: "relative h-5 w-5 xl:h-6 xl:w-6 text-gray-600 group-hover:text-emerald-600 transition-colors duration-300 z-10",

  menuBtn: "relative group p-1",
  menuGradient: "absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500",
  menuIcon: "relative h-6 w-6 text-gray-600 z-10",

  mobileMenu: "lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40",
  mobileContainer: "container mx-auto px-4 py-4",
  mobileNavItem: (isActive, color) =>
    `flex items-center px-4 py-3 rounded-lg ${isActive ? `bg-gradient-to-r ${color}/10` : "hover:bg-gray-100"
    } transition-colors`,

  mobileNavIcon: (isActive, color) => {
    const baseColor = color.includes('violet') ? 'violet' : color.split('-')[1];
    return `h-5 w-5 ${isActive ? `text-${baseColor}-500` : "text-gray-600"}`;
  },

  mobileNavText: (isActive, color) => {
    const baseColor = color.includes('violet') ? 'violet' : color.split('-')[1];
    return `ml-3 ${isActive ? `text-${baseColor}-600 font-medium` : "text-gray-600"}`;
  },

  mobileIconRow: "flex justify-between items-center mt-4",
  mobileCartBadge:
    "absolute top-0 right-0 -mt-1 -mr-1 w-5 h-5 flex items-center justify-center text-[10px] font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-full",

  getBaseColor: (color) =>
    color.includes('violet') ? 'violet' : color.split('-')[1],

};

//banner
export const container =
  "min-h-screen flex items-center justify-center px-4 pt-20 md:pt-24 pb-10 relative bg-gradient-to-br from-[#43C6AC]/90 to-[#2B5876]/90";
export const glassBox =
  "backdrop-blur-2xl bg-white/95 rounded-lg md:rounded-xl shadow-lg max-w-5xl w-full mx-4 p-2.5 md:p-3.5 lg:p-4.5 relative overflow-hidden";
export const geometricOverlay =
  "absolute inset-0 opacity-10 pointer-events-none";
export const headerText =
  "text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug";
export const subHeader =
  "font-light text-2xl sm:text-3xl md:text-4xl text-gray-800";
export const paragraphText =
  "text-gray-700 text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed max-w-xl";
export const formContainer =
  "flex gap-3 flex-col sm:flex-row";
export const inputWrapper =
  "flex-1 relative group";
export const inputField =
  "w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-2.5 bg-transparent border-0 focus:ring-0 text-gray-800 placeholder-gray-400 text-sm md:text-base font-medium";
export const searchButton =
  "px-4 md:px-5 py-2.5 md:py-3 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-md md:rounded-lg font-medium transition-all duration-300 shadow-md flex items-center gap-2 justify-center text-xs md:text-sm";
export const statsContainer =
  "flex flex-wrap gap-4 md:gap-5 pt-4 md:pt-5 justify-center lg:justify-start text-center lg:text-left";
export const statBox =
  "px-4 md:px-5 border-r last:border-0 border-gray-200";
export const statNumber =
  "text-xl md:text-2xl font-semibold text-[#2B5876]";
export const statLabel =
  "text-gray-600 text-xs md:text-sm";
export const imageSection =
  "relative group flex justify-center mt-5 lg:mt-0";
export const imageWrapper =
  "relative w-full max-w-xs lg:max-w-sm aspect-square bg-gradient-to-br from-white/20 to-[#F8FFAE]/10 rounded-lg md:rounded-xl overflow-hidden";
export const imageStyle =
  "w-full h-full object-contain object-center transform group-hover:scale-[1.01] transition-transform duration-500";
export const overlayEffect =
  "absolute inset-0 mix-blend-overlay bg-gradient-to-t from-[#2B5876]/10 to-transparent";

// assets/dummy/dummystyles.js

export const ourBestSellersStyles = {
  section: "py-8 md:py-16 bg-gray-50",
  container: "container mx-auto px-4 sm:px-8 md:px-12 lg:px-20",
  headerWrapper: "flex flex-col md:flex-row justify-between items-center md:items-center mb-6 md:mb-12 gap-4 md:gap-8 text-center md:text-left",
  headerText: "space-y-0.5 md:space-y-2 w-full md:w-auto",
  title: "text-2xl md:text-4xl font-semibold text-gray-900",
  gradientText: "bg-gradient-to-r from-[#1A237E] to-[#43C6AC] bg-clip-text text-transparent",
  subtitle: "text-gray-600 text-sm md:text-lg",
  navWrapper: "flex items-center justify-center md:justify-end gap-3 w-full md:w-auto",
  navLine: "hidden md:block flex-1 border-t border-gray-200",
  navButtons: "flex items-center gap-2 md:gap-3",
  navBtn: "p-2 md:p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow",
  navIcon: "text-[#1A237E]",
  scrollContainer: "flex overflow-x-auto gap-3 md:gap-8 pb-4 md:pb-1 snap-x scrollbar-hide scroll-smooth",

  card: (index) => {
    const gradients = [
      "from-blue-100 via-teal-100 to-cyan-100",
      "from-purple-100 via-pink-100 to-rose-100",
      "from-amber-100 via-orange-100 to-yellow-100",
      "from-green-100 via-emerald-100 to-teal-100",
      "from-indigo-100 via-blue-100 to-sky-100",
      "from-pink-100 via-fuchsia-100 to-purple-100",
      "from-cyan-100 via-blue-100 to-indigo-100",
      "from-lime-100 via-green-100 to-emerald-100",
    ];
    const bgClass = gradients[index % gradients.length];
    return `flex-shrink-0 w-[240px] sm:w-[270px] md:w-[300px] h-[320px] sm:h-[420px] md:h-[550px] rounded-2xl md:rounded-3xl overflow-auto bg-gradient-to-br ${bgClass} shadow-lg md:shadow-xl relative group transition-all duration-300 hover:shadow-xl md:hover:shadow-2xl snap-center`;
  },

  cardInner: "p-4 sm:p-5 md:p-8 pb-32 sm:pb-40 md:pb-60 flex flex-col justify-between h-full relative z-10",
  stars: "flex items-center gap-0.5 md:gap-1.5",
  bookInfo: "space-y-0.5 sm:space-y-1 md:space-y-2 mt-2 md:mt-3",
  bookTitle: "text-base sm:text-lg md:text-2xl font-semibold text-gray-900 leading-tight line-clamp-2",
  bookAuthor: "text-xs md:text-sm font-medium text-gray-600",
  bookDesc: "text-gray-700 text-xs md:text-sm leading-snug md:leading-relaxed line-clamp-3 mt-2 md:mt-3",
  cartControls: "flex flex-col gap-2 md:gap-4 mt-3 md:mt-8",
  priceQtyWrapper: "flex flex-col items-start gap-2",
  price: "text-lg sm:text-xl md:text-2xl font-semibold text-gray-900",
  qtyWrapper: "flex items-center gap-2 md:gap-4 bg-white/90 backdrop-blur-sm px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-sm",
  qtyBtn: "text-[#1A237E] hover:text-[#43C6AC] p-1 md:p-1.5",
  qtyText: "text-gray-900 font-medium w-6 text-center text-sm md:text-base",
  addButton: "flex items-center gap-1.5 md:gap-2 px-3 sm:px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#1A237E] to-[#43C6AC] text-white rounded-lg md:rounded-xl font-medium hover:scale-[1.02] transition-transform text-xs sm:text-sm md:text-base whitespace-nowrap",
  bookImage: "absolute right-3 sm:right-4 md:right-6 bottom-3 sm:bottom-4 md:bottom-6 w-16 h-24 sm:w-20 sm:h-28 md:w-[120px] md:h-[180px] object-cover rounded-lg md:rounded-xl border-2 md:border-4 border-white shadow-lg md:shadow-2xl transform group-hover:-translate-y-1 md:group-hover:-translate-y-2 transition-transform"
};


// assets/dummy/dummystyles.js

export const homeBooksStyles = {
  section: "py-20 bg-gradient-to-br from-[#43C6AC] to-[#F8FFAE] relative",
  container: "container mx-auto px-4 md:px-6",
  card: "bg-white rounded-2xl shadow-lg p-8 md:p-12",
  heading: "text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent mb-4",
  headingLine: "h-1 w-20 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full mx-auto",
  grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
  bookCard: "group relative flex flex-col",
  imageWrapper: "relative h-50 overflow-hidden rounded-xl border-4 border-[#43C6AC]/20 mb-4",
  image: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
  rating: "absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full flex items-center whitespace-nowrap",
  title: "text-xl font-semibold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis",
  author: "text-gray-600 mb-3 whitespace-nowrap overflow-hidden text-ellipsis",
  priceContainer: "flex items-center gap-2 mb-4 whitespace-nowrap",
  discountPrice: "text-lg font-semibold text-[#43C6AC] whitespace-nowrap",
  originalPrice: "text-gray-400 line-through whitespace-nowrap",
  actualPrice: "text-lg font-semibold text-[#43C6AC] whitespace-nowrap",
  qtyBox: "flex items-center justify-between bg-[#43C6AC]/10 px-4 py-2 rounded-lg whitespace-nowrap",
  qtyBtn: "text-[#43C6AC] hover:text-[#368f7a] cursor-pointer",
  addBtn: "w-full flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] text-black rounded-lg hover:shadow-lg transition-all whitespace-nowrap",
  viewBtnWrapper: "flex justify-center mt-12",
  viewBtn: "group inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[#43C6AC] text-[#43C6AC] hover:bg-[#43C6AC]/10 transition-all whitespace-nowrap",
  viewIcon: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
}




// assets/dummy/dummystyles.js

export const homeAboutStyles = {
  wrapper: "py-20 bg-white relative overflow-hidden",
  bgBlur1: "absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#43C6AC]/20 blur-[100px]",
  bgBlur2: "absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-[#F8FFAE]/20 blur-[100px]",
  container: "container mx-auto px-4 md:px-6 relative z-10",
  aboutGrid: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20",
  imageWrapper: "relative group",
  imageGlow: "absolute -inset-4 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500",
  imageContainer: "relative overflow-hidden rounded-xl border-4 border-[#43C6AC]/40",
  aboutImage: "w-full h-auto rounded-xl transition-transform duration-700 hover:rotate-1",
  aboutHeader: "text-3xl  md:text-4xl font-semibold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent mb-4 ",
  underline: "h-1 w-20 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full",
  aboutText: "text-gray-600 leading-relaxed",
  statGrid: "grid grid-cols-1 md:grid-cols-3 gap-6",
  statCard: "bg-white border-2 border-[#43C6AC]/20 rounded-xl p-4 text-center shadow-lg",
  statIconWrap: "inline-flex items-center justify-center p-3 bg-[#F8FFAE] rounded-full mb-3",
  statIcon: "h-6 w-6 text-[#43C6AC]",
  statValue: "text-2xl font-semibold text-gray-900",
  statLabel: "text-sm text-gray-600",
  aboutButton: "group inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] text-black font-medium shadow-sm hover:shadow-[#43C6AC]/25 transition-all duration-300",
  arrowIcon: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1",
  sectionHeader: "text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent mb-4",
  headerUnderline: "h-1 w-20 mx-auto bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full",
  headerText: "mt-4 text-gray-600 text-center max-w-2xl mx-auto",
  bookGrid: "grid grid-cols-1 md:grid-cols-3 gap-8",
  bookCardWrap: "group relative",
  bookCardGlow: "absolute -inset-0.5 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500",
  bookCard: "relative bg-white border-2 border-[#43C6AC]/20 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-[#43C6AC]/20 h-full flex flex-col",
  bookImageWrapper: "relative h-48 overflow-hidden",
  bookImage: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
  bookContent: "p-5 flex-grow flex flex-col",
  bookTitle: "text-xl font-semibold text-gray-900 mb-1",
  bookAuthor: "text-sm text-[#43C6AC] mb-3",
  bookDesc: "text-gray-600 text-sm mb-4 flex-grow",
  discoverLink: "inline-flex items-center text-[#43C6AC] hover:text-[#368f7a] transition-colors",
  arrowSmall: "ml-1 h-4 w-4"
}



// assets/dummy/dummystyles.js

export const footerStyles = {
  footer: "bg-gray-100 border-t border-[#43C6AC]/20 pt-16 pb-8 relative",
  container: "container mx-auto px-4 md:px-6",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12",
  logoBlock: "space-y-4",
  logoLink: "inline-flex items-center gap-2",
  logoImg: "h-9 w-9 rounded-full",
  logoText: "text-2xl font-semibold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent",
  aboutText: "text-gray-600 text-sm leading-relaxed",
  socialWrap: "flex gap-3",
  socialButton: "flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[#43C6AC]/30 hover:border-[#43C6AC] hover:bg-[#F8FFAE]/20 transition-all duration-300",
  socialIcon: "h-4 w-4 text-[#43C6AC] transition-colors duration-300",
  quickLinksBlock: "space-y-4",
  quickLinksTitle: "text-lg font-semibold text-gray-900 mb-2",
  quickLinksList: "space-y-2.5",
  quickLinkItem: "group inline-flex items-center text-gray-600 hover:text-[#43C6AC] transition-colors duration-300 text-sm",
  quickLinkDot: "w-1.5 h-1.5 bg-[#43C6AC] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
  newsletterBlock: "space-y-4",
  newsletterTitle: "text-lg font-semibold text-gray-900 mb-2",
  newsletterText: "text-gray-600 text-sm leading-relaxed",
  formWrap: "relative",
  input: "w-full px-4 py-2.5 bg-white border border-[#43C6AC]/30 rounded-lg text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#43C6AC]/50 transition-all pr-12",
  button: "absolute right-1 top-1 p-2 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-md text-white hover:scale-105 transform transition-all shadow-sm hover:shadow-[#43C6AC]/30",
  contactBlock: "space-y-4",
  contactTitle: "text-lg font-semibold text-gray-900 mb-2",
  contactList: "space-y-3",
  contactItem: "flex items-start text-gray-600 text-sm",
  contactIcon: "h-4 w-4 text-[#43C6AC] mr-2 mt-1 flex-shrink-0",
  contactRow: "flex items-center text-gray-600 text-sm",
  contactIconInline: "h-4 w-4 text-[#43C6AC] mr-2 flex-shrink-0",
  copyrightWrap: "border-t border-[#43C6AC]/20 pt-6 text-center",
  copyrightText: "text-gray-500 text-sm",
}

//ContactUsPage
export const containerStyle = "min-h-screen pt-24 pb-16 bg-white"

export const toastStyle = (type) =>
  `fixed top-6 right-6 z-50 flex items-center p-4 rounded-lg shadow-md ${type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
  }`

export const headerStyle = "text-center mb-12"

export const contactInfoCardStyle = "lg:col-span-1 bg-gray-50 rounded-xl p-6"
export const sectionHeadingStyle = "text-2xl font-semibold text-gray-800 mb-6"

export const contactItemStyle = "flex items-start space-x-4 bg-white p-2 rounded-lg shadow-sm"

export const contactFormCardStyle = "lg:col-span-2 bg-gray-50 rounded-xl p-6"

export const labelStyle = "block text-sm font-medium text-gray-700"
export const inputWrapperStyle = "relative"
export const inputStyle =
  "w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC]"
export const textareaStyle =
  "w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC]"
export const errorStyle = "text-red-500 text-sm mt-1"

export const submitButtonStyle =
  "w-full px-6 py-3 bg-[#43C6AC] text-white rounded-lg font-medium hover:bg-[#368f7a] transition-colors disabled:opacity-70"
export const sendingStyle = "flex items-center justify-center"
export const sendIconWrapperStyle = "flex items-center justify-center"



// components/styles/dummyStyles.js
const aboutStyles = {
  container: "min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#f0fdfa] pt-24",

  section: "relative py-10 overflow-hidden",
  innerContainer: "container mx-auto px-4 md:px-6",
  headingWrapper: "text-center mb-2 space-y-8",
  heading: "text-3xl md:text-5xl font-semibold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent mb-6 leading-tight",
  underline: "absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full",
  subText: "text-sm md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium",

  statsSection: "py-12 bg-gradient-to-br from-[#43C6AC]/5 via-[#F8FFAE]/5 to-[#43C6AC]/5",
  statCard: "bg-white/95 backdrop-blur-lg rounded-2xl p-5 shadow-xl border border-[#43C6AC]/10 transition-transform hover:-translate-y-1",
  statIconWrapper: "w-12 h-12 rounded-xl bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] flex items-center justify-center mb-4 shadow",
  statValue: "text-3xl font-semibold text-[#2B5876] mb-1",
  statLabel: "text-sm font-medium text-gray-600",

  aboutSection: "py-20",
  aboutImageWrapper: "relative group overflow-hidden rounded-[2.5rem] shadow-2xl",
  aboutImage: "w-full h-auto object-cover transform transition duration-700 group-hover:scale-105",
  aboutOverlay: "absolute inset-0 bg-gradient-to-t from-[#43C6AC]/30 to-transparent",
  aboutCaption: "absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#2B5876]/80 to-transparent",
  aboutTitle: "text-2xl font-semibold text-white",
  aboutSubtitle: "text-gray-200",

  aboutTextSection: "space-y-10",
  aboutHeadingSection: "space-y-6",
  aboutHeading: "text-5xl font-semibold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent",
  aboutParagraph: "text-lg text-gray-700 leading-relaxed",
  aboutBoxGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",
  aboutBox: "p-6 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-[#43C6AC]/10",
  aboutBoxHeading: "text-2xl font-semibold text-[#2B5876] mb-3",
  aboutBoxText: "text-gray-600",

  teamSection: "py-20 bg-gradient-to-br from-[#43C6AC]/5 to-[#F8FFAE]/5",
  sectionTitle: "text-5xl font-semibold bg-gradient-to-r from-[#43C6AC] to-[#2B5876] bg-clip-text text-transparent",
  sectionUnderline: "mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] rounded-full",
  teamCard: "group relative bg-white/95 backdrop-blur-lg rounded-[2rem] p-6 shadow-2xl border border-[#43C6AC]/10 transition-transform hover:-translate-y-3",
  teamImageWrapper: "relative overflow-hidden rounded-2xl mb-6",
  teamImage: "w-full h-80 object-cover transform transition duration-500 group-hover:scale-110",
  teamOverlay: "absolute inset-0 bg-gradient-to-t from-[#43C6AC]/40 to-transparent",
  teamName: "text-2xl font-semibold text-gray-900 mb-1",
  teamPosition: "text-lg text-[#43C6AC] font-medium mb-6",
  socialIcon: "p-2 rounded-full bg-gradient-to-r from-[#43C6AC] to-[#F8FFAE] text-white hover:shadow-lg transition-all hover:scale-110",

  branchSection: "py-20",
  branchCard: "bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-[#43C6AC]/10 transition-transform hover:-translate-y-2",
  branchImageWrapper: "relative h-56 rounded-xl overflow-hidden mb-6",
  branchImage: "w-full h-full object-cover transform transition duration-500 hover:scale-110",
  branchOverlay: "absolute inset-0 bg-gradient-to-t from-[#43C6AC]/30 to-transparent",
  branchInfoWrapper: "space-y-4",
  branchLocationWrapper: "flex items-center space-x-3",
  branchLocation: "text-xl font-semibold text-[#2B5876]",
  branchHours: "flex items-center space-x-3 text-gray-600"
}

export default aboutStyles


// dummyStyles.js
export const booksPageStyles = {
  container: "min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#f8fafc] to-[#f0fdfa]",
  innerContainer: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
  headerWrapper: "text-center mb-12 md:mb-16 space-y-2 md:space-y-4",
  headerTitle: "text-4xl md:text-5xl font-semibold text-transparent pb-2 md:pb-4 bg-clip-text bg-gradient-to-r from-[#1A237E] to-[#43C6AC]",
  headerSubtitle: "text-gray-600 text-base md:text-xl max-w-3xl mx-auto px-2",
  searchWrapper: "mb-8 md:mb-12 space-y-4 md:space-y-6",
  searchInputWrapper: "relative group",
  searchIconWrapper: "absolute top-0 bottom-0 left-0 flex items-center pl-4 md:pl-5",
  searchInput: "w-full pl-12 md:pl-16 pr-4 md:pr-6 py-3 md:py-4 bg-white/90 backdrop-blur-sm border-0 rounded-xl md:rounded-2xl shadow-md md:shadow-lg focus:ring-2 focus:ring-[#43C6AC]/30 text-base md:text-lg placeholder-gray-400 text-gray-700 transition-all",
  filterRow: "flex flex-col md:flex-row gap-3 md:gap-4 justify-between",
  selectGroup: "flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto",
  selectBox: "w-full md:w-auto px-4 md:px-5 py-2 md:py-3 bg-white/90 backdrop-blur-sm border-0 rounded-lg md:rounded-xl shadow-md md:shadow-lg text-gray-700 focus:ring-2 focus:ring-[#43C6AC]/30 text-sm md:text-base",
  resultText: "text-gray-600 text-sm md:text-base text-center md:text-left mt-2 md:mt-0",
  booksGrid: "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
  bookCard: "group bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
  imageWrapper: "relative aspect-square mb-4 md:mb-6 overflow-hidden rounded-lg md:rounded-xl",
  imageStyle: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300",
  title: "text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2",
  author: "text-sm text-gray-500 mb-2 md:mb-3",
  ratingWrapper: "flex items-center gap-1 text-yellow-400 text-sm mb-2 md:mb-3",
  description: "text-sm text-gray-600 mb-4",
  priceCartWrapper: "flex items-center justify-between mt-auto",
  price: "text-base md:text-lg font-semibold text-[#1A237E]",
  cartButtons: "flex cursor-pointer items-center gap-1 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-gradient-to-r from-[#1A237E] to-[#43C6AC] text-white rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:shadow-md hover:scale-[1.02] transition-all"
};



export const contactPageStyles = {
  containerStyle: "py-16 pt-24 bg-gray-50 min-h-screen relative",
  toastStyle: (type) =>
    `fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-md text-white flex items-center shadow-lg ${type === "success" ? "bg-green-500" : "bg-red-500"
    }`,
  headerStyle: "text-center mb-12",
  contactInfoCardStyle: "bg-white p-6 rounded-lg shadow-lg",
  sectionHeadingStyle: "text-xl font-semibold text-gray-700 mb-6",
  contactItemStyle: "flex items-start space-x-4",
  contactFormCardStyle: "lg:col-span-2 bg-white p-6 rounded-lg shadow-lg",
  labelStyle: "block text-sm font-medium text-gray-700",
  inputWrapperStyle: "relative",
  inputStyle:
    "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-700",
  errorStyle: "text-sm text-red-500 mt-1",
  textareaStyle:
    "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-700 resize-none",
  submitButtonStyle:
    "w-full flex justify-center items-center bg-[#43C6AC] hover:bg-[#36b39f] text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  sendingStyle: "flex items-center",
  sendIconWrapperStyle: "flex items-center",
};

export const styles = {
  container: "min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8",
  wrapper: "max-w-6xl mx-auto",
  header: "mb-8 md:mb-12 text-center",
  title: "text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-2 md:mb-3 flex items-center justify-center gap-2 md:gap-3",
  titleIcon: "h-7 w-7 md:h-9 md:w-9 text-emerald-600",
  subtitle: "text-gray-600 text-sm md:text-base lg:text-lg",
  emptyCard: "max-w-md mx-auto bg-white rounded-xl md:rounded-2xl p-6 md:p-8 text-center shadow-sm border border-gray-100",
  emptyIconWrapper: "flex justify-center mb-4 md:mb-6",
  emptyIcon: "h-12 w-12 md:h-16 md:w-16 text-emerald-600",
  emptyTitle: "text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4",
  emptyDescription: "text-gray-600 text-sm md:text-base mb-6 md:mb-8",
  browseBtn: "inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors gap-2 text-sm md:text-base",
  browseIcon: "h-4 w-4 md:h-5 md:w-5",
  cartGrid: "grid lg:grid-cols-3 gap-6 md:gap-8",
  cartItems: "lg:col-span-2 space-y-4 md:space-y-6",
  cartItemCard: "bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow",
  cartItemContent: "flex gap-4 md:gap-6",
  cartItemImage: "w-16 h-20 md:w-24 md:h-32 object-cover rounded-md md:rounded-lg border border-gray-200",
  cartItemTop: "flex justify-between items-start",
  itemTitle: "text-base md:text-lg font-semibold text-gray-900 mb-1",
  itemAuthor: "text-gray-600 text-xs md:text-sm mb-2 md:mb-3",
  removeBtn: "text-gray-400 hover:text-red-600 transition-colors p-1",
  removeIcon: "h-4 w-4 md:h-5 md:w-5",
  quantityPriceWrapper: "flex items-center justify-between flex-wrap gap-3 md:gap-4",
  quantityControls: "flex items-center gap-3 md:gap-4",
  quantityBox: "flex items-center bg-gray-50 rounded-md md:rounded-lg px-2 py-1 md:px-3 md:py-1.5",
  qBtn: "text-gray-500 hover:text-emerald-600 transition-colors p-1",
  qIcon: "h-3 w-3 md:h-4 md:w-4",
  quantityValue: "mx-2 md:mx-3 text-gray-900 font-medium w-6 text-center text-sm md:text-base",
  itemTotal: "text-base md:text-lg font-semibold text-gray-900",
  pricePerItem: "text-gray-600 text-xs md:text-sm",
  summaryCard: "bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 h-fit lg:sticky lg:top-6",
  summaryTitle: "text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6",
  summaryBreakdown: "space-y-3 md:space-y-4 mb-6 md:mb-8",
  summaryRow: "flex justify-between",
  summaryLabel: "text-gray-600 text-sm md:text-base",
  summaryValue: "text-gray-900 font-medium text-sm md:text-base",
  summaryShipping: "text-emerald-600 font-medium text-sm md:text-base",
  summaryTotalSection: "border-t border-gray-200 pt-4 md:pt-6 mb-6 md:mb-8",
  totalRow: "flex justify-between items-center",
  totalLabel: "text-base md:text-lg font-semibold text-gray-900",
  totalAmount: "text-xl md:text-2xl font-semibold text-emerald-600",
  checkoutBtn: "w-full flex items-center justify-center gap-2 px-5 py-3 md:px-6 md:py-4 bg-gradient-to-r from-[#2B5876] to-[#43C6AC] text-white rounded-lg md:rounded-xl font-semibold hover:opacity-90 transition-opacity text-sm md:text-base mb-3 md:mb-4",
  checkoutIcon: "h-4 w-4 md:h-5 md:w-5",
  continueBtn: "w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base",
  continueIcon: "h-4 w-4 md:h-5 md:w-5"
}

export const Signup = {
  container: "min-h-screen flex items-center justify-center bg-gray-50 p-2 sm:p-3",
  toastBase: "fixed top-3 right-3 p-2 rounded-md text-xs",
  toastSuccess: "bg-green-100 text-green-700",
  toastError: "bg-red-100 text-red-700",
  card: "w-full max-w-[340px] sm:max-w-xs bg-white rounded-lg shadow-sm p-4 sm:p-5 text-center",
  backLink: "flex items-center justify-center gap-1 text-gray-600 mb-4 text-xs sm:text-sm",
  iconContainer: "mx-auto mb-2 bg-gray-100 w-fit p-2 rounded-full",
  heading: "text-lg sm:text-xl font-semibold text-gray-800",
  subtext: "text-xs sm:text-sm text-gray-600 mt-1",
  form: "space-y-2 sm:space-y-3 text-left",
  label: "block text-xs sm:text-sm text-gray-700 mb-1",
  inputWrapper: "relative",
  input: "w-full pl-8 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-xs sm:text-sm text-gray-800 placeholder-gray-400",
  passwordInput: "w-full pl-8 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-xs sm:text-sm text-gray-800 placeholder-gray-400",
  togglePassword: "absolute right-2 top-2.5 text-gray-400",
  submitBtn: "w-full bg-[#43C6AC] text-white py-2 rounded-lg hover:bg-[#368f7a] transition-colors text-xs sm:text-sm",
  footerText: "mt-3 text-center text-xs sm:text-sm text-gray-600",
  link: "text-[#43C6AC] hover:underline ml-1",
  iconLeft: "absolute left-2 top-2.5 h-4 w-4 text-gray-400 ",
};



// dummyStyles.js
export const loginStyles = {
  container: "min-h-screen flex items-center justify-center bg-gray-50 p-1 overflow-hidden",
  toast: (type) =>
    `fixed top-2 right-2 p-2 text-sm rounded-md ${type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }`,
  card: "w-full max-w-sm bg-white rounded-md shadow-sm p-5",
  backLink: "flex items-center text-sm text-gray-600 mb-4",
  iconCircle: "mx-auto mb-3 bg-gray-100 w-fit p-2 rounded-full",
  heading: "text-xl font-semibold text-gray-800 mb-1",
  subheading: "text-sm text-gray-600",
  form: "space-y-3",
  label: "block text-sm text-gray-700 mb-1",
  inputWrapper: "relative",
  input:
    "w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-500",
  passwordInput:
    "w-full pl-9 pr-9 py-2 text-sm border rounded-md focus:ring-1 focus:ring-[#43C6AC] focus:border-[#43C6AC] text-gray-800 placeholder-gray-500",
  togglePassword: "absolute right-2 inset-y-0 m-auto text-gray-400",
  submitButton:
    "w-full bg-[#43C6AC] text-white py-2 text-sm rounded-md hover:bg-[#368f7a] transition-colors",
  footerText: "mt-4 text-center text-sm text-gray-600",
  footerLink: "text-[#43C6AC] hover:underline",
};

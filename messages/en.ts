import type { Dict } from "./tr";

// tr sözlüğü şemadır; buradaki anahtarlar birebir aynı olmak zorunda.
const en: Dict = {
  locale: "en",
  nav: {
    home: "Home",
    rooms: "Rooms",
    gallery: "Gallery",
    location: "Location",
    about: "About",
    faq: "FAQ",
    contact: "Contact",
    reserve: "Book a Room",
    menu: "Menu",
    close: "Close",
  },
  cta: {
    reserve: "Book a Room",
    call: "Call Now",
    whatsapp: "Message on WhatsApp",
    directions: "Get Directions",
    openMap: "Open in Maps",
    viewRooms: "See the Rooms",
    viewGallery: "See the Gallery",
    allPhotos: "All Photos",
    more: "More",
    back: "Back",
    send: "Send",
  },
  labels: {
    capacity: "Capacity",
    features: "Features",
    building: "Building",
    phone: "Phone",
    email: "Email",
    address: "Address",
    minutes: "min",
    inRoom: "In the room",
    inFlat: "In the flat",
  },
  footer: {
    tagline: "A home in the very centre of Eskişehir, right across from Espark.",
    quickLinks: "Quick Links",
    contactUs: "Get in Touch",
    ourBuildings: "Our Buildings",
    rights: "All rights reserved.",
    kvkk: "Privacy Notice",
  },
  a11y: {
    skipToContent: "Skip to content",
    scrollDown: "Scroll down",
    changeLanguage: "Change language",
    openGallery: "Open gallery",
    previous: "Previous",
    next: "Next",
    newTab: "opens in a new tab",
  },
};

export default en;

export const siteConfig = {
  name: "SUPER Chris Pies and Pastries",
  shortName: "SUPER Chris Pies",
  tagline: "Super fresh pies. Pastries made with love.",
  oneLiner:
    "Kenyan bakery specialising in pies, pastries, custom cakes and hands-on baking classes. Order easily on WhatsApp or come learn the craft.",
  email: "superchrispiesandpastries@gmail.com",
  phone: "0710832150",
  whatsappNumber: "254710832150",
  whatsappDisplay: "+254 710 832 150",
  location: "Nairobi, Kenya",
  serviceArea: "Serving Nairobi and surrounding areas across Kenya",
  locales: ["en", "sw"] as const,
  defaultLocale: "en" as const,
  cookieConsentKey: "super-chris-pies-cookie-consent",
  driveMenuUrl:
    process.env.NEXT_PUBLIC_DRIVE_MENU_URL ||
    "https://drive.google.com/drive/folders/your-menu-folder",
  driveClassesUrl:
    process.env.NEXT_PUBLIC_DRIVE_CLASSES_URL ||
    "https://drive.google.com/drive/folders/your-classes-folder",
  driveGalleryUrl:
    process.env.NEXT_PUBLIC_DRIVE_GALLERY_URL ||
    "https://drive.google.com/drive/folders/your-gallery-folder",
};

export const whatsappUrl = (message: string) => {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.whatsappNumber;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

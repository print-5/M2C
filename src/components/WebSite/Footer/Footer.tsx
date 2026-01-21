import NewsletterSection from "./NewsletterSection";
import MainFooterContent from "./MainFooterContent";
import BottomBar from "./BottomBar";

const Footer = () => {
  return (
    <footer className="font-sans">
      <NewsletterSection />
      <MainFooterContent />
      <BottomBar />
    </footer>
  );
};

export default Footer;

import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href="/" className="flex gap-3 items-center justify-center" aria-label="Home">
          <Image src="/softylinesLogo.webp" width={50} height={50} alt="SoftyLines Logo" />
          <Image src="/logo.webp" width={200} height={200} alt="Company Logo" className="translate-y-2" />
        </Link>

        {/* Desktop Nav */}
        {/* <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button>Hire me</Button>
          </Link>
        </div> */}

        {/* Mobile Nav */}
        {/* <div className="xl:hidden">
          <MobileNav />
        </div> */}
      </div>
    </header>
  );
};

export default Header;

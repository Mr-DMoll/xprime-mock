import Navbar from "../components/Navbar/Navbar";
import MediumScreenNavBar from "../components/Navbar/MediumScreenNavBar";
import BottomNavbar from "../components/Navbar/BottomNavbar";
import Footer from "../components/Shared/Footer";

export default function MainLayout({ children }) {
  return (
    <div className='bg-black text-white min-h-screen flex flex-col'>
      <Navbar />
      <MediumScreenNavBar />
      <main className='flex-1'>{children}</main>
      <Footer />
      <BottomNavbar />
    </div>
  );
}

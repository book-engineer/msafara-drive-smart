import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import VehicleMarketplace from "@/components/VehicleMarketplace";
import IoTDashboard from "@/components/IoTDashboard";
import PayAsYouSaveSection from "@/components/PayAsYouSaveSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <HeroSection />
      <VehicleMarketplace />
      <IoTDashboard />
      <PayAsYouSaveSection />
    </div>
  );
};

export default Index;

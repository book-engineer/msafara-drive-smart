import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MapPin, 
  Battery, 
  Zap, 
  Clock, 
  Star,
  Heart,
  Share
} from "lucide-react";
import { useState } from "react";

const VehicleMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const vehicles = [
    {
      id: 1,
      name: "Urban E-Bike Pro",
      type: "E-Bike",
      price: 1200,
      monthlyPays: 45,
      location: "Nairobi, Kenya",
      batteryRange: "80km",
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg",
      isNew: true,
      iotFeatures: ["GPS Tracking", "Remote Lock", "Battery Monitor"],
      financing: {
        downPayment: 0,
        payPerKm: 0.15,
        totalPayments: 1680
      }
    },
    {
      id: 2,
      name: "Cargo E-Tuktuk",
      type: "E-Tuktuk", 
      price: 4500,
      monthlyPays: 165,
      location: "Lagos, Nigeria",
      batteryRange: "120km",
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg",
      isNew: false,
      iotFeatures: ["Fleet Management", "Tamper Detection", "Usage Analytics"],
      financing: {
        downPayment: 0,
        payPerKm: 0.25,
        totalPayments: 6300
      }
    },
    {
      id: 3,
      name: "City Commuter E-Bike",
      type: "E-Bike",
      price: 800,
      monthlyPays: 32,
      location: "Accra, Ghana",
      batteryRange: "60km",
      rating: 4.9,
      reviews: 67,
      image: "/placeholder.svg",
      isNew: true,
      iotFeatures: ["Smart Lock", "Route Optimization", "Health Tracking"],
      financing: {
        downPayment: 0,
        payPerKm: 0.12,
        totalPayments: 1120
      }
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           vehicle.type.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="marketplace" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Vehicle Marketplace
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our IoT-enabled electric vehicles with transparent Pay-As-You-Save financing
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search vehicles or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Vehicle Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vehicles</SelectItem>
              <SelectItem value="e-bike">E-Bikes</SelectItem>
              <SelectItem value="e-tuktuk">E-Tuktuks</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <Card key={vehicle.id} className="bg-gradient-card shadow-card hover:shadow-primary transition-all duration-300 group">
              <CardHeader className="relative">
                {vehicle.isNew && (
                  <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                    New
                  </Badge>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {vehicle.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                    {vehicle.rating} ({vehicle.reviews})
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Battery Range */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Battery className="w-4 h-4 mr-2 text-iot-active" />
                    <span className="text-sm">Range</span>
                  </div>
                  <span className="font-semibold">{vehicle.batteryRange}</span>
                </div>

                {/* IoT Features */}
                <div className="space-y-2">
                  <span className="text-sm font-medium">IoT Features:</span>
                  <div className="flex flex-wrap gap-1">
                    {vehicle.iotFeatures.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Financing */}
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <div className="text-sm font-medium">Pay-As-You-Save Financing:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Monthly:</span>
                      <div className="font-semibold">${vehicle.monthlyPays}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Per km:</span>
                      <div className="font-semibold">${vehicle.financing.payPerKm}</div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <div className="flex justify-between items-center w-full">
                  <div>
                    <span className="text-2xl font-bold">${vehicle.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">or</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">${vehicle.monthlyPays}/mo</div>
                    <div className="text-xs text-muted-foreground">No down payment</div>
                  </div>
                </div>
                <Button className="w-full" variant="hero">
                  <Clock className="w-4 h-4 mr-2" />
                  Start PAYS Journey
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleMarketplace;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Fuel,
  Zap
} from "lucide-react";
import { useState } from "react";

const PayAsYouSaveSection = () => {
  const [dailyKm, setDailyKm] = useState([25]);
  const [monthlyFuelCost, setMonthlyFuelCost] = useState(120);
  const [vehiclePrice, setVehiclePrice] = useState(1200);

  // Calculations
  const monthlyKm = dailyKm[0] * 30;
  const payPerKm = 0.15;
  const monthlyPayment = monthlyKm * payPerKm;
  const monthlySavings = monthlyFuelCost - monthlyPayment;
  const totalMonths = Math.ceil(vehiclePrice / monthlyPayment);
  const totalCost = monthlyPayment * totalMonths;
  const totalSavings = (monthlyFuelCost * totalMonths) - totalCost;

  const benefits = [
    "No upfront payment required",
    "Own the vehicle after completion",
    "Real-time usage tracking",
    "Flexible payment structure",
    "IoT-secured asset protection",
    "Performance-based pricing"
  ];

  const comparisonData = [
    {
      metric: "Monthly Cost",
      traditional: `$${monthlyFuelCost}`,
      pays: `$${monthlyPayment.toFixed(2)}`,
      savings: `$${monthlySavings.toFixed(2)}`
    },
    {
      metric: "Total Ownership Time",
      traditional: "Never Own",
      pays: `${totalMonths} months`,
      savings: "Asset Ownership"
    },
    {
      metric: "Long-term Savings",
      traditional: "$0",
      pays: `$${totalSavings.toFixed(0)}`,
      savings: `${((totalSavings / (monthlyFuelCost * totalMonths)) * 100).toFixed(1)}%`
    }
  ];

  return (
    <section id="financing" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Pay-As-You-Save Financing
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Revolutionary financing that lets you save money while owning your vehicle. 
            Pay based on usage, own the asset, reduce costs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Calculator */}
          <Card className="bg-gradient-card shadow-primary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-primary" />
                PAYS Calculator
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Calculate your savings with Pay-As-You-Save financing
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Daily KM Input */}
              <div className="space-y-3">
                <Label>Daily Distance (km)</Label>
                <div className="px-3">
                  <Slider
                    value={dailyKm}
                    onValueChange={setDailyKm}
                    max={100}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>5 km</span>
                  <span className="font-medium">{dailyKm[0]} km/day</span>
                  <span>100 km</span>
                </div>
              </div>

              {/* Monthly Fuel Cost */}
              <div className="space-y-2">
                <Label htmlFor="fuelCost">Current Monthly Fuel Cost ($)</Label>
                <Input
                  id="fuelCost"
                  type="number"
                  value={monthlyFuelCost}
                  onChange={(e) => setMonthlyFuelCost(Number(e.target.value))}
                  placeholder="120"
                />
              </div>

              {/* Vehicle Price */}
              <div className="space-y-2">
                <Label htmlFor="vehiclePrice">Vehicle Price ($)</Label>
                <Input
                  id="vehiclePrice"
                  type="number"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  placeholder="1200"
                />
              </div>

              {/* Results */}
              <div className="bg-primary/5 rounded-lg p-4 space-y-3 border border-primary/20">
                <h3 className="font-semibold text-primary">Your PAYS Plan</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Payment</p>
                    <p className="text-xl font-bold text-primary">${monthlyPayment.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Savings</p>
                    <p className="text-xl font-bold text-secondary">${monthlySavings.toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ownership Time</p>
                    <p className="text-lg font-semibold">{totalMonths} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Savings</p>
                    <p className="text-lg font-semibold text-secondary">${totalSavings.toFixed(0)}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-primary/20">
                  <p className="text-xs text-muted-foreground">
                    Rate: ${payPerKm}/km • Monthly Distance: {monthlyKm} km
                  </p>
                </div>
              </div>

              <Button className="w-full" variant="hero">
                Start Your PAYS Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Benefits & Comparison */}
          <div className="space-y-6">
            {/* How It Works */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-secondary" />
                  How PAYS Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Choose Your Vehicle</h4>
                      <p className="text-sm text-muted-foreground">Select from our IoT-enabled e-bikes and e-tuktuks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Pay Per Kilometer</h4>
                      <p className="text-sm text-muted-foreground">Transparent pricing based on actual usage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-secondary">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Own the Asset</h4>
                      <p className="text-sm text-muted-foreground">Vehicle becomes yours after completing payments</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-secondary" />
                  PAYS Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparison Table */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2 text-iot-active" />
                  Traditional vs PAYS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comparisonData.map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 py-3 border-b border-border/50 last:border-0">
                      <div className="font-medium text-sm">{item.metric}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Fuel className="w-3 h-3 mr-1" />
                        {item.traditional}
                      </div>
                      <div className="text-sm text-primary flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        {item.pays}
                      </div>
                      <div className="text-sm text-secondary font-medium">
                        {item.savings}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayAsYouSaveSection;
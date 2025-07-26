import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Car, 
  MapPin, 
  DollarSign, 
  Leaf, 
  TrendingUp 
} from 'lucide-react';

interface MetricsGridProps {
  metrics: {
    totalRides: number;
    totalDistance: number;
    totalSavings: number;
    co2Saved: number;
  };
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-white/10 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
          <Car className="h-4 w-4 text-electric-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalRides.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            Real-time updates
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/10 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Distance Traveled</CardTitle>
          <MapPin className="h-4 w-4 text-eco-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalDistance.toLocaleString()} km</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            Live tracking
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/10 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
          <DollarSign className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.totalSavings.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            Real-time savings
          </p>
        </CardContent>
      </Card>

      <Card className="border-white/10 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
          <Leaf className="h-4 w-4 text-eco-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.co2Saved} tons</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            Environmental impact
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
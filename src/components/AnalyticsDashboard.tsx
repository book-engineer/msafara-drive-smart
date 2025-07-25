import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Battery, 
  MapPin, 
  DollarSign, 
  Leaf, 
  Clock, 
  TrendingUp,
  Users,
  Car,
  Zap,
  Shield
} from 'lucide-react';

interface AnalyticsData {
  totalRides: number;
  totalDistance: number;
  totalSavings: number;
  co2Saved: number;
  activeVehicles: number;
  totalUsers: number;
  averageBatteryHealth: number;
  paymentCompliance: number;
}

const mockRideData = [
  { date: '2024-01-01', rides: 45, distance: 320, savings: 85 },
  { date: '2024-01-02', rides: 52, distance: 380, savings: 95 },
  { date: '2024-01-03', rides: 38, distance: 290, savings: 75 },
  { date: '2024-01-04', rides: 61, distance: 420, savings: 110 },
  { date: '2024-01-05', rides: 48, distance: 350, savings: 90 },
  { date: '2024-01-06', rides: 55, distance: 410, savings: 105 },
  { date: '2024-01-07', rides: 43, distance: 310, savings: 80 },
];

const vehicleTypeData = [
  { name: 'E-Bikes', value: 65, color: '#0ea5e9' },
  { name: 'E-Tuktuks', value: 35, color: '#10b981' }
];

const batteryHealthData = [
  { vehicle: 'EcoBike Pro', health: 92, status: 'Excellent' },
  { vehicle: 'CityRider', health: 87, status: 'Good' },
  { vehicle: 'CargoTuk Pro', health: 94, status: 'Excellent' },
  { vehicle: 'UrbanTuk', health: 78, status: 'Fair' },
  { vehicle: 'DeliveryBike Max', health: 89, status: 'Good' },
];

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalRides: 1247,
    totalDistance: 8945,
    totalSavings: 2340,
    co2Saved: 1.8,
    activeVehicles: 24,
    totalUsers: 156,
    averageBatteryHealth: 88,
    paymentCompliance: 94
  });

  const [alertsData, setAlertsData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
    fetchAlerts();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch real analytics data from Supabase
      const { data: purchases } = await supabase
        .from('purchases')
        .select('*');
      
      const { data: rideAnalytics } = await supabase
        .from('ride_analytics')
        .select('*');

      const { data: vehicles } = await supabase
        .from('vehicles')
        .select('*');

      // Update analytics with real data if available
      if (purchases && rideAnalytics && vehicles) {
        const totalDistance = rideAnalytics.reduce((sum, ride) => sum + Number(ride.distance_km || 0), 0);
        const totalSavings = rideAnalytics.reduce((sum, ride) => sum + Number(ride.fuel_cost_saved || 0), 0);
        const co2Saved = rideAnalytics.reduce((sum, ride) => sum + Number(ride.co2_saved || 0), 0);

        setAnalyticsData(prev => ({
          ...prev,
          totalRides: rideAnalytics.length,
          totalDistance: Math.round(totalDistance),
          totalSavings: Math.round(totalSavings),
          co2Saved: Number((co2Saved / 1000).toFixed(1)), // Convert to tons
          activeVehicles: vehicles.length,
        }));
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const { data } = await supabase
        .from('power_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (data) {
        setAlertsData(data);
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-electric-blue to-eco-green bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time insights into your IoT mobility platform
          </p>
        </div>
        <Badge variant="outline" className="bg-eco-green/10 border-eco-green/30">
          Live Data
        </Badge>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
            <Car className="h-4 w-4 text-electric-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalRides.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distance Traveled</CardTitle>
            <MapPin className="h-4 w-4 text-eco-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalDistance.toLocaleString()} km</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsData.totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/10 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <Leaf className="h-4 w-4 text-eco-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.co2Saved} tons</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +22% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
          <TabsTrigger value="payments">Pay-As-You-Save</TabsTrigger>
          <TabsTrigger value="iot">IoT Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Ride Analytics</CardTitle>
                <CardDescription>Daily ride patterns and usage trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockRideData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rides" 
                      stroke="hsl(var(--electric-blue))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--electric-blue))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Vehicle Distribution</CardTitle>
                <CardDescription>Active fleet composition</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={vehicleTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {vehicleTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
                <Zap className="h-4 w-4 text-electric-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.activeVehicles}</div>
                <Progress value={85} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">85% operational</p>
              </CardContent>
            </Card>

            <Card className="border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-eco-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.totalUsers}</div>
                <Progress value={78} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">78% active this month</p>
              </CardContent>
            </Card>

            <Card className="border-white/10 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Compliance</CardTitle>
                <Shield className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.paymentCompliance}%</div>
                <Progress value={analyticsData.paymentCompliance} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Excellent compliance rate</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-4">
          <Card className="border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Battery Health Monitoring</CardTitle>
              <CardDescription>Real-time battery status across your fleet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {batteryHealthData.map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-white/10">
                    <div className="flex items-center space-x-3">
                      <Battery className="h-5 w-5 text-electric-blue" />
                      <div>
                        <p className="font-medium">{vehicle.vehicle}</p>
                        <p className="text-sm text-muted-foreground">{vehicle.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={vehicle.health} className="w-24" />
                      <span className="text-sm font-medium">{vehicle.health}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card className="border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Pay-As-You-Save Analytics</CardTitle>
              <CardDescription>Revenue and payment tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockRideData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="savings" fill="hsl(var(--eco-green))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="iot" className="space-y-4">
          <Card className="border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>IoT Device Status</CardTitle>
              <CardDescription>Real-time monitoring of connected devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">GPS Tracking</span>
                    <Badge variant="secondary" className="bg-eco-green/20 text-eco-green">Online</Badge>
                  </div>
                  <p className="text-2xl font-bold">24/24</p>
                  <p className="text-xs text-muted-foreground">Devices connected</p>
                </div>
                
                <div className="p-4 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Remote Locking</span>
                    <Badge variant="secondary" className="bg-electric-blue/20 text-electric-blue">Active</Badge>
                  </div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs text-muted-foreground">System uptime</p>
                </div>
                
                <div className="p-4 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Tamper Detection</span>
                    <Badge variant="secondary" className="bg-amber-500/20 text-amber-500">Monitoring</Badge>
                  </div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground">Alerts today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {alertsData.length > 0 && (
            <Card className="border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recent System Alerts</CardTitle>
                <CardDescription>Latest IoT monitoring alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertsData.map((alert: any, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-white/10">
                      <div>
                        <p className="font-medium">{alert.alert_message}</p>
                        <p className="text-sm text-muted-foreground">
                          Grid: {alert.grid_state} | Battery: {alert.battery_level}%
                        </p>
                      </div>
                      <Badge variant={alert.acknowledged ? "secondary" : "destructive"}>
                        {alert.acknowledged ? "Resolved" : "Active"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
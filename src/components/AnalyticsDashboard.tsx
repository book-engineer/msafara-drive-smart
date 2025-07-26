import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import MetricsGrid from './dashboard/MetricsGrid';
import RealTimeCharts from './dashboard/RealTimeCharts';
import StatusCards from './dashboard/StatusCards';
import IoTMonitoring from './dashboard/IoTMonitoring';
import PayAsYouSaveChart from './dashboard/PayAsYouSaveChart';

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
    setupRealTimeSubscriptions();
  }, []);

  const setupRealTimeSubscriptions = () => {
    // Subscribe to ride analytics changes
    const rideAnalyticsChannel = supabase
      .channel('ride-analytics-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'ride_analytics'
      }, () => {
        fetchAnalytics();
      })
      .subscribe();

    // Subscribe to power alerts changes
    const alertsChannel = supabase
      .channel('power-alerts-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'power_alerts'
      }, () => {
        fetchAlerts();
      })
      .subscribe();

    // Subscribe to vehicles changes
    const vehiclesChannel = supabase
      .channel('vehicles-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'vehicles'
      }, () => {
        fetchAnalytics();
      })
      .subscribe();

    // Subscribe to purchases changes
    const purchasesChannel = supabase
      .channel('purchases-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'purchases'
      }, () => {
        fetchAnalytics();
      })
      .subscribe();

    // Cleanup function
    return () => {
      supabase.removeChannel(rideAnalyticsChannel);
      supabase.removeChannel(alertsChannel);
      supabase.removeChannel(vehiclesChannel);
      supabase.removeChannel(purchasesChannel);
    };
  };

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
            Real-Time Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Live insights into your IoT mobility platform with real-time updates
          </p>
        </div>
        <Badge variant="outline" className="bg-eco-green/10 border-eco-green/30 animate-pulse">
          🔴 Live Data
        </Badge>
      </div>

      {/* Key Metrics Grid */}
      <MetricsGrid 
        metrics={{
          totalRides: analyticsData.totalRides,
          totalDistance: analyticsData.totalDistance,
          totalSavings: analyticsData.totalSavings,
          co2Saved: analyticsData.co2Saved
        }}
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
          <TabsTrigger value="payments">Pay-As-You-Save</TabsTrigger>
          <TabsTrigger value="iot">IoT Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <RealTimeCharts 
            rideData={mockRideData}
            vehicleTypeData={vehicleTypeData}
          />
          
          <StatusCards 
            activeVehicles={analyticsData.activeVehicles}
            totalUsers={analyticsData.totalUsers}
            paymentCompliance={analyticsData.paymentCompliance}
          />
        </TabsContent>

        <TabsContent value="fleet" className="space-y-4">
          <IoTMonitoring 
            batteryHealthData={batteryHealthData}
            alertsData={alertsData}
          />
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <PayAsYouSaveChart data={mockRideData} />
        </TabsContent>

        <TabsContent value="iot" className="space-y-4">
          <IoTMonitoring 
            batteryHealthData={batteryHealthData}
            alertsData={alertsData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
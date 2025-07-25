import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Battery, 
  Zap, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  Clock,
  DollarSign,
  Wifi,
  Lock
} from "lucide-react";
import iotDashboard from "@/assets/iot-dashboard.jpg";

const IoTDashboard = () => {
  const vehicleStats = {
    totalVehicles: 1247,
    activeVehicles: 1089,
    onlineVehicles: 1067,
    alertsCount: 3
  };

  const recentActivity = [
    {
      id: 1,
      vehicle: "E-Bike #1089",
      event: "Payment received",
      amount: "$15.50",
      time: "2 min ago",
      type: "payment"
    },
    {
      id: 2,
      vehicle: "E-Tuktuk #2045",
      event: "Battery low warning",
      location: "Nairobi Central",
      time: "5 min ago",
      type: "alert"
    },
    {
      id: 3,
      vehicle: "E-Bike #3021",
      event: "Trip completed",
      distance: "12.5 km",
      time: "8 min ago",
      type: "trip"
    }
  ];

  const vehicleAlerts = [
    {
      id: 1,
      vehicle: "E-Tuktuk #2045",
      type: "Battery Low",
      severity: "warning",
      location: "Nairobi Central"
    },
    {
      id: 2,
      vehicle: "E-Bike #1234",
      type: "Maintenance Due",
      severity: "info",
      location: "Lagos Island"
    },
    {
      id: 3,
      vehicle: "E-Bike #5678",
      type: "Payment Overdue",
      severity: "danger",
      location: "Accra Downtown"
    }
  ];

  return (
    <section id="dashboard" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              IoT Fleet Dashboard
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time monitoring and management of your connected vehicle fleet
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Vehicles</p>
                  <p className="text-2xl font-bold">{vehicleStats.totalVehicles}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Vehicles</p>
                  <p className="text-2xl font-bold text-iot-active">{vehicleStats.activeVehicles}</p>
                </div>
                <div className="w-12 h-12 bg-iot-active/10 rounded-lg flex items-center justify-center">
                  <Battery className="w-6 h-6 text-iot-active" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Online Now</p>
                  <p className="text-2xl font-bold text-iot-info">{vehicleStats.onlineVehicles}</p>
                </div>
                <div className="w-12 h-12 bg-iot-info/10 rounded-lg flex items-center justify-center">
                  <Wifi className="w-6 h-6 text-iot-info" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-iot-warning">{vehicleStats.alertsCount}</p>
                </div>
                <div className="w-12 h-12 bg-iot-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-iot-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dashboard View */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fleet Map */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Live Fleet Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg relative overflow-hidden">
                  <img 
                    src={iotDashboard} 
                    alt="IoT Dashboard" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white font-medium">Real-time Vehicle Positions</span>
                      <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                        Live
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-secondary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          activity.type === 'payment' ? 'bg-iot-active/10' :
                          activity.type === 'alert' ? 'bg-iot-warning/10' :
                          'bg-iot-info/10'
                        }`}>
                          {activity.type === 'payment' && <DollarSign className="w-4 h-4 text-iot-active" />}
                          {activity.type === 'alert' && <AlertTriangle className="w-4 h-4 text-iot-warning" />}
                          {activity.type === 'trip' && <TrendingUp className="w-4 h-4 text-iot-info" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{activity.vehicle}</p>
                          <p className="text-xs text-muted-foreground">{activity.event}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          {activity.amount || activity.distance || activity.location}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vehicle Alerts */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-iot-warning" />
                  Vehicle Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vehicleAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{alert.vehicle}</span>
                        <Badge 
                          variant="outline"
                          className={
                            alert.severity === 'danger' ? 'border-iot-danger text-iot-danger' :
                            alert.severity === 'warning' ? 'border-iot-warning text-iot-warning' :
                            'border-iot-info text-iot-info'
                          }
                        >
                          {alert.type}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {alert.location}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="iot" className="w-full">
                  <Lock className="w-4 h-4 mr-2" />
                  Remote Lock Vehicle
                </Button>
                <Button variant="outline" className="w-full">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Send Alert
                </Button>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>Fleet Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Vehicle Utilization</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Payment Success Rate</span>
                    <span>98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Fleet Uptime</span>
                    <span>99.2%</span>
                  </div>
                  <Progress value={99.2} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IoTDashboard;
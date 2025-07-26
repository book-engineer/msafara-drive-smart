import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Battery } from 'lucide-react';

interface IoTMonitoringProps {
  batteryHealthData: Array<{
    vehicle: string;
    health: number;
    status: string;
  }>;
  alertsData: Array<{
    id: string;
    alert_message: string;
    grid_state: string;
    battery_level: number;
    acknowledged: boolean;
    created_at: string;
  }>;
}

export default function IoTMonitoring({ batteryHealthData, alertsData }: IoTMonitoringProps) {
  return (
    <div className="space-y-4">
      <Card className="border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Real-Time IoT Device Status</CardTitle>
          <CardDescription>Live monitoring of connected devices</CardDescription>
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
              <p className="text-2xl font-bold">{alertsData.filter(alert => !alert.acknowledged).length}</p>
              <p className="text-xs text-muted-foreground">Active alerts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Live Battery Health Monitoring</CardTitle>
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

      {alertsData.length > 0 && (
        <Card className="border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Live System Alerts</CardTitle>
            <CardDescription>Real-time IoT monitoring alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alertsData.slice(0, 5).map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-white/10">
                  <div>
                    <p className="font-medium">{alert.alert_message}</p>
                    <p className="text-sm text-muted-foreground">
                      Grid: {alert.grid_state} | Battery: {alert.battery_level}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(alert.created_at).toLocaleString()}
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
    </div>
  );
}
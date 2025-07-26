import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Users, Shield } from 'lucide-react';

interface StatusCardsProps {
  activeVehicles: number;
  totalUsers: number;
  paymentCompliance: number;
}

export default function StatusCards({ activeVehicles, totalUsers, paymentCompliance }: StatusCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-white/10 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
          <Zap className="h-4 w-4 text-electric-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeVehicles}</div>
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
          <div className="text-2xl font-bold">{totalUsers}</div>
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
          <div className="text-2xl font-bold">{paymentCompliance}%</div>
          <Progress value={paymentCompliance} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">Real-time compliance</p>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface RealTimeChartsProps {
  rideData: Array<{
    date: string;
    rides: number;
    distance: number;
    savings: number;
  }>;
  vehicleTypeData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export default function RealTimeCharts({ rideData, vehicleTypeData }: RealTimeChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Live Ride Analytics</CardTitle>
          <CardDescription>Real-time ride patterns and usage trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rideData}>
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
          <CardTitle>Live Fleet Distribution</CardTitle>
          <CardDescription>Real-time active fleet composition</CardDescription>
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
  );
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface PayAsYouSaveChartProps {
  data: Array<{
    date: string;
    rides: number;
    distance: number;
    savings: number;
  }>;
}

export default function PayAsYouSaveChart({ data }: PayAsYouSaveChartProps) {
  return (
    <Card className="border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Real-Time Pay-As-You-Save Analytics</CardTitle>
        <CardDescription>Live revenue and payment tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
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
  );
}
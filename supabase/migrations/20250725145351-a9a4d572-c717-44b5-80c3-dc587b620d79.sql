-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create vehicles table for marketplace
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'e-bike' or 'e-tuktuk'
  price DECIMAL NOT NULL,
  image_url TEXT,
  battery_capacity TEXT,
  range_km INTEGER,
  max_speed INTEGER,
  description TEXT,
  availability_status TEXT DEFAULT 'available',
  owner_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for vehicles
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Create policies for vehicles
CREATE POLICY "Vehicles are viewable by everyone" 
ON public.vehicles 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create vehicles" 
ON public.vehicles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = owner_id);

-- Create purchases table for tracking vehicle purchases
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id),
  purchase_price DECIMAL NOT NULL,
  payment_plan TEXT DEFAULT 'pay-as-you-save',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for purchases
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for purchases
CREATE POLICY "Users can view their own purchases" 
ON public.purchases 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own purchases" 
ON public.purchases 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create ride analytics table
CREATE TABLE public.ride_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  vehicle_id UUID NOT NULL REFERENCES public.vehicles(id),
  distance_km DECIMAL NOT NULL,
  duration_minutes INTEGER NOT NULL,
  battery_consumed DECIMAL,
  co2_saved DECIMAL,
  fuel_cost_saved DECIMAL,
  location_start TEXT,
  location_end TEXT,
  ride_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for ride analytics
ALTER TABLE public.ride_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for ride analytics
CREATE POLICY "Users can view their own ride analytics" 
ON public.ride_analytics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ride analytics" 
ON public.ride_analytics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_purchases_updated_at
BEFORE UPDATE ON public.purchases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample vehicles data
INSERT INTO public.vehicles (name, type, price, battery_capacity, range_km, max_speed, description, image_url) VALUES
('EcoBike Pro', 'e-bike', 1200.00, '48V 15Ah', 80, 25, 'Professional e-bike perfect for delivery and commuting', '/placeholder.svg'),
('CityRider', 'e-bike', 800.00, '36V 10Ah', 50, 20, 'Compact city e-bike for urban mobility', '/placeholder.svg'),
('CargoTuk Pro', 'e-tuktuk', 5500.00, '72V 100Ah', 120, 45, 'Heavy-duty e-tuktuk for cargo and passenger transport', '/placeholder.svg'),
('UrbanTuk', 'e-tuktuk', 4200.00, '60V 80Ah', 100, 40, 'Efficient e-tuktuk for city transportation', '/placeholder.svg'),
('DeliveryBike Max', 'e-bike', 1500.00, '48V 20Ah', 100, 30, 'High-capacity e-bike for delivery services', '/placeholder.svg'),
('PassengerTuk Comfort', 'e-tuktuk', 6000.00, '72V 120Ah', 150, 50, 'Comfortable e-tuktuk with passenger amenities', '/placeholder.svg');
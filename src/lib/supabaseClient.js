
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kdrgnptjibdmuzyqikoy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkcmducHRqaWJkbXV6eXFpa295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2ODk0NTQsImV4cCI6MjA2MzI2NTQ1NH0.uVg4udR_XJAEbI15UX811YMX8gRkct-ehXhEU8rwuzQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

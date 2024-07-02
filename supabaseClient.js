// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gmeizwebbzxdvqqtutfz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZWl6d2ViYnp4ZHZxcXR1dGZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyOTY1OTQsImV4cCI6MjAzNDg3MjU5NH0.bg_4Y1giWKkbu0NlWVVGrrxaaWNhNZV9Zh1FXDmarM8";

export const supabase = createClient(supabaseUrl, supabaseKey);

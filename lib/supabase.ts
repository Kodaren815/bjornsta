import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://yluvyjfmyoeenucfywuu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdXZ5amZteW9lZW51Y2Z5d3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NTIzODUsImV4cCI6MjA5MTMyODM4NX0.KgWI2YDLcTvVuAKqpVRo4dCLT25bQksOhmR-GtVUvrI'
)

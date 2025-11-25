import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://dash.fastdevdigital.com.br/api'),
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://qibzrtoeuuduvwicfidx.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpYnpydG9ldXVkdXZ3aWNmaWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMzkzMzYsImV4cCI6MjA3ODgxNTMzNn0.hd0KayR_7PklB1APyc8oa1zoP7c_sOg54flF23zqf8w')
  }
})

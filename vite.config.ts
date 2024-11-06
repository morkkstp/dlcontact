import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // เปิดให้เข้าถึงจากเครือข่ายทั้งหมด
    port: 4000,      // กำหนดพอร์ต หรือเปลี่ยนตามต้องการ
  },
})

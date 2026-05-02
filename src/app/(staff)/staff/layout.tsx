import StaffHeader from "@/src/components/header/StaffHeader"
import { QueueProvider } from '@/src/features/(Staff)/dashboard/_context/QueueContext'

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen antialiased flex flex-col">
      <StaffHeader />
      <QueueProvider>
        {children}
      </QueueProvider>
    </div>
  )
}
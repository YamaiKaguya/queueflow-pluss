import { QueueProvider } from './_context/QueueContext'

import Dashboard from './_components/Dashboard'

export default function StaffDashboardPage() {
      return (
         <QueueProvider>
            <Dashboard />
         </QueueProvider>
      )
}
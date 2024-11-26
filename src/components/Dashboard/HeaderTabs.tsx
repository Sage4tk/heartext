import { motion } from 'framer-motion'
import { DollarSign, Mic, Speaker, Wallet } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'


const stats = [
  { title: 'TTS usage this month', value: '10.05 USD', icon: Speaker },
  { title: 'STT usage this month', value: '10.05 USD', icon: Mic },
  { title: 'Total Spent this month', value: '20.10 USD', icon: DollarSign },
  { title: 'Current Wallet', value: '10.05 USD', icon: Wallet },
]

export default function HeaderTabs() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
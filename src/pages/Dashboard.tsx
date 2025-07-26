import React from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Activity, School, BookOpen, Award } from 'lucide-react'
import { AnimatedCard, AnimatedCardHeader, AnimatedCardTitle, AnimatedCardContent } from '@/components/ui/animated-card'
import { SimpleChart } from '@/components/ui/simple-chart'

// Mock data
const metrics = [
  {
    title: "Average Student Proficiency",
    value: "78%",
    change: "+5.2%",
    icon: Award,
    color: "text-success"
  },
  {
    title: "Teacher Engagement",
    value: "92%",
    change: "+2.1%",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Active Schools",
    value: "24",
    change: "+3",
    icon: School,
    color: "text-warning"
  },
  {
    title: "Recent Activities",
    value: "156",
    change: "+12",
    icon: Activity,
    color: "text-destructive"
  }
]

const proficiencyData = [
  { name: 'Jan', value: 72 },
  { name: 'Feb', value: 74 },
  { name: 'Mar', value: 76 },
  { name: 'Apr', value: 75 },
  { name: 'May', value: 78 },
  { name: 'Jun', value: 80 }
]

const teacherActivityData = [
  { name: 'Math', value: 85 },
  { name: 'Science', value: 92 },
  { name: 'English', value: 78 },
  { name: 'History', value: 88 },
  { name: 'Arts', value: 82 }
]

const recentActivities = [
  {
    date: "2024-01-15",
    teacher: "Dr. Sarah Johnson",
    activity: "Lesson Plan Review",
    details: "Submitted Q1 Science curriculum updates"
  },
  {
    date: "2024-01-14",
    teacher: "Mr. Michael Chen",
    activity: "Student Assessment",
    details: "Completed Math proficiency evaluation"
  },
  {
    date: "2024-01-14",
    teacher: "Ms. Emily Rodriguez",
    activity: "Professional Development",
    details: "Attended digital teaching workshop"
  },
  {
    date: "2024-01-13",
    teacher: "Prof. David Kim",
    activity: "Parent Conference",
    details: "Discussed student progress reports"
  }
]

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">Cluster Overview Dashboard</h1>
          <p className="text-muted-foreground text-lg">Monitor performance and track educational progress</p>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <AnimatedCard 
                key={metric.title} 
                delay={index * 0.1}
                className="hover-lift"
              >
                <AnimatedCardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{metric.title}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
                      <p className={`text-sm font-medium mt-1 ${metric.color}`}>
                        {metric.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-primary/10 ${metric.color}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </AnimatedCardContent>
              </AnimatedCard>
            )
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Student Proficiency Chart */}
          <AnimatedCard delay={0.4} className="hover-lift">
            <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Student Proficiency Over Time
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <SimpleChart 
                data={proficiencyData}
                type="line"
                height={300}
                color="#3b82f6"
              />
            </AnimatedCardContent>
          </AnimatedCard>

          {/* Teacher Activity Chart */}
          <AnimatedCard delay={0.5} className="hover-lift">
            <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Teacher Activity Distribution
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <SimpleChart 
                data={teacherActivityData}
                type="bar"
                height={300}
                color="#06b6d4"
              />
            </AnimatedCardContent>
          </AnimatedCard>
        </div>

        {/* Recent Activity Table */}
        <AnimatedCard delay={0.6} className="hover-lift">
          <AnimatedCardHeader>
            <AnimatedCardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Teacher</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Activity</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm">{activity.date}</td>
                      <td className="py-3 px-4 text-sm font-medium">{activity.teacher}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {activity.activity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{activity.details}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedCardContent>
        </AnimatedCard>
      </div>
    </div>
  )
}
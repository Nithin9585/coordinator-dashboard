import React from "react"
import { motion } from "framer-motion"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  MessageSquare,
  Star,
  Activity,
  Award,
  BookOpen,
  Users,
} from "lucide-react"
import {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardTitle,
  AnimatedCardContent,
} from "@/components/ui/animated-card"
import { SimpleChart } from "@/components/ui/simple-chart"

// ------- Mock Data -------
const profile = {
  name: "Dr. Sarah Johnson",
  role: "Cluster Coordinator",
  cluster: "Rural District B",
  avatar:
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
  email: "sarah.johnson@eduassist.com",
  phone: "+1 (555) 123-4567",
  location: "Jaipur, Rajasthan",
  joined: "Aug 12, 2021",
  bio: `Passionate about improving teaching standards and student outcomes.
        Focused on data‑driven decision making, mentoring teachers, and ensuring quality learning experiences.`,
  badges: [
    { label: "Top Performer 2023", icon: Award },
    { label: "Data-Driven Leader", icon: Star },
    { label: "Mentor", icon: Users },
  ],
  skills: ["Educational Leadership", "Data Analytics", "Teacher Training", "Curriculum Design"],
}

const quickStats = [
  {
    title: "Avg. Student Proficiency",
    value: "78%",
    delta: "+5.2%",
    icon: Award,
    color: "text-success",
  },
  {
    title: "Teacher Engagement",
    value: "92%",
    delta: "+2.1%",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Reports Generated",
    value: "34",
    delta: "+4",
    icon: BookOpen,
    color: "text-warning",
  },
  {
    title: "Activities This Month",
    value: "156",
    delta: "+12",
    icon: Activity,
    color: "text-destructive",
  },
]

const proficiencyTrend = [
  { name: "Jan", value: 72 },
  { name: "Feb", value: 74 },
  { name: "Mar", value: 76 },
  { name: "Apr", value: 75 },
  { name: "May", value: 78 },
  { name: "Jun", value: 80 },
]

const engagementTrend = [
  { name: "Jan", value: 85 },
  { name: "Feb", value: 88 },
  { name: "Mar", value: 90 },
  { name: "Apr", value: 89 },
  { name: "May", value: 92 },
  { name: "Jun", value: 94 },
]

const recentActivities = [
  {
    date: "2024-07-26",
    type: "Report",
    title: "Generated teacher performance report",
    details: "Reviewed 5 teachers' quarterly KPIs",
  },
  {
    date: "2024-07-24",
    type: "Workshop",
    title: "Conducted PD on digital pedagogy",
    details: "32 teachers attended",
  },
  {
    date: "2024-07-22",
    type: "Assessment",
    title: "Analyzed student proficiency data",
    details: "+5% improvement from last quarter",
  },
  {
    date: "2024-07-18",
    type: "Mentoring",
    title: "1:1 coaching with Ms. Carter",
    details: "Focused on formative assessments",
  },
]

// ------- Component -------
export const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="flex items-center gap-4">
          {/* Avatar */}
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/30"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">
                {profile.role} • {profile.cluster}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.badges.map((b, i) => {
                  const Icon = b.icon
                  return (
                    <span
                      key={b.label + i}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium"
                    >
                      <Icon size={14} />
                      {b.label}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition">
              <Edit3 size={16} />
              Edit Profile
            </button>
            <button className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition">
              <MessageSquare size={16} />
              Message
            </button>
          </div>
        </motion.div>

        {/* Bio & Contact */}
        <AnimatedCard delay={0.1} className="hover-lift">
          <AnimatedCardContent className="p-6 space-y-6">
            <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Joined {profile.joined}</span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-1 rounded-md bg-muted text-foreground text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedCardContent>
        </AnimatedCard>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((s, i) => {
            const Icon = s.icon
            return (
              <AnimatedCard key={s.title} delay={0.15 + i * 0.05} className="hover-lift">
                <AnimatedCardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{s.title}</p>
                      <p className="text-3xl font-bold mt-1">{s.value}</p>
                      <p className={`text-sm mt-1 font-medium ${s.color}`}>{s.delta}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-primary/10 ${s.color}`}>
                      <Icon size={22} />
                    </div>
                  </div>
                </AnimatedCardContent>
              </AnimatedCard>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatedCard delay={0.3} className="hover-lift">
            <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Student Proficiency (Cluster)
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <SimpleChart data={proficiencyTrend} type="line" height={300} color="#3b82f6" />
            </AnimatedCardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.35} className="hover-lift">
          <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Teacher Engagement Rate
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <SimpleChart data={engagementTrend} type="line" height={300} color="#06b6d4" />
            </AnimatedCardContent>
          </AnimatedCard>
        </div>

        {/* Recent Activity */}
        <AnimatedCard delay={0.45} className="hover-lift">
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
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Title
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((a, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm">{a.date}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                          {a.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">{a.title}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{a.details}</td>
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

export default Profile

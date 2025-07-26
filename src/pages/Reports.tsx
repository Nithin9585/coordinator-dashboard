import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, Award, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedCard, AnimatedCardHeader, AnimatedCardTitle, AnimatedCardContent } from '@/components/ui/animated-card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SimpleChart } from '@/components/ui/simple-chart'

// Mock data
const proficiencyLevels = [
  { name: 'Excellent', value: 35 },
  { name: 'Good', value: 40 },
  { name: 'Satisfactory', value: 20 },
  { name: 'Needs Improvement', value: 5 }
]

const progressData = [
  { name: 'Sep', value: 72 },
  { name: 'Oct', value: 74 },
  { name: 'Nov', value: 76 },
  { name: 'Dec', value: 75 },
  { name: 'Jan', value: 78 }
]

const teacherPerformance = [
  { name: 'Dr. Johnson', value: 95 },
  { name: 'Mr. Chen', value: 88 },
  { name: 'Ms. Rodriguez', value: 92 },
  { name: 'Prof. Kim', value: 85 },
  { name: 'Dr. Wang', value: 90 }
]

export const Reports: React.FC = () => {
  const [selectedTeacher, setSelectedTeacher] = useState('all')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')

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
          <h1 className="text-4xl font-bold text-gradient mb-2">Performance Reports</h1>
          <p className="text-muted-foreground text-lg">Comprehensive analytics and insights</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <AnimatedCard delay={0.1}>
            <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Report Filters
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Teacher</label>
                  <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Teachers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teachers</SelectItem>
                      <SelectItem value="johnson">Dr. Sarah Johnson</SelectItem>
                      <SelectItem value="chen">Mr. Michael Chen</SelectItem>
                      <SelectItem value="rodriguez">Ms. Emily Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Grade</label>
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Grades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="1-3">Class 1-3</SelectItem>
                      <SelectItem value="4-6">Class 4-6</SelectItem>
                      <SelectItem value="7-9">Class 7-9</SelectItem>
                      <SelectItem value="10-12">Class 10-12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        </motion.div>

        {/* Report Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <AnimatedCard delay={0.3}>
            <AnimatedCardContent className="p-6">
              <Tabs defaultValue="teacher" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="teacher" className="flex items-center gap-2">
                    <Users size={16} />
                    Teacher Performance
                  </TabsTrigger>
                  <TabsTrigger value="student" className="flex items-center gap-2">
                    <Award size={16} />
                    Student Proficiency
                  </TabsTrigger>
                  <TabsTrigger value="progress" className="flex items-center gap-2">
                    <TrendingUp size={16} />
                    Progress Over Time
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="teacher" className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Teacher Performance Overview</h3>
                    <p className="text-muted-foreground mb-6">Performance ratings across all teachers</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Performance Ratings</h4>
                      <SimpleChart 
                        data={teacherPerformance}
                        type="bar"
                        height={300}
                        color="#10b981"
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-4">Performance Summary</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-success/10 rounded-lg">
                          <div className="text-2xl font-bold text-success">89.5%</div>
                          <div className="text-sm text-muted-foreground">Average Performance</div>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">24</div>
                          <div className="text-sm text-muted-foreground">Total Teachers</div>
                        </div>
                        <div className="p-4 bg-warning/10 rounded-lg">
                          <div className="text-2xl font-bold text-warning">95%</div>
                          <div className="text-sm text-muted-foreground">Above Target</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="student" className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Student Proficiency Levels</h3>
                    <p className="text-muted-foreground mb-6">Distribution of student performance levels</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Proficiency Distribution</h4>
                      <SimpleChart 
                        data={proficiencyLevels}
                        type="pie"
                        height={300}
                      />
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-4">Key Metrics</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">75%</div>
                          <div className="text-sm text-muted-foreground">Students Proficient or Above</div>
                        </div>
                        <div className="p-4 bg-success/10 rounded-lg">
                          <div className="text-2xl font-bold text-success">35%</div>
                          <div className="text-sm text-muted-foreground">Excellent Performance</div>
                        </div>
                        <div className="p-4 bg-warning/10 rounded-lg">
                          <div className="text-2xl font-bold text-warning">5%</div>
                          <div className="text-sm text-muted-foreground">Need Improvement</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Progress Over Time</h3>
                    <p className="text-muted-foreground mb-6">Academic progress trends and improvements</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-4">Monthly Progress Trend</h4>
                    <SimpleChart 
                      data={progressData}
                      type="line"
                      height={400}
                      color="#3b82f6"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">+6%</div>
                      <div className="text-sm text-muted-foreground">Improvement This Term</div>
                    </div>
                    <div className="p-4 bg-success/10 rounded-lg text-center">
                      <div className="text-2xl font-bold text-success">78%</div>
                      <div className="text-sm text-muted-foreground">Current Average</div>
                    </div>
                    <div className="p-4 bg-warning/10 rounded-lg text-center">
                      <div className="text-2xl font-bold text-warning">80%</div>
                      <div className="text-sm text-muted-foreground">Target Goal</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </AnimatedCardContent>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  )
}
import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Eye,
  Download,
  Plus,
  Book,
  GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/enhanced-input' // or '@/components/ui/input'
import {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardTitle,
  AnimatedCardContent,
} from '@/components/ui/animated-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Teacher = {
  id: number
  name: string
  photo: string
  subject: string
  class: string
  grade: string
  school: string
  experience: string
  email: string
}

// Mock data
const teachers: Teacher[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    photo: '/api/placeholder/50/50',
    subject: 'Mathematics',
    class: 'Grade 5-6',
    grade: 'A+',
    school: 'Lincoln Elementary',
    experience: '8 years',
    email: 'sarah.johnson@school.edu',
  },
  {
    id: 2,
    name: 'Mr. Michael Chen',
    photo: '/api/placeholder/50/50',
    subject: 'Science',
    class: 'Grade 7-8',
    grade: 'A',
    school: 'Roosevelt Middle',
    experience: '5 years',
    email: 'michael.chen@school.edu',
  },
  {
    id: 3,
    name: 'Ms. Emily Rodriguez',
    photo: '/api/placeholder/50/50',
    subject: 'English Literature',
    class: 'Grade 9-12',
    grade: 'A+',
    school: 'Washington High',
    experience: '12 years',
    email: 'emily.rodriguez@school.edu',
  },
  {
    id: 4,
    name: 'Prof. David Kim',
    photo: '/api/placeholder/50/50',
    subject: 'History',
    class: 'Grade 10-12',
    grade: 'A',
    school: 'Jefferson Academy',
    experience: '15 years',
    email: 'david.kim@school.edu',
  },
  {
    id: 5,
    name: 'Dr. Lisa Wang',
    photo: '/api/placeholder/50/50',
    subject: 'Art & Design',
    class: 'Grade 1-4',
    grade: 'A+',
    school: 'Adams Primary',
    experience: '6 years',
    email: 'lisa.wang@school.edu',
  },
  {
    id: 6,
    name: 'Mr. James Wilson',
    photo: '/api/placeholder/50/50',
    subject: 'Physical Education',
    class: 'Grade 6-8',
    grade: 'B+',
    school: 'Roosevelt Middle',
    experience: '10 years',
    email: 'james.wilson@school.edu',
  },
]

export const Teachers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredTeachers = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return teachers.filter(
      (t) =>
        t.name.toLowerCase().includes(term) ||
        t.subject.toLowerCase().includes(term) ||
        t.school.toLowerCase().includes(term)
    )
  }, [searchTerm])

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentTeachers = filteredTeachers.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const getGradeColor = (grade: string) => {
    if (grade.includes('A+')) return 'text-success bg-success/10'
    if (grade.includes('A')) return 'text-primary bg-primary/10'
    if (grade.includes('B')) return 'text-warning bg-warning/10'
    return 'text-muted-foreground bg-muted/50'
  }

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')

  const exportCSV = () => {
    const headers = [
      'Name',
      'Subject',
      'Class',
      'Grade',
      'School',
      'Experience',
      'Email',
    ]
    const rows = filteredTeachers.map((t) => [
      t.name,
      t.subject,
      t.class,
      t.grade,
      t.school,
      t.experience,
      t.email,
    ])
    const csvContent =
      [headers, ...rows].map((r) => r.map(escapeCSV).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'teachers.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const escapeCSV = (value: string) => {
    if (/[",\n]/.test(value)) {
      return `"${value.replace(/"/g, '""')}"`
    }
    return value
  }

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
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Teachers Directory
          </h1>
          <p className="text-muted-foreground text-lg">
          Monitor teacher performance and professional development
          </p>
        </motion.div>

        {/* Search + Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="w-full sm:max-w-md">
            <Input
              icon={<Search size={16} />} // remove this prop if your Input doesn't support it
              placeholder="Search teachers by name, subject, or school..."
              value={searchTerm}
              onChange={(e) => {
                setCurrentPage(1)
                setSearchTerm(e.target.value)
              }}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCSV}>
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <Button variant="gradient">
              <Plus size={16} className="mr-2" />
              Add Teacher
            </Button>
          </div>
        </motion.div>

        {/* Teachers Table */}
        <AnimatedCard delay={0.4} className="hover-lift">
          <AnimatedCardHeader>
          <AnimatedCardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Teachers Overview
            </AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                      Teacher
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                      Subject
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                      Class
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                      Grade
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                      School
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentTeachers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-muted-foreground"
                      >
                        No teachers found.
                      </td>
                    </tr>
                  ) : (
                    currentTeachers.map((teacher, index) => (
                      <motion.tr
                        key={teacher.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={teacher.photo}
                                alt={teacher.name}
                              />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {getInitials(teacher.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-foreground">
                                {teacher.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {teacher.experience} experience
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Book size={16} className="text-primary" />
                            <span className="text-sm font-medium">
                              {teacher.subject}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm">{teacher.class}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(
                              teacher.grade
                            )}`}
                          >
                            {teacher.grade}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-muted-foreground">
                            {teacher.school}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">
                            <Eye size={16} className="mr-2" />
                            View Profile
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing {filteredTeachers.length === 0 ? 0 : startIndex + 1} to{' '}
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredTeachers.length
                )}{' '}
                of {filteredTeachers.length} teachers
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-10"
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </AnimatedCardContent>
        </AnimatedCard>
      </div>
    </div>
  )
}

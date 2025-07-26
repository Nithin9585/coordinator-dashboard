import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Download, MapPin, Phone, Users, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/enhanced-input'
import { AnimatedCard, AnimatedCardHeader, AnimatedCardTitle, AnimatedCardContent } from '@/components/ui/animated-card'

// Mock data
const schools = [
  {
    id: 1,
    name: "Lincoln Elementary School",
    location: "123 Oak Street, Springfield, IL",
    contact: "+1 (555) 123-4567",
    teachers: 24,
    principal: "Dr. Sarah Johnson",
    type: "Elementary"
  },
  {
    id: 2,
    name: "Roosevelt Middle School",
    location: "456 Maple Avenue, Springfield, IL",
    contact: "+1 (555) 234-5678",
    teachers: 18,
    principal: "Mr. Michael Chen",
    type: "Middle School"
  },
  {
    id: 3,
    name: "Washington High School",
    location: "789 Pine Road, Springfield, IL",
    contact: "+1 (555) 345-6789",
    teachers: 35,
    principal: "Ms. Emily Rodriguez",
    type: "High School"
  },
  {
    id: 4,
    name: "Jefferson Academy",
    location: "321 Elm Street, Springfield, IL",
    contact: "+1 (555) 456-7890",
    teachers: 28,
    principal: "Prof. David Kim",
    type: "Academy"
  },
  {
    id: 5,
    name: "Adams Primary School",
    location: "654 Cedar Lane, Springfield, IL",
    contact: "+1 (555) 567-8901",
    teachers: 16,
    principal: "Dr. Lisa Wang",
    type: "Primary"
  }
]

export const Schools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.principal.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentSchools = filteredSchools.slice(startIndex, startIndex + itemsPerPage)

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
          <h1 className="text-4xl font-bold text-gradient mb-2">Schools Management</h1>
          <p className="text-muted-foreground text-lg">Manage and monitor all schools in your cluster</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-center"
        >
          <div className="w-full sm:w-96">
            <Input
              icon={<Search size={16} />}
              placeholder="Search schools by name, location, or principal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" icon={<Download size={16} />}>
              Export
            </Button>
            <Button variant="gradient" icon={<Plus size={16} />}>
              Add School
            </Button>
          </div>
        </motion.div>

        {/* Schools Table */}
        <AnimatedCard delay={0.4} className="hover-lift">
          <AnimatedCardHeader>
            <AnimatedCardTitle>Schools Directory</AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">School Name</th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Location</th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Contact</th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Teachers</th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Principal</th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSchools.map((school, index) => (
                    <motion.tr
                      key={school.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="border-b border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-foreground">{school.name}</div>
                          <div className="text-sm text-muted-foreground">{school.type}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{school.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Phone size={16} className="text-muted-foreground" />
                          <span className="text-sm">{school.contact}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-primary" />
                          <span className="font-medium text-primary">{school.teachers}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium">{school.principal}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm" icon={<Eye size={16} />}>
                          View Details
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredSchools.length)} of {filteredSchools.length} schools
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
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
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
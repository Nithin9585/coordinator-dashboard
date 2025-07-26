import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Phone, Mail, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { AnimatedCard, AnimatedCardHeader, AnimatedCardTitle, AnimatedCardContent } from '@/components/ui/animated-card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Mock FAQ data
const faqs = [
  {
    id: '1',
    question: 'How do I add a new school to the system?',
    answer: 'To add a new school, navigate to the Schools page and click the "Add School" button. Fill in all required information including school name, location, contact details, and assign a principal. The school will be automatically added to your cluster.'
  },
  {
    id: '2',
    question: 'How can I generate performance reports?',
    answer: 'Visit the Reports section and use the filter options to select specific teachers, grades, or subjects. You can generate comprehensive reports including teacher performance, student proficiency levels, and progress over time. Reports can be exported in PDF or Excel format.'
  },
  {
    id: '3',
    question: 'What should I do if a teacher\'s performance grade is low?',
    answer: 'If a teacher shows low performance grades, you should schedule a one-on-one meeting to discuss challenges and provide support. Consider offering professional development opportunities, mentorship programs, or additional resources. Document all interventions and monitor progress regularly.'
  },
  {
    id: '4',
    question: 'How do I update teacher information?',
    answer: 'Go to the Teachers page, find the teacher you want to update, and click "View Profile". From there, you can edit their information including contact details, subjects taught, class assignments, and performance notes. Changes are saved automatically.'
  },
  {
    id: '5',
    question: 'Can I export data from the dashboard?',
    answer: 'Yes, most data in EduAssist can be exported. Look for export buttons on various pages, or use the comprehensive export feature in the Reports section. You can export data in multiple formats including CSV, Excel, and PDF.'
  },
  {
    id: '6',
    question: 'How often is the performance data updated?',
    answer: 'Performance data is updated in real-time as teachers submit their reports and assessments. Dashboard metrics are refreshed every hour, while detailed analytics are processed daily. You can see the last update timestamp on each report.'
  },
  {
    id: '7',
    question: 'What happens if I forget my password?',
    answer: 'Click the "Forgot Password" link on the login page and enter your email address. You\'ll receive a secure reset link within minutes. If you don\'t receive the email, check your spam folder or contact support for assistance.'
  },
  {
    id: '8',
    question: 'How do I monitor student proficiency across schools?',
    answer: 'Use the Dashboard overview to see cluster-wide proficiency metrics, or visit the Reports section for detailed analysis. You can filter by school, grade level, or subject to get specific insights. Trend charts help identify patterns and areas needing attention.'
  }
]

export const Support: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | undefined>(undefined)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-accent/5 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">Support Center</h1>
          <p className="text-muted-foreground text-lg">Get help and find answers to common questions</p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <AnimatedCard delay={0.1} className="hover-lift">
            <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Contact Support
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                  <div className="p-3 bg-primary rounded-full">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone Support</h3>
                    <p className="text-sm text-muted-foreground">Call us for immediate assistance</p>
                    <p className="text-primary font-medium">+1 (555) 123-HELP</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 8AM-6PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-success/10 rounded-lg">
                  <div className="p-3 bg-success rounded-full">
                    <Mail className="w-5 h-5 text-success-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email Support</h3>
                    <p className="text-sm text-muted-foreground">Send us your questions anytime</p>
                    <p className="text-success font-medium">support@eduassist.com</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="gradient" size="lg">
                  Start Live Chat
                </Button>
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <AnimatedCard delay={0.3} className="hover-lift">
            <AnimatedCardHeader>
              <AnimatedCardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Frequently Asked Questions
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <Accordion type="single" collapsible value={expandedFaq} onValueChange={setExpandedFaq}>
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <AccordionItem value={faq.id} className="border-border/50">
                      <AccordionTrigger className="text-left hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </AnimatedCardContent>
          </AnimatedCard>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <AnimatedCard delay={0.5} className="hover-lift">
            <AnimatedCardHeader>
              <AnimatedCardTitle>Additional Resources</AnimatedCardTitle>
            </AnimatedCardHeader>
            <AnimatedCardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span>User Guide</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <div className="p-2 bg-success/10 rounded-full">
                    <MessageCircle className="w-5 h-5 text-success" />
                  </div>
                  <span>Video Tutorials</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <div className="p-2 bg-warning/10 rounded-full">
                    <Mail className="w-5 h-5 text-warning" />
                  </div>
                  <span>Training Materials</span>
                </Button>
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  )
}
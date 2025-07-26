import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth } from '@/lib/AuthContext'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Mail, Phone, Lock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/enhanced-input'
import { AnimatedCard, AnimatedCardHeader, AnimatedCardTitle, AnimatedCardContent } from '@/components/ui/animated-card'
import { useToast } from '@/hooks/use-toast'

interface FormData {
  fullName: string
  email: string
  mobile: string
  password: string
  confirmPassword: string
  cluster: string
}

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    cluster: ''
  })
  
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.cluster.trim()) newErrors.cluster = 'Cluster identification is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Create user with Firebase Authentication
      // await signup(formData.email, formData.password);
      
      // Here you can add additional user data to your database if needed
      // For example, storing fullName, mobile, and cluster in Firestore
      
      toast({
        title: "Registration Successful!",
        description: "Welcome to EduAssist. You can now login to your account.",
        variant: "default"
      });
      
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md"
      >
        <AnimatedCard className="shadow-elegant">
          <AnimatedCardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
            >
            </motion.div>
            <AnimatedCardTitle className="text-gradient">
              Register as EduAssist Coordinator
            </AnimatedCardTitle>
          </AnimatedCardHeader>
          
          <AnimatedCardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                icon={<User size={16} />}
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                error={errors.fullName}
                placeholder="Enter your full name"
              />
              
              <Input
                label="Email"
                type="email"
                icon={<Mail size={16} />}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                error={errors.email}
                placeholder="Enter your email address"
              />
              
              <Input
                label="Mobile Number"
                type="tel"
                icon={<Phone size={16} />}
                value={formData.mobile}
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                error={errors.mobile}
                placeholder="Enter your mobile number"
              />
              
              <Input
                label="Password"
                type="password"
                icon={<Lock size={16} />}
                showPasswordToggle
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                error={errors.password}
                placeholder="Create a strong password"
              />
              
              <Input
                label="Confirm Password"
                type="password"
                icon={<Lock size={16} />}
                showPasswordToggle
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
              />
              
              <Input
                label="Cluster Identification"
                icon={<MapPin size={16} />}
                value={formData.cluster}
                onChange={(e) => setFormData(prev => ({ ...prev, cluster: e.target.value }))}
                error={errors.cluster}
                placeholder="Enter your cluster ID"
              />
              
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                loading={isLoading}
              >
                Register
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </AnimatedCardContent>
        </AnimatedCard>
      </motion.div>
    </div>
  )
}
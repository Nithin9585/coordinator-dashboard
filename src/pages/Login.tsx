import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { User, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/enhanced-input'
import { AnimatedCard, AnimatedCardHeader, AnimatedCardTitle, AnimatedCardContent } from '@/components/ui/animated-card'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import schoolHero from '@/assets/school-hero.jpg'

interface LoginData {
  username: string
  password: string
  rememberMe: boolean
}

export const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    username: '',
    password: '',
    rememberMe: false
  })
  
  const [errors, setErrors] = useState<Partial<LoginData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {}
    
    if (!formData.username.trim()) newErrors.username = 'Username or mobile number is required'
    if (!formData.password) newErrors.password = 'Password is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast({
      title: "Welcome to EduAssist!",
      description: "Login successful. Redirecting to dashboard...",
      variant: "default"
    })
    
    // Redirect to dashboard after successful login
    setTimeout(() => {
      navigate('/dashboard')
    }, 1000)
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${schoolHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-glow/60" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-bold text-center mb-6"
          >
            Welcome to EduAssist
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl text-center max-w-md opacity-90"
          >
            Empowering education coordinators with intelligent tools for better school management and student outcomes.
          </motion.p>
        </div>
      </motion.div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-secondary/10 to-accent/5 p-4">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full max-w-md"
        >
          <AnimatedCard className="shadow-elegant">
            <AnimatedCardHeader className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
              >
              <img src="/ea_logo.png" alt="EduAssist Logo" className="w-10 h-10" />
              </motion.div>
              <AnimatedCardTitle className="text-gradient">
                Sign In to EduAssist
              </AnimatedCardTitle>
            </AnimatedCardHeader>
            
            <AnimatedCardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Username/Mobile Number"
                  icon={<User size={16} />}
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  error={errors.username}
                  placeholder="Enter username or mobile"
                />
                
                <Input
                  label="Password"
                  type="password"
                  icon={<Lock size={16} />}
                  showPasswordToggle
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  error={errors.password}
                  placeholder="Enter your password"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                      }
                    />
                    <label 
                      htmlFor="remember" 
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      Remember me
                    </label>
                  </div>
                  
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  loading={isLoading}
                >
                  Sign In
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </AnimatedCardContent>
          </AnimatedCard>
        </motion.div>
      </div>
    </div>
  )
}
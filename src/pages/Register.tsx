// src/pages/auth/Register.tsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Lock, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/enhanced-input'
import {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardTitle,
  AnimatedCardContent
} from '@/components/ui/animated-card'
import { useToast } from '@/hooks/use-toast'

import {
  auth,
  firestore
} from '@/firebase' 
import {
  createUserWithEmailAndPassword,
  
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  deleteDoc 
} from 'firebase/firestore'

interface FormData {
  fullName: string
  email: string
  mobile: string
  password: string
  confirmPassword: string
  cluster: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/ 
const MOBILE_REGEX = /^[0-9]{10,15}$/ 

export const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    cluster: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setFormData(prev => ({ ...prev, [field]: value }))
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'

    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!EMAIL_REGEX.test(formData.email)) newErrors.email = 'Invalid email format'

    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required'
    else if (!MOBILE_REGEX.test(formData.mobile))
      newErrors.mobile = 'Enter a valid mobile number (10–15 digits)'

    if (!formData.password) newErrors.password = 'Password is required'
    else if (!PASSWORD_REGEX.test(formData.password))
      newErrors.password =
        'Password must be at least 8 chars and include uppercase, lowercase, and a number'

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'

    if (!formData.cluster.trim()) newErrors.cluster = 'Cluster identification is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const ensureUserDoc = async (uid: string) => {
    const userRef = doc(firestore, 'users', uid)
    const snap = await getDoc(userRef)

    const payload: any = {
      uid,
      fullName: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      cluster: formData.cluster,
      role: 'coordinator',
      updatedAt: serverTimestamp()
    }

    if (!snap.exists()) {
      payload.createdAt = serverTimestamp()
    }

    await setDoc(userRef, payload, { merge: true })
  }

  // --- CORRECTED CODE ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
      // Step 1: Create the user in Firebase Authentication
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

     
      try {
        await ensureUserDoc(user.uid)

        const actionCodeSettings = {
          url: `${window.location.origin}/login`
        }

        
        navigate('/login')
      } catch (setupError) {
        console.error('Post-registration setup failed:', setupError)

        const userDocRef = doc(firestore, 'users', user.uid)
        await deleteDoc(userDocRef) 
        await user.delete() 

        toast({
          title: 'Registration Failed',
          description:
            'We couldn’t finish setting up your account. Please try again.',
          variant: 'destructive'
        })
      }
    } catch (err: any) {
      if (err?.code === 'auth/email-already-in-use') {
        toast({
          title: 'Email already in use',
          description: 'This email is registered. Please log in instead.',
          variant: 'destructive'
        })
        navigate('/login')
      } else {
        toast({
          title: 'Registration Failed',
          description: err?.message ?? 'An unknown error occurred.',
          variant: 'destructive'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }
  // --- END OF CORRECTION ---

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="w-full max-w-md"
      >
        <AnimatedCard className="shadow-elegant">
          <AnimatedCardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <User className="w-8 h-8 text-primary-foreground" />
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
                onChange={handleChange('fullName')}
                error={errors.fullName}
                placeholder="Enter your full name"
                autoComplete="name"
              />

              <Input
                label="Email"
                type="email"
                icon={<Mail size={16} />}
                value={formData.email}
                onChange={handleChange('email')}
                error={errors.email}
                placeholder="Enter your email address"
                autoComplete="email"
              />

              <Input
                label="Mobile Number"
                type="tel"
                icon={<Phone size={16} />}
                value={formData.mobile}
                onChange={handleChange('mobile')}
                error={errors.mobile}
                placeholder="Enter your mobile number"
                autoComplete="tel"
              />

              <Input
                label="Password"
                type="password"
                icon={<Lock size={16} />}
                showPasswordToggle
                value={formData.password}
                onChange={handleChange('password')}
                error={errors.password}
                placeholder="Create a strong password"
                autoComplete="new-password"
              />

              <Input
                label="Confirm Password"
                type="password"
                icon={<Lock size={16} />}
                showPasswordToggle
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                autoComplete="new-password"
              />

              <Input
                label="Cluster Identification"
                icon={<MapPin size={16} />}
                value={formData.cluster}
                onChange={handleChange('cluster')}
                error={errors.cluster}
                placeholder="Enter your cluster ID"
              />

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
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

export default Register;
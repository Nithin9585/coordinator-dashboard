import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  School,
  Users,
  BarChart3,
  User as UserIcon,
  HelpCircle,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { clearFirebasePersistence } from '@/lib/clearFirebasePersistance';
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/schools', label: 'Schools', icon: School },
  { href: '/teachers', label: 'Teachers', icon: Users },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/profile', label: 'Profile', icon: UserIcon },
  { href: '/support', label: 'Support', icon: HelpCircle },
]

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/register'

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await signOut(auth);
      setIsOpen(false);

      
      await clearFirebasePersistence();
      toast.success('Logged out successfully');

      navigate('/login', { replace: true })
      document.cookie = 'session=; Max-Age=0; path=/;'
    } catch (err) {
      console.error('Failed to logout:', err)
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false)
    }
  };

  if (isAuthPage) return null

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
            >
              <img src="/ea_logo.png" alt="EduAssist Logo" className="w-6 h-6" />
            </motion.div>
            <span className="text-xl font-bold text-gradient">EduAssist</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href

              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn(
                      'relative',
                      isActive && 'bg-primary/10 text-primary'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Button>
                </Link>
              )
            })}

            <Button
              variant="ghost"
              size="sm"
              className="ml-4"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isLoggingOut ? 'Logging out…' : 'Logout'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-border/50"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}

              <Button
                variant="ghost"
                className="w-full justify-start mt-4"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isLoggingOut ? 'Logging out…' : 'Logout'}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

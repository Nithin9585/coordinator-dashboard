import React from 'react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pt-16"
      >
        <Outlet />
      </motion.main>
    </div>
  )
}
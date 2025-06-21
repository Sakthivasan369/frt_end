"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface WelcomeMessageProps {
  onRoleSelect: (role: string) => void
}

export function WelcomeMessage({ onRoleSelect }: WelcomeMessageProps) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 rounded-lg p-4 max-w-[80%] text-gray-800"
      >
        <h2 className="text-lg font-bold text-blue-700 mb-2">Welcome to VA Tech WABAG Assistant</h2>
        <p className="text-gray-600">
          I'm here to help you with information about VA Tech WABAG. You can ask me general questions or select your
          role below for more specific assistance.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 ml-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="bg-blue-100 border-blue-200 hover:bg-blue-200 text-blue-800"
            onClick={() => onRoleSelect("investor")}
          >
            I'm an Investor
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button
            variant="outline"
            className="bg-green-100 border-green-200 hover:bg-green-200 text-green-800"
            onClick={() => onRoleSelect("job_seeker")}
          >
            I'm a Job Seeker
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Button
            variant="outline"
            className="bg-purple-100 border-purple-200 hover:bg-purple-200 text-purple-800"
            onClick={() => onRoleSelect("visitor")}
          >
            I'm a Visitor
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

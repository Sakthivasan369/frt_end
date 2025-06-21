"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users } from "lucide-react"

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void
  currentRole: string | null
}

export function RoleSelector({ onRoleSelect, currentRole }: RoleSelectorProps) {
  const [open, setOpen] = useState(false)

  const roles = [
    { id: "investor", name: "Investor" },
    { id: "job_seeker", name: "Job Seeker" },
    { id: "visitor", name: "Visitor" },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
          <Users size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            className={currentRole === role.id ? "bg-blue-50" : ""}
            onClick={() => {
              onRoleSelect(role.id)
              setOpen(false)
            }}
          >
            {role.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

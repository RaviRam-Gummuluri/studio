"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, UserPlus, FileText, CheckCircle } from "lucide-react"
import type { Bond } from "@/lib/data"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

type BondTableProps = {
  bonds: Bond[]
}

export function BondTable({ bonds }: BondTableProps) {
  if (bonds.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-md border border-dashed p-8 text-muted-foreground">
        No bonds to display.
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ISIN</TableHead>
            <TableHead>CUSIP</TableHead>
            <TableHead>Issuer</TableHead>
            <TableHead>Maturity Date</TableHead>
            <TableHead>Counterparty</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bonds.map((bond) => (
            <TableRow key={bond.id}>
              <TableCell>
                <Button variant="link" className="p-0">
                  {bond.isin}
                </Button>
              </TableCell>
              <TableCell>{bond.cusip}</TableCell>
              <TableCell>{bond.issuer}</TableCell>
              <TableCell>{format(bond.maturityDate, "PPP")}</TableCell>
              <TableCell>{bond.counterparty}</TableCell>
              <TableCell>{bond.book}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    bond.status === "Open"
                      ? "default"
                      : bond.status === "Resolved"
                      ? "secondary"
                      : "destructive"
                  }
                  className={cn({
                    "bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-500/30": bond.status === "Open",
                    "bg-blue-500/20 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-500/30": bond.status === "Resolved",
                    "bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-500/30": bond.status === "Cancelled",
                  })}
                >
                  {bond.status}
                </Badge>
              </TableCell>
              <TableCell>
                {bond.assignedTo ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={bond.assignedTo.avatar} />
                      <AvatarFallback>{bond.assignedTo.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{bond.assignedTo.name}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Unassigned</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Assign to me
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Add Note
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as resolved
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

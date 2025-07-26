"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartContextValue {
  config: Record<string, any>
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config: Record<string, any>
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ className, config, children, ...props }, ref) => {
    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          className={cn("chart-container", className)}
          {...props}
        >
          {children}
        </div>
      </ChartContext.Provider>
    )
  }
)
Chart.displayName = "Chart"

export { Chart }

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

interface WeeklyProgressProps {
  caloriesData: number[];
  proteinData: number[];
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; fill: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-3 rounded-md border shadow-md">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.fill }}>
            {entry.name}: {entry.value} {entry.name === "Калории" ? "ккал" : "г"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function WeeklyProgress({ caloriesData, proteinData, className }: WeeklyProgressProps) {
  // Prepare the data for the chart
  const data = days.map((day, index) => ({
    day,
    calories: caloriesData[index] || 0,
    protein: proteinData[index] || 0,
  }));

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4">Недельный прогресс</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              name="Калории"
              dataKey="calories" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              barSize={16}
            />
            <Bar 
              name="Белки"
              dataKey="protein" 
              fill="hsl(210 84% 60%)" 
              radius={[4, 4, 0, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

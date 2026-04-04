"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 80 },
  { name: "Wed", value: 50 },
  { name: "Thu", value: 40 },
  { name: "Fri", value: 45 },
  { name: "Sat", value: 95 },
  { name: "Sun", value: 85 },
];

export default function SalesChart() {
  return (
    <Card className="p-0 bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
      <CardContent className="px-4 pt-4 pb-2 flex flex-col gap-1">
        <p className="text-[#666] font-onest text-[11px] font-light">Revenue</p>
        <h2 className="text-[#e8ddd8] text-[22px] font-bold font-onest tracking-tight">
          $86,578.00
        </h2>

        <div className="h-24 w-full mt-1 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF7849" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FF7849" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#FF7849"
                strokeWidth={2}
                fill="url(#chartGradient)"
                dot={false}
                activeDot={{ r: 4, fill: "#FF7849", stroke: "#141414", strokeWidth: 2 }}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#555", fontFamily: "Onest" }}
                dy={5}
              />
              <Tooltip
                contentStyle={{
                  background: "#1a1a1a",
                  border: "1px solid #2a2a2a",
                  borderRadius: "12px",
                  color: "#e8ddd8",
                  fontSize: "12px",
                  fontFamily: "Onest",
                  padding: "6px 10px",
                }}
                cursor={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="text-primary text-[12px] font-onest font-medium mt-1">
          ↑ 12% from last week
        </p>
      </CardContent>
    </Card>
  );
}

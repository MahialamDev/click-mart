"use client";

import React from "react";
import {
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Activity,
  CreditCard,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Sample Analytics Data
const revenueData = [
  { month: "Jan", revenue: 4000, orders: 240 },
  { month: "Feb", revenue: 3000, orders: 198 },
  { month: "Mar", revenue: 5000, orders: 300 },
  { month: "Apr", revenue: 4780, orders: 290 },
  { month: "May", revenue: 5890, orders: 350 },
  { month: "Jun", revenue: 6390, orders: 410 },
  { month: "Jul", revenue: 7490, orders: 480 },
];

const recentTransactions = [
  { id: "TXN-8091", user: "Rahim Ahmed", amount: "+$250.00", status: "Completed", date: "Aug 26, 2026" },
  { id: "TXN-8092", user: "Sarah Jenkins", amount: "+$1,200.50", status: "Completed", date: "Aug 26, 2026" },
  { id: "TXN-8093", user: "Tanvir Hossain", amount: "-$84.00", status: "Pending", date: "Aug 25, 2026" },
  { id: "TXN-8094", user: "Alex Morgan", amount: "+$450.00", status: "Completed", date: "Aug 24, 2026" },
  { id: "TXN-8095", user: "Kazi Nabil", amount: "-$12.50", status: "Failed", date: "Aug 23, 2026" },
];

const DashboardPage = () => {
  return (
    <div className="w-full min-h-screen bg-base-200 sm:p-6 lg:p-8 space-y-8 text-base-content font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
            System Dashboard
          </h1>
          <p className="text-base-content/60 text-sm mt-1">
            Welcome back! Here is what&apos;s happening across your platform today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-base-100 border border-base-300 hover:bg-base-300/50 text-base-content text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-content text-xs sm:text-sm font-semibold rounded-xl shadow-md transition-all border-none">
            + New Action
          </button>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Total Revenue */}
        <div className="bg-base-100 p-5 rounded-3xl border border-base-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Total Revenue</span>
            <div className="p-2.5 bg-primary/10 text-primary rounded-2xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-base-content">$36,540.00</h3>
            <span className="inline-flex items-center text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +12.5%
            </span>
          </div>
          <p className="text-xs text-base-content/50">Compared to last month</p>
        </div>

        {/* Total Orders */}
        <div className="bg-base-100 p-5 rounded-3xl border border-base-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Total Orders</span>
            <div className="p-2.5 bg-secondary/10 text-secondary rounded-2xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-base-content">2,268</h3>
            <span className="inline-flex items-center text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +8.2%
            </span>
          </div>
          <p className="text-xs text-base-content/50">Compared to last month</p>
        </div>

        {/* Active Users */}
        <div className="bg-base-100 p-5 rounded-3xl border border-base-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Active Users</span>
            <div className="p-2.5 bg-accent/10 text-accent rounded-2xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-base-content">14,890</h3>
            <span className="inline-flex items-center text-xs font-semibold text-error bg-error/10 px-2 py-0.5 rounded-full">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              -2.1%
            </span>
          </div>
          <p className="text-xs text-base-content/50">Compared to last month</p>
        </div>

        {/* Conversion Rate */}
        <div className="bg-base-100 p-5 rounded-3xl border border-base-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Conversion Rate</span>
            <div className="p-2.5 bg-warning/10 text-warning rounded-2xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-bold text-base-content">3.42%</h3>
            <span className="inline-flex items-center text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              +4.6%
            </span>
          </div>
          <p className="text-xs text-base-content/50">Compared to last month</p>
        </div>

      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart: Revenue Trend (2 Columns) */}
        <div className="lg:col-span-2 bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-base-content">Revenue Performance</h2>
              <p className="text-xs text-base-content/60">Monthly gross income vs volume</p>
            </div>
            <button className="p-2 text-base-content/50 hover:text-base-content rounded-xl hover:bg-base-200 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-base-300)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-base-content)', opacity: 0.6 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-base-content)', opacity: 0.6 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-base-100)', 
                    borderColor: 'var(--color-base-300)',
                    borderRadius: '0.75rem',
                    color: 'var(--color-base-content)'
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Order Growth (1 Column) */}
        <div className="lg:col-span-1 bg-base-100 p-6 rounded-3xl border border-base-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-base-content">Orders Overview</h2>
              <p className="text-xs text-base-content/60">Total volume count</p>
            </div>
            <div className="p-2 bg-primary text-primary-content rounded-xl">
              <Activity className="w-4 h-4" />
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-base-300)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-base-content)', opacity: 0.6 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-base-content)', opacity: 0.6 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-base-100)', 
                    borderColor: 'var(--color-base-300)',
                    borderRadius: '0.75rem',
                    color: 'var(--color-base-content)'
                  }}
                />
                <Bar dataKey="orders" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Transactions Table */}
      <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm overflow-hidden">
        <div className="p-6 flex items-center justify-between border-b border-base-300">
          <div>
            <h2 className="text-base font-bold text-base-content">Recent Transactions</h2>
            <p className="text-xs text-base-content/60">Latest financial activities across accounts</p>
          </div>
          <button className="text-xs font-semibold text-primary hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-base-200/50 border-b border-base-300 text-base-content/60 text-xs uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-6">Transaction ID</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300 text-sm font-medium text-base-content">
              {recentTransactions.map((item) => (
                <tr key={item.id} className="hover:bg-base-200/40 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs font-semibold text-base-content">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-base-content/40" />
                      {item.id}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-base-content">{item.user}</td>
                  <td className={`py-4 px-6 font-semibold ${item.amount.startsWith('+') ? 'text-success' : 'text-base-content'}`}>
                    {item.amount}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Completed"
                          ? "bg-success/10 text-success border border-success/20"
                          : item.status === "Pending"
                          ? "bg-warning/10 text-warning border border-warning/20"
                          : "bg-error/10 text-error border border-error/20"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right text-xs text-base-content/50">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
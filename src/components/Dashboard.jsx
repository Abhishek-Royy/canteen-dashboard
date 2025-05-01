import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import {
  ChartBarIcon,
  TrashIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

const foodData = [
  { name: 'Monday', items: 120, waste: 15, revenue: 8500 },
  { name: 'Tuesday', items: 150, waste: 20, revenue: 9500 },
  { name: 'Wednesday', items: 180, waste: 25, revenue: 11000 },
  { name: 'Thursday', items: 140, waste: 18, revenue: 9000 },
  { name: 'Friday', items: 160, waste: 22, revenue: 10000 },
]

const wasteData = [
  { name: 'Food Waste', value: 35 },
  { name: 'Packaging', value: 25 },
  { name: 'Other', value: 15 },
]

const COLORS = ['#4F46E5', '#10B981', '#F59E0B']

const StatCard = ({ title, value, change, changeType, icon: Icon }) => (
  <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        <div className="mt-2 flex items-center">
          {changeType === 'increase' ? (
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          )}
          <span className={`ml-1 text-sm font-medium ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
            {change}
          </span>
        </div>
      </div>
      <div className="rounded-full bg-indigo-50 p-3">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
  </div>
)

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [newItem, setNewItem] = useState({ name: '', quantity: '' })

  const handleAddItem = (e) => {
    e.preventDefault()
    // Add your logic here to handle the new item
    setNewItem({ name: '', quantity: '' })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Food Items"
          value="750"
          change="12%"
          changeType="increase"
          icon={ChartBarIcon}
        />
        <StatCard
          title="Waste Generated"
          value="100 kg"
          change="8%"
          changeType="decrease"
          icon={TrashIcon}
        />
        <StatCard
          title="Daily Visitors"
          value="250"
          change="15%"
          changeType="increase"
          icon={UserGroupIcon}
        />
        <StatCard
          title="Revenue"
          value="₹25,000"
          change="20%"
          changeType="increase"
          icon={CurrencyDollarIcon}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Weekly Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={foodData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis dataKey="name" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5', strokeWidth: 2 }}
                  name="Revenue (₹)"
                />
                <Line
                  type="monotone"
                  dataKey="items"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2 }}
                  name="Food Items"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <h3 className="text-lg font-medium text-gray-900">Waste Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wasteData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {wasteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Add New Food Item</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <form onSubmit={handleAddItem} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">
              Food Item Name
            </label>
            <input
              type="text"
              id="itemName"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter food item name"
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter quantity"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  )
} 
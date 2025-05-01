import { useState } from 'react'
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const initialWasteData = [
  { date: '2024-03-01', food: 15, packaging: 8, other: 5 },
  { date: '2024-03-02', food: 12, packaging: 6, other: 4 },
  { date: '2024-03-03', food: 18, packaging: 9, other: 6 },
  { date: '2024-03-04', food: 14, packaging: 7, other: 4 },
  { date: '2024-03-05', food: 16, packaging: 8, other: 5 },
]

const wasteRecords = [
  { id: 1, date: '2024-03-05', type: 'Food', quantity: 16, notes: 'Leftover lunch items' },
  { id: 2, date: '2024-03-05', type: 'Packaging', quantity: 8, notes: 'Plastic containers' },
  { id: 3, date: '2024-03-05', type: 'Other', quantity: 5, notes: 'Paper waste' },
]

export default function WasteManagement() {
  const [wasteData] = useState(initialWasteData)
  const [records, setRecords] = useState(wasteRecords)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    quantity: '',
    notes: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setRecords([...records, { ...formData, id: Date.now() }])
    setIsModalOpen(false)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: '',
      quantity: '',
      notes: '',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Waste Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Waste Record
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Weekly Waste Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                <XAxis dataKey="date" className="text-sm" />
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
                <Bar dataKey="food" fill="#4F46E5" name="Food Waste (kg)" />
                <Bar dataKey="packaging" fill="#10B981" name="Packaging (kg)" />
                <Bar dataKey="other" fill="#F59E0B" name="Other (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Waste Records</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {records.map((record) => (
                  <tr key={record.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                      {record.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.type}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {record.quantity} kg
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">{record.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Add Waste Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Waste Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select waste type</option>
                  <option value="Food">Food</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 
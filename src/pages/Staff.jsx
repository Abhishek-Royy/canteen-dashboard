import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const initialStaff = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Chef',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    schedule: 'Morning Shift (6 AM - 2 PM)',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Cashier',
    email: 'jane.smith@example.com',
    phone: '+1 234 567 8901',
    schedule: 'Evening Shift (2 PM - 10 PM)',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Kitchen Helper',
    email: 'mike.johnson@example.com',
    phone: '+1 234 567 8902',
    schedule: 'Morning Shift (6 AM - 2 PM)',
  },
]

export default function Staff() {
  const [staff, setStaff] = useState(initialStaff)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    schedule: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingStaff) {
      setStaff(staff.map((s) => (s.id === editingStaff.id ? { ...formData, id: s.id } : s)))
    } else {
      setStaff([...staff, { ...formData, id: Date.now() }])
    }
    setIsModalOpen(false)
    setEditingStaff(null)
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      schedule: '',
    })
  }

  const handleEdit = (staffMember) => {
    setEditingStaff(staffMember)
    setFormData(staffMember)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaff(staff.filter((s) => s.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Staff Management</h1>
        <button
          onClick={() => {
            setEditingStaff(null)
            setFormData({
              name: '',
              role: '',
              email: '',
              phone: '',
              schedule: '',
            })
            setIsModalOpen(true)
          }}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Staff Member
        </button>
      </div>

      <div className="rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Schedule</th>
                <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staff.map((staffMember) => (
                <tr key={staffMember.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    {staffMember.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staffMember.role}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staffMember.email}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staffMember.phone}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{staffMember.schedule}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(staffMember)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(staffMember.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              {editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select role</option>
                  <option value="Chef">Chef</option>
                  <option value="Cashier">Cashier</option>
                  <option value="Kitchen Helper">Kitchen Helper</option>
                  <option value="Server">Server</option>
                </select>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                  Schedule
                </label>
                <select
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select schedule</option>
                  <option value="Morning Shift (6 AM - 2 PM)">Morning Shift (6 AM - 2 PM)</option>
                  <option value="Evening Shift (2 PM - 10 PM)">Evening Shift (2 PM - 10 PM)</option>
                  <option value="Night Shift (10 PM - 6 AM)">Night Shift (10 PM - 6 AM)</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingStaff(null)
                  }}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {editingStaff ? 'Update' : 'Add'} Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 
import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const initialFoodItems = [
  { id: 1, name: 'Veg Biryani', price: 120, category: 'Main Course', available: true },
  { id: 2, name: 'Chicken Curry', price: 150, category: 'Main Course', available: true },
  { id: 3, name: 'Veg Fried Rice', price: 100, category: 'Main Course', available: false },
  { id: 4, name: 'Samosa', price: 20, category: 'Snacks', available: true },
  { id: 5, name: 'Tea', price: 15, category: 'Beverages', available: true },
]

export default function FoodItems() {
  const [foodItems, setFoodItems] = useState(initialFoodItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    available: true,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingItem) {
      setFoodItems(foodItems.map(item => 
        item.id === editingItem.id ? { ...formData, id: item.id } : item
      ))
    } else {
      setFoodItems([...foodItems, { ...formData, id: Date.now() }])
    }
    setIsModalOpen(false)
    setEditingItem(null)
    setFormData({ name: '', price: '', category: '', available: true })
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData(item)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Food Items</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Food Item
        </button>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {foodItems.map((item) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.category}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{item.price}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      item.available
                        ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                        : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                    }`}
                  >
                    {item.available ? 'Available' : 'Not Available'}
                  </span>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
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
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Main Course">Main Course</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                  Available
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false)
                    setEditingItem(null)
                    setFormData({ name: '', price: '', category: '', available: true })
                  }}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {editingItem ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 
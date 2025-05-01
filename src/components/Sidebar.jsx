import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  HomeIcon,
  ChartBarIcon,
  TrashIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Food Items', href: '/food-items', icon: ChartBarIcon },
  { name: 'Waste Management', href: '/waste-management', icon: TrashIcon },
  { name: 'Staff', href: '/staff', icon: UserGroupIcon },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
]

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h2 className="text-lg font-semibold text-gray-900">Canteen Dashboard</h2>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      location.pathname === item.href ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="border-t border-gray-200 px-2 py-4">
              {secondaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon
                    className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 items-center px-4">
            <h2 className="text-lg font-semibold text-gray-900">Canteen Dashboard</h2>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-6 w-6 flex-shrink-0 ${
                      location.pathname === item.href ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="border-t border-gray-200 px-2 py-4">
              {secondaryNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <item.icon
                    className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 
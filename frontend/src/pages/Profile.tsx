import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../config/axios'

const Profile = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', profile: { bio: '', phone: '', address: '' } })
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get('/users/profile')
      setUser(response.data.data)
      setFormData({ name: response.data.data.name, profile: response.data.data.profile || {} })
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch profile')
      navigate('/login')
    }
  }

  const handleUpdate = async () => {
    try {
      await apiClient.put('/users/profile', formData)
      setEditing(false)
      fetchProfile()
    } catch (error) {
      console.error('Failed to update profile')
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">👤 My Profile</h1>

          {!editing ? (
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Name</p>
                <p className="text-xl font-semibold">{user?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="text-xl font-semibold">{user?.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Role</p>
                <p className="text-xl font-semibold capitalize">{user?.role}</p>
              </div>
              {user?.profile?.bio && (
                <div>
                  <p className="text-gray-600">Bio</p>
                  <p className="text-xl font-semibold">{user.profile.bio}</p>
                </div>
              )}
              <button
                onClick={() => setEditing(true)}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={formData.profile?.bio || ''}
                  onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, bio: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={formData.profile?.phone || ''}
                  onChange={(e) => setFormData({ ...formData, profile: { ...formData.profile, phone: e.target.value } })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
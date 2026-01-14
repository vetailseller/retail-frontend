import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/lib/store/authStore'
import { authService } from '@/lib/api/auth'
import { productService, Product } from '@/lib/api/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const router = useRouter()
  const { user, setUser, logout } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Fetch current user
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser()
        setUser(userData)
      } catch (err) {
        console.error('Failed to fetch user:', err)
      }
    }

    // Fetch products (example)
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const data = await productService.getAll({ page: 1, perPage: 10 })
        setProducts(data.data || [])
      } catch (err: any) {
        setError(err.message || 'Failed to load products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
    // Uncomment to fetch products when backend is ready
    // fetchProducts()
    setIsLoading(false)
  }, [setUser])

  const handleLogout = async () => {
    try {
      await authService.logout()
      logout()
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
      // Force logout even if API fails
      logout()
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold">Retail Dashboard</h1>
            <div className="flex items-center gap-4">
              {user && (
                <span className="text-sm text-gray-600">
                  Welcome, {user.name}
                </span>
              )}
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Card */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
              <CardDescription>
                Your Next.js retail frontend is ready
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This application is configured with:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>✓ Next.js 14.0.4 with Page Router</li>
                <li>✓ Axios API client</li>
                <li>✓ Authentication & Authorization</li>
                <li>✓ Zustand state management</li>
                <li>✓ React Hook Form</li>
                <li>✓ Tailwind CSS & shadcn/ui</li>
              </ul>
            </CardContent>
          </Card>

          {/* API Status Card */}
          <Card>
            <CardHeader>
              <CardTitle>API Status</CardTitle>
              <CardDescription>
                Reusable CRUD operations ready
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                The API client is configured with:
              </p>
              <ul className="space-y-1 text-sm">
                <li>✓ Automatic token injection</li>
                <li>✓ 401 handling & redirect</li>
                <li>✓ GET, POST, PUT, PATCH, DELETE</li>
                <li>✓ Error handling</li>
              </ul>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Example operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push('/products')}
              >
                View Products
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push('/products')}
              >
                Create Product
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => router.push('/products')}
              >
                Manage Inventory
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Products List Example */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Products (Example)</CardTitle>
              <CardDescription>
                This is a demo section. Connect to your backend to see real data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : error ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> Connect your backend API to see data. 
                    Update the API_BASE_URL in the .env.local file.
                  </p>
                  <p className="text-xs text-yellow-700 mt-2">
                    Error: {error}
                  </p>
                </div>
              ) : products.length > 0 ? (
                <div className="space-y-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex justify-between items-center p-3 border rounded-md"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${product.price}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No products found. Make sure your backend is running.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

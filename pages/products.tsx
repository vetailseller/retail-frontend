import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { productService, Product, CreateProductInput } from '@/lib/api/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductInput>()

  // Fetch products
  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      setError('')
      const data = await productService.getAll({ page: 1, perPage: 50 })
      setProducts(data.data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Create or Update product
  const onSubmit = async (data: CreateProductInput) => {
    try {
      if (editingId) {
        await productService.update(editingId, data)
      } else {
        await productService.create(data)
      }
      
      reset()
      setShowForm(false)
      setEditingId(null)
      fetchProducts()
    } catch (err: any) {
      setError(err.message || 'Failed to save product')
    }
  }

  // Edit product
  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    reset(product)
    setShowForm(true)
  }

  // Delete product
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await productService.delete(id)
      fetchProducts()
    } catch (err: any) {
      setError(err.message || 'Failed to delete product')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    reset()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold">Products Management</h1>
            <Button variant="outline" onClick={() => router.push('/')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-destructive/10 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        {/* Add/Edit Form */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </CardTitle>
                <CardDescription>
                  {showForm
                    ? 'Fill in the product details below'
                    : 'Click the button to add a new product'}
                </CardDescription>
              </div>
              {!showForm && (
                <Button onClick={() => setShowForm(true)}>Add Product</Button>
              )}
            </div>
          </CardHeader>

          {showForm && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register('price', {
                        required: 'Price is required',
                        min: { value: 0, message: 'Price must be positive' },
                      })}
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive">{errors.price.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      {...register('stock', {
                        required: 'Stock is required',
                        min: { value: 0, message: 'Stock must be non-negative' },
                      })}
                    />
                    {errors.stock && (
                      <p className="text-sm text-destructive">{errors.stock.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      {...register('description', {
                        required: 'Description is required',
                      })}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingId ? 'Update Product' : 'Create Product'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </form>
          )}
        </Card>

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Products List</CardTitle>
            <CardDescription>
              Manage your product inventory (Example - requires backend connection)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading products...</p>
            ) : products.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No products found.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add your first product or connect to your backend API.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="font-semibold text-green-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">
                          Stock: {product.stock}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

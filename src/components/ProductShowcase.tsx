import { useState } from 'react'
import { ChevronDown, ChevronUp, Star, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  price: string
  originalPrice?: string
  rating: number
  reviewCount: number
  image: string
  store: string
  discount?: string
}

interface ProductShowcaseProps {
  products: Product[]
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (products.length === 0) return null

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">AI Selected Products</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Expand
              </>
            )}
          </Button>
        </div>

        <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-48 overflow-hidden'}`}>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {products.map((product) => (
              <Card key={product.id} className="flex-shrink-0 w-64 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                      {product.discount && (
                        <Badge variant="destructive" className="text-xs">{product.discount}</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviewCount})</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{product.store}</Badge>
                      <Button size="sm" variant="outline" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
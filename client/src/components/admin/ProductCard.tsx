import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    imageUrl?: string;
    isOneOfOne: boolean | string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const categoryColors: Record<string, string> = {
    "workshop-ticket": "bg-purple-100 text-purple-800",
    "3d-model": "bg-blue-100 text-blue-800",
    diorama: "bg-pink-100 text-pink-800",
    canvas: "bg-green-100 text-green-800",
    mural: "bg-orange-100 text-orange-800",
  };

  const categoryColor = categoryColors[product.category] || "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all overflow-hidden group">
      {/* Image Preview */}
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-product.jpg";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">No Image</span>
          </div>
        )}
        
        {/* One-of-One Badge */}
        {(product.isOneOfOne === "true" || product.isOneOfOne === true) && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            1/1
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
          <span className="text-xl font-bold text-green-600">${parseFloat(product.price.toString()).toFixed(2)}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
              {product.category.replace("-", " ")}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              Stock: {product.stock}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="p-2 h-8 w-8"
              title="Edit Product"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="p-2 h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              title="Delete Product"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

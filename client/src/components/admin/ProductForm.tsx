import { useState, useEffect } from "react";
import { X, Upload, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    imageUrl?: string;
    isOneOfOne: boolean | string;
  };
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  isOneOfOne: boolean;
}

export default function ProductForm({ product, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    category: product?.category || "canvas",
    price: product?.price || 0,
    stock: product?.stock || 0,
    imageUrl: product?.imageUrl || "",
    isOneOfOne: typeof product?.isOneOfOne === "boolean" ? product.isOneOfOne : product?.isOneOfOne === "true",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});
  const [imagePreview, setImagePreview] = useState<string>(product?.imageUrl || "");
  const [imageError, setImageError] = useState(false);

  // Validate image URL when it changes
  useEffect(() => {
    if (formData.imageUrl) {
      const img = new Image();
      img.onload = () => {
        setImagePreview(formData.imageUrl);
        setImageError(false);
      };
      img.onerror = () => {
        setImageError(true);
        setImagePreview("");
      };
      img.src = formData.imageUrl;
    } else {
      setImagePreview("");
      setImageError(false);
    }
  }, [formData.imageUrl]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (imageError) {
      newErrors.imageUrl = "Image URL is invalid or unreachable";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{product ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter product description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.description}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="canvas">Canvas</option>
                  <option value="3d-model">3D Model</option>
                  <option value="diorama">Diorama</option>
                  <option value="mural">Mural</option>
                  <option value="workshop-ticket">Workshop Ticket</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-1">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.price}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium mb-1">Stock *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleChange("stock", parseInt(e.target.value) || 0)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.stock ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.stock}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium mb-1">Image URL *</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    errors.imageUrl ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.imageUrl && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.imageUrl}
                  </p>
                )}
              </div>

              {/* One-of-One */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isOneOfOne"
                  checked={formData.isOneOfOne}
                  onChange={(e) => handleChange("isOneOfOne", e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <label htmlFor="isOneOfOne" className="text-sm font-medium">
                  Mark as One-of-One (1/1)
                </label>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div>
              <label className="block text-sm font-medium mb-2">Preview</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                {imagePreview ? (
                  <div className="space-y-3">
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-white p-3 rounded-lg border">
                      <h3 className="font-bold text-lg">{formData.name || "Product Name"}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {formData.description || "Product description will appear here"}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xl font-bold text-green-600">
                          ${parseFloat(formData.price.toString()).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">Stock: {formData.stock}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video flex flex-col items-center justify-center text-gray-400">
                    <Upload className="w-12 h-12 mb-2" />
                    <p className="text-sm">Image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-black text-white">
              {isLoading ? "Saving..." : product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

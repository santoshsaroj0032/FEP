"use client"

import { Variant } from "@/types"

interface VariantSelectorProps {
  variants: Variant[]
  selectedVariant: Variant | null
  onSelectVariant: (variant: Variant) => void
}

export default function VariantSelector({ variants, selectedVariant, onSelectVariant }: VariantSelectorProps) {
  const colorGroups: Record<string, Variant[]> = {}
  variants.forEach((variant: Variant) => {
    if (!colorGroups[variant.color]) {
      colorGroups[variant.color] = []
    }
    colorGroups[variant.color].push(variant)
  })

  return (
    <div className="space-y-4">
      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
        <div className="flex gap-2 flex-wrap">
          {Object.keys(colorGroups).map((color: string) => (
            <button
              key={color}
              onClick={() => onSelectVariant(colorGroups[color][0])}
              className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                selectedVariant?.color === color
                  ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Storage Selection - Only show if there are multiple storage options for the selected color */}
      {selectedVariant && colorGroups[selectedVariant.color]?.length > 1 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Storage</h3>
          <div className="flex gap-2 flex-wrap">
            {colorGroups[selectedVariant.color]?.map((variant: Variant) => (
              <button
                key={variant.id}
                onClick={() => onSelectVariant(variant)}
                className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                  selectedVariant?.id === variant.id
                    ? "border-blue-600 bg-blue-50 text-blue-700 font-medium"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {variant.storage}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
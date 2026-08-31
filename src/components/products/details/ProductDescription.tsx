import React from 'react';
import { ProductFeature } from '@/types/product';

interface ProductDescriptionProps {
  description: string;
  features: ProductFeature[];
}

const ProductDescription = ({ description, features }: ProductDescriptionProps) => {
  return (
    <div className="space-y-6 text-sm text-base-content/80 leading-relaxed">
      <p className="whitespace-pre-line">{description}</p>

      {features.length > 0 && (
        <div>
          <h4 className="font-bold text-base-content text-base mb-3">
            Key Features:
          </h4>
          <ul className="list-disc list-inside space-y-2">
            {features.map((feat) => (
              <li key={feat.id}>{feat.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
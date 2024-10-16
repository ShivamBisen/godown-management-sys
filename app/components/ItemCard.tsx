import React from 'react';

// Define the structure of the item
interface ItemAttributes {
  type: string;
  material: string;
  warranty_years: number;
}

interface Item {
  item_id: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
  status: string;
  godown_id: string;
  brand: string;
  attributes: ItemAttributes;
  image_url: string;
}

const ItemCard: React.FC<{ item: Item | null }> = ({ item }) => {
  if (!item) return null; 

  return (
    <div className="flex flex-col border rounded-lg shadow-md p-4">
      <img
        src={item.image_url}
        alt={item.name}
        className="object-cover w-full h-64 rounded mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
      <p className="text-sm text-gray-600 mb-1">Brand: {item.brand}</p>
      <p className="text-sm text-gray-600 mb-1">Category: {item.category}</p>
      <p className="text-md font-semibold text-gray-800 mb-2">
        ${item.price.toFixed(2)}
      </p>
      <p
        className={`text-sm font-semibold mb-2 ${
          item.status === 'out_of_stock' ? 'text-red-500' : 'text-green-500'
        }`}
      >
        Status: {item.status === 'out_of_stock' ? 'Out of Stock' : 'In Stock'}
      </p>
      <div className="text-sm text-gray-600">
        <p>
          <strong>Type:</strong> {item.attributes.type}
        </p>
        <p>
          <strong>Material:</strong> {item.attributes.material}
        </p>
        <p>
          <strong>Warranty:</strong> {item.attributes.warranty_years} year(s)
        </p>
      </div>
    </div>
  );
};

export default ItemCard;

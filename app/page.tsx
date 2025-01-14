"use client";

import React, { useEffect, useState } from "react";
import ItemCard from "./components/ItemCard";
import Slidebar from "./components/Slidebar";

interface Item {
  item_id: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
  status: string;
  godown_id: string;
  brand: string;
  attributes: {
    type: string;
    material: string;
    warranty_years: number;
  };
  image_url: string;
}

export default function Page() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [godowns, setGodowns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await fetch('/api/items'); 
        const godownsResponse = await fetch('/api/godowns'); 
        
        if (!itemsResponse.ok || !godownsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const itemsData = await itemsResponse.json();
        const godownsData = await godownsResponse.json();

        setItems(itemsData);
        setGodowns(godownsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectItem = (item: Item | null) => {
    setSelectedItem(item);
  };

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="block md:flex text-gray-700">
      <Slidebar items={items} godowns={godowns} onSelectItem={handleSelectItem} />
      <div className="p-4 md:p-8 flex-1 bg-[#f5f5f7] text-gray-800 z-20">
        {selectedItem ? (
          <ItemCard item={selectedItem} />
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-xl">Please select an item from the list.</p>
          </div>
        )}
      </div>
    </div>
  );
}

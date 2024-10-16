"use client";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

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

interface Godown {
  id: string;
  name: string;
  children: Item[];
}

const Slidebar: React.FC<{ items: Item[]; godowns: Godown[]; onSelectItem: (item: Item) => void }> = ({ items, godowns, onSelectItem }) => {
  const [treeData, setTreeData] = useState<Godown[]>([]);

  useEffect(() => {
    
    const initializedGodowns = godowns.map(godown => ({
      ...godown,
      children: items.filter(item => item.godown_id === godown.id),
    }));

    setTreeData(initializedGodowns);
  }, [items, godowns]);

  return (
    <div className="w-64 border p-4 bg-white shadow-lg">
      <h3 className="font-bold text-lg mb-4">Godowns</h3>
      {treeData.map(node => (
        <TreeNode key={node.id} node={node} onSelectItem={onSelectItem} />
      ))}
    </div>
  );
};

const TreeNode: React.FC<{ node: Godown; onSelectItem: (item: Item) => void }> = ({ node, onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-2">
      <div
        onClick={toggleNode}
        className="cursor-pointer flex items-center"
      >
        {node.children.length > 0 && (
          <span className="mr-2">
            {isOpen ? <FaAngleDown /> : <FaAngleRight />}
          </span>
        )}
        <span className="font-bold text-lg text-gray-800">{node.name}</span> {/* Updated styles */}
      </div>
      {isOpen && (
        <div className="pl-4">
          {node.children.map((item) => (
            <div
              key={item.item_id}
              onClick={() => onSelectItem(item)}
              className="cursor-pointer text-sm text-blue-600 hover:underline mb-1"
            >
              {item.name} ({item.quantity} in stock)
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slidebar;

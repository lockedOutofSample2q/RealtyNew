"use client";

import { Plus, Trash2 } from "lucide-react";

interface Column {
  key: string;
  label: string;
  type?: "text" | "number" | "url" | "textarea" | "checkbox";
}

interface DynamicListFieldProps {
  label: string;
  value: any[];
  onChange: (val: any[]) => void;
  emptyItem: any;
  columns: Column[];
  addButtonText?: string;
}

export default function DynamicListField({
  label,
  value,
  onChange,
  emptyItem,
  columns,
  addButtonText = "Add Item",
}: DynamicListFieldProps) {
  const items = Array.isArray(value) ? value : [];

  const handleAdd = () => {
    onChange([...items, { ...emptyItem }]);
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  const handleChange = (index: number, key: string, val: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: val };
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block font-body text-xs text-gray-500 uppercase tracking-wide font-medium">
          {label}
        </label>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md"
        >
          <Plus size={14} />
          {addButtonText}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-6 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
          <p className="text-sm text-gray-400 font-body">No items added yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg relative group"
            >
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {columns.map((col) => (
                  <div key={col.key} className={col.type === "textarea" ? "sm:col-span-2" : ""}>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                      {col.label}
                    </label>
                    {col.type === "textarea" ? (
                      <textarea
                        value={item[col.key] || ""}
                        onChange={(e) => handleChange(index, col.key, e.target.value)}
                        className="w-full bg-white border border-gray-200 text-gray-900 rounded-md font-body text-sm px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                        rows={2}
                      />
                    ) : col.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={item[col.key] || false}
                        onChange={(e) => handleChange(index, col.key, e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    ) : (
                      <input
                        type={col.type || "text"}
                        value={item[col.key] || ""}
                        onChange={(e) => handleChange(index, col.key, e.target.type === "number" ? +e.target.value : e.target.value)}
                        className="w-full bg-white border border-gray-200 text-gray-900 rounded-md font-body text-sm px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors mt-4 shrink-0"
                title="Remove Item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useRef, useState } from "react";
import Icon from "./AdminIcons";
import { createProduct, updateProduct } from "../../api/productApi";

export default function ProductFormModal({ initial, onClose, onSaved, showToast }) {
  const isEdit = Boolean(initial);
  const [name, setName] = useState(initial?.name || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [stock, setStock] = useState(initial?.stock ?? "");
  const [description, setDescription] = useState(initial?.description || "");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState(initial?.images || []);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    const room = 5 - previews.length;
    if (room <= 0) {
      showToast("You can attach up to 5 photos per product.", "error");
      return;
    }
    const accepted = incoming.slice(0, room);
    setFiles((prev) => [...prev, ...accepted]);
    setPreviews((prev) => [...prev, ...accepted.map((f) => URL.createObjectURL(f))]);
  };

  const removePreview = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || price === "" || stock === "") {
      showToast("Fill in name, price, and stock before saving.", "error");
      return;
    }
    setSaving(true);
    try {
      const fields = { name, category, price, stock, description };
      if (isEdit) {
        await updateProduct(initial._id, fields, files);
        showToast("Product updated.");
      } else {
        await createProduct(fields, files);
        showToast("Product added.");
      }
      onSaved();
    } catch (err) {
      showToast(err?.response?.data?.message || "Couldn't save this product. Try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#1A1A2E]/40 px-2 sm:px-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FFFBF5] rounded-3xl shadow-xl">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 border-b border-[#EEE7DA]">
          <h2 className="text-xl font-[700] text-[#1A1A2E]" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
            {isEdit ? "Edit product" : "Add a new product"}
          </h2>
          <button onClick={onClose} className="text-[#8A897F] hover:text-[#1A1A2E]" aria-label="Close">
            <Icon.x className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-4 sm:px-6 sm:py-5 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Glazed ring donut"
              className="w-full rounded-xl border border-[#DCD5C6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C6FEB]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Classic"
                className="w-full rounded-xl border border-[#DCD5C6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C6FEB]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="3.50"
                className="w-full rounded-xl border border-[#DCD5C6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C6FEB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Stock</label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="24"
              className="w-full rounded-xl border border-[#DCD5C6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C6FEB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What makes this one worth the calories?"
              className="w-full rounded-xl border border-[#DCD5C6] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1C6FEB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] mb-1">
              Photos <span className="text-[#8A897F] font-normal">({previews.length}/5)</span>
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                addFiles(e.dataTransfer.files);
              }}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed px-4 py-6 text-center cursor-pointer transition-colors ${
                dragOver ? "border-[#1C6FEB] bg-[#E6F1FB]" : "border-[#DCD5C6] bg-white"
              }`}
            >
              <Icon.upload className="w-5 h-5 text-[#1C6FEB]" />
              <p className="text-sm text-[#1A1A2E]">Drop photos here, or click to browse</p>
              <p className="text-xs text-[#8A897F]">Up to 5 images</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>

            {previews.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {previews.map((src, i) => (
                  <div key={i} className="relative w-16 h-16">
                    <img src={src} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-[#1C6FEB]" />
                    <button
                      type="button"
                      onClick={() => removePreview(i)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#1A1A2E] text-white flex items-center justify-center"
                      aria-label="Remove photo"
                    >
                      <Icon.x className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm font-medium text-[#1A1A2E] hover:bg-[#EEE7DA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-full text-sm font-[700] text-white bg-[#1C6FEB] hover:bg-[#0D47A8] disabled:opacity-60"
            >
              {saving ? "Saving..." : isEdit ? "Save changes" : "Add product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

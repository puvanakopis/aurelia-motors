'use client';

import * as React from 'react';
import Image from 'next/image';
import { Layers, Plus, Trash2, Edit, Search, X, Sparkles } from 'lucide-react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/api';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(null);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('/images/categories/suv.jpg');
  const [isSaving, setIsSaving] = React.useState(false);

  const fetchItems = () => {
    setIsLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setImageUrl('/images/categories/suv.jpg');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setEditingCategory(c);
    setName(c.name);
    setDescription(c.description || '');
    setImageUrl(c.imageUrl || '/images/categories/suv.jpg');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, { name, description, imageUrl });
      } else {
        await createCategory({ name, description, imageUrl });
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to save category');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you wish to delete this body style category?')) return;
    try {
      await deleteCategory(id);
      fetchItems();
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const filtered = categories.filter((c) => {
    return c.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8D6] text-stone-900 border border-[#FEE123] text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5 text-black" />
            <span>Body Styles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Vehicle Categories & Classes
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Organize fleet inventory into curated segments (Coupes, Grand Tourers, SUVs, Electric).
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-5 py-3 bg-[#FEE123] hover:bg-[#FDD835] active:bg-[#F5CB23] text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 self-start cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Add Body Style</span>
        </button>
      </div>

      {/* Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search categories by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black rounded-xl px-4 py-2.5 pl-10 text-xs text-[#111215] placeholder:text-stone-400 shadow-sm outline-none transition-all"
          />
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E8] rounded-xl text-xs font-semibold text-stone-600 shadow-sm self-start sm:self-auto">
          <span>Total Categories:</span>
          <span className="font-bold text-stone-900">{filtered.length} categories</span>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E8] bg-[#F8F8FA] text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="p-4 pl-6">Body Style Category</th>
                <th className="p-4">Description</th>
                <th className="p-4">Fleet Allocation</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E8] text-xs text-stone-700">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-stone-500">
                    <div className="w-6 h-6 border-2 border-[#FEE123] border-t-black rounded-full animate-spin mx-auto mb-2" />
                    Loading categories...
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#121316] text-[#FEE123] flex items-center justify-center font-bold text-sm shadow-sm">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-[#111215] text-sm">{c.name}</p>
                          <p className="text-[10px] text-stone-400">Slug: {c.slug}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 max-w-md">
                      <p className="text-stone-600 line-clamp-2">
                        {c.description || 'Specialized automotive architecture segment.'}
                      </p>
                    </td>

                    <td className="p-4">
                      <span className="inline-block px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-xs font-bold text-stone-800">
                        {c.vehicleCount || 0} listings
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-2 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit Category"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-stone-500">
                    No categories found matching query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E5E5E8] w-full max-w-lg p-6 sm:p-8 space-y-6 shadow-2xl text-[#111215]">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E5E8]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Category Configuration
                </span>
                <h3 className="text-xl font-extrabold text-[#111215]">
                  {editingCategory ? 'Edit Body Style' : 'Add New Body Style'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-black hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Coupé, Grand Tourer, Electric SUV"
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Hero Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/categories/suv.jpg"
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl px-4 py-2.5 text-xs text-[#111215] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Description & Characteristics
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Overview of body architecture and lifestyle suitability..."
                  className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black rounded-xl p-3 text-xs text-[#111215] outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E5E8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-[#F4F4F6] hover:bg-[#E5E5E8] text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

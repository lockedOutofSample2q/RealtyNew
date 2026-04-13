"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import type { Property } from "@/types";
import { MapPin, Building2, Save, X, Search, Check } from "lucide-react";
import Image from "next/image";

type Section = {
  id: string;
  name: string;
  description: string;
  maxItems?: number;
};

const SECTIONS: Section[] = [
  { id: "home_hero", name: "Home Page Hero", description: "The main hero property displayed prominently on the homepage.", maxItems: 1 },
  { id: "home_latest", name: "Home Page: Properties Worth Looking At", description: "First properties carousel on the homepage." },
  { id: "home_lands", name: "Home Page: Land Listings", description: "Second properties carousel on the homepage." },
  { id: "properties_featured", name: "Properties Page Highlights", description: "Featured properties displayed on the properties search page." },
];

export default function FeaturedClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSections, setSelectedSections] = useState<Record<string, string[]>>({});
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const supabase = createClient();

  const loadProperties = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("properties")
      .select("id, title, location, community, images, price, price_currency, featured_sections")
      .order("created_at", { ascending: false });

    if (data) {
      setProperties(data as Property[]);
      
      const newSelected: Record<string, string[]> = {};
      SECTIONS.forEach((s) => { newSelected[s.id] = []; });

      data.forEach((p: any) => {
        if (p.featured_sections) {
          p.featured_sections.forEach((sec: string) => {
            if (newSelected[sec]) newSelected[sec].push(p.id);
          });
        }
      });
      setSelectedSections(newSelected);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleToggleProperty = (propId: string) => {
    setSelectedSections((prev) => {
      const sectionItems = prev[activeSection] || [];
      const sectionDef = SECTIONS.find(s => s.id === activeSection);
      
      if (sectionItems.includes(propId)) {
        return { ...prev, [activeSection]: sectionItems.filter(id => id !== propId) };
      }
      
      if (sectionDef?.maxItems && sectionItems.length >= sectionDef.maxItems) {
        alert(`This section only allows up to ${sectionDef.maxItems} item(s).`);
        return prev;
      }
      return { ...prev, [activeSection]: [...sectionItems, propId] };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // For each property, calculate its new sections
      for (const p of properties) {
        const newSections: string[] = [];
        Object.entries(selectedSections).forEach(([sec, list]) => {
          if (list.includes(p.id)) newSections.push(sec);
        });

        // Only update if changed
        const oldSections = p.featured_sections || [];
        if (JSON.stringify(newSections.sort()) !== JSON.stringify(oldSections.sort())) {
          await supabase
            .from("properties")
            .update({ featured_sections: newSections })
            .eq("id", p.id);
        }
      }
      alert("Featured sections saved successfully!");
      loadProperties();
    } catch (err: any) {
      alert("Error saving: " + err.message);
    }
    setSaving(false);
  };

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Featured Placements</h1>
          <p className="text-gray-500 mt-1">Select which properties appear in specific sections across the website.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-monter text-white rounded-lg hover:bg-monter/90 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-2">
          {SECTIONS.map((sec) => {
            const count = selectedSections[sec.id]?.length || 0;
            const max = sec.maxItems ? ` / ${sec.maxItems}` : "";
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeSection === sec.id
                    ? "bg-monter/5 border-monter shadow-sm"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${activeSection === sec.id ? 'text-monter' : 'text-gray-900'}`}>
                    {sec.name}
                  </h3>
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {count}{max}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">{sec.description}</p>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">
              Selecting for: {SECTIONS.find((s) => s.id === activeSection)?.name}
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-monter focus:ring-1 focus:ring-monter"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredProperties.map((p) => {
              const isSelected = selectedSections[activeSection]?.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => handleToggleProperty(p.id)}
                  className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-monter bg-monter/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    {p.images?.[0] ? (
                      <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                    ) : (
                      <Building2 className="w-6 h-6 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{p.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{p.community}, {p.location}</span>
                    </div>
                  </div>
                  <div className="text-right pr-4">
                    <div className="font-semibold text-gray-900">
                      {p.price_currency} {p.price?.toLocaleString()}
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? "bg-monter border-monter" : "border-gray-300"
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
              );
            })}
            {filteredProperties.length === 0 && (
              <div className="text-center text-gray-500 py-12">No properties align with your search.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
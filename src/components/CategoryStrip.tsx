import type { Category } from "@/types";

interface CategoryStripProps {
  categories: Category[];
  selected: string | null;
  onSelect: (slug: string) => void;
}

export function CategoryStrip({ categories, selected, onSelect }: CategoryStripProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
      <button
        onClick={() => onSelect("")}
        className={`shrink-0 flex flex-col items-center gap-2 transition-all ${
          selected === "" || !selected ? "scale-105" : "opacity-70 hover:opacity-100"
        }`}
      >
        <div
          className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
            !selected || selected === ""
              ? "border-rose-500"
              : "border-transparent"
          } transition-colors`}
        >
          <div className="w-full h-full bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-white text-2xl font-bold">
            All
          </div>
        </div>
        <span className="text-xs font-medium text-gray-700">All</span>
      </button>

      {categories.map((cat) => {
        const isActive = selected === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.slug)}
            className={`shrink-0 flex flex-col items-center gap-2 transition-all ${
              isActive ? "scale-105" : "opacity-70 hover:opacity-100"
            }`}
          >
            <div
              className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
                isActive ? "border-rose-500" : "border-transparent"
              } transition-colors`}
            >
              <img
                src={cat.image_url}
                alt={cat.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center max-w-[5rem] truncate">
              {cat.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

import { useAppContext } from "@/context/AppContext";

export default function FilterBar() {
  const { filterLevel, setFilterLevel, currentUser } = useAppContext();

  const filters: {
    level: "GLOBAL" | "NATIONAL" | "INSTITUTION";
    label: string;
  }[] = [
    { level: "GLOBAL", label: "🌍 Global" },
    { level: "NATIONAL", label: "🇧🇷 Nacional" },
    { level: "INSTITUTION", label: "🏛️ Minha Instituição" },
  ];

  const handleFilterClick = (level: "GLOBAL" | "NATIONAL" | "INSTITUTION") => {
    if (currentUser?.role === "ADVENTURER" && level !== "GLOBAL") {
      alert(
        "Acesso restrito. Conteúdo Nacional/Institucional disponível apenas para Universitários verificados."
      );
      return;
    }
    setFilterLevel(level);
  };

  return (
    <div className="flex justify-start gap-4 p-3 bg-white shadow-md rounded-lg mb-6 sticky top-0 z-10">
      {filters.map((filter) => (
        <button
          key={filter.level}
          onClick={() => handleFilterClick(filter.level)}
          className={`
            px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200
            ${
              filterLevel === filter.level
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

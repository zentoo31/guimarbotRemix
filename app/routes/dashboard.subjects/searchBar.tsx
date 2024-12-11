import { useState, useEffect } from "react";
import { Subject } from "~/models/subject";
import { SubjectService } from "~/services/subject.service";
import { Image } from "@nextui-org/react";

interface SearchBarProps {
  onSelect?: (selectedId: string | null) => void; 
}

function SearchBar({ onSelect }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const subjectService = new SubjectService();

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!searchQuery.trim()) {
        setFilteredSubjects([]);
        return;
      }

      setLoading(true);
      try {
        const subjects = await subjectService.getSubjectsByTitle(searchQuery);
        setFilteredSubjects(subjects);
      } catch (error) {
        console.error("Error al buscar materias:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchSubjects, 300); // Evitar llamadas innecesarias
    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setSearchQuery(""); // Limpiar la búsqueda
    setFilteredSubjects([]); // Ocultar los resultados

    if (onSelect) {
      onSelect(subject._id); // Emitir el ID al padre
    }
  };

  const handleClearSelection = () => {
    setSelectedSubject(null); // Quitar selección

    if (onSelect) {
      onSelect(null); // Emitir null al padre
    }
  };

  return (
    <div >
      <div className="relative mt-1">
        {/* Input de búsqueda */}
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="subject-search"
          className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar materias"
          value={searchQuery}
          onChange={handleInputChange}
          disabled={!!selectedSubject} // Deshabilitar cuando hay selección
        />
        {/* Mostrar resultados */}
        {!selectedSubject && filteredSubjects.length > 0 && (
          <div className="absolute z-10 w-full bg-[#374151] rounded-lg shadow-md mt-1">
            {filteredSubjects.map((subject) => (
              <div
                key={subject._id}
                className="px-4 py-2 hover:bg-[#5c6980] rounded-lg cursor-pointer text-gray-400"
                onClick={() => handleSelectSubject(subject)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelectSubject(subject);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {subject.title}
              </div>
            ))}
          </div>
        )}
        {/* Cargando */}
        {loading && !selectedSubject && (
          <div className="absolute z-10 w-full rounded-lg shadow-md mt-1">
            <div className="px-4 py-2 text-gray-400 rounded-lg bg-[#374151]">
              Cargando...
            </div>
          </div>
        )}
        {/* Mostrar mensaje si no hay resultados */}
        {!selectedSubject && filteredSubjects.length === 0 && searchQuery && !loading && (
          <div className="absolute z-10 w-full rounded-lg shadow-md mt-1">
            <div className="px-4 py-2 text-gray-400 rounded-lg bg-[#374151]">
              No se han encontrado resultados
            </div>
          </div>
        )}
      </div>

      {/* Mostrar materia seleccionada */}
      {selectedSubject && (
        <div className="mt-4 flex items-center gap-4 bg-[#374151] text-gray-400 px-4 py-2 rounded-lg">
          <Image
            src={selectedSubject.image}
            alt={selectedSubject.title}
            className="w-12 h-12 object-cover rounded-full"
          />
          <span>{selectedSubject.title}</span>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleClearSelection}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;

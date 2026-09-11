import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

type Photo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

function DebounceSearchDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [data, setData] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = debouncedSearchTerm.trim();

    if (!query) {
      setData([]);
      setError("");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setError("");

    fetch("https://jsonplaceholder.typicode.com/photos", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        return response.json();
      })
      .then((photos: Photo[]) => {
        const filteredData = photos.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        );
        setData(filteredData);
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") {
          return;
        }
        setError("Could not load search results.");
        setData([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [debouncedSearchTerm]);

  return (
    <section className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
      <h2 className="text-center text-xl font-semibold text-slate-800">
        Debounce Search Demo
      </h2>
      <p className="mt-1 text-center text-sm text-slate-500">
        Results update 500ms after you stop typing
      </p>

      <label
        htmlFor="search"
        className="mt-4 mb-1 block text-sm font-medium text-slate-600"
      >
        Search:
      </label>
      <input
        id="search"
        type="text"
        placeholder="Try a word from a photo title, like accusamus"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
      />

      <p className="mt-3 text-sm text-slate-500">
        Debounced search term:{" "}
        <span className="font-medium text-slate-700">
          {debouncedSearchTerm || "—"}
        </span>
      </p>

      {isLoading && (
        <p className="mt-4 text-sm text-sky-700">Searching...</p>
      )}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {!isLoading && !error && debouncedSearchTerm.trim() && data.length === 0 && (
        <p className="mt-4 text-sm text-slate-500">No matching titles.</p>
      )}

      <ul className="mt-4 max-h-72 space-y-2 overflow-y-auto">
        {data.map((item) => (
          <li
            key={item.id}
            className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DebounceSearchDemo;

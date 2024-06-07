import { useEffect, useState } from "react";
import { Character } from "./Types/character";

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const getCharactersFromApi = async () => {
    const req = await fetch("https://hp-api.onrender.com/api/characters");
    const data = (await req.json()) as Character[];
    const slicedData = data.slice(0, 20);
    setCharacters(slicedData);
  };

  getCharactersFromApi();

  useEffect(() => {
    getCharactersFromApi();
  }, []);

  return (
    <div className="bg-zinc-900 px-4 pt-10">
      <div className="mx-auto max-w-5xl px-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-md bg-zinc-200"
            >
              <div className="flex gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-[3/4] h-[200px] object-cover"
                />
                <div>
                  <strong className="text-lg">{item.name}</strong>
                  <p>{item.gender === "male" ? "Masculino" : "Feminino"}</p>
                  <p>{item.house}</p>
                  <p>{item.hogwartsStudent ? "Estudante" : "Egresso"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// https://hp-api.onrender.com/api/characters

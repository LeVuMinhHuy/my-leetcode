"use client";

import { updateProblem } from "@/services/updateProblem";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function DataTableFavorite({
  id,
  favorite,
}: {
  id: number;
  favorite: boolean;
}) {
  const router = useRouter();
  const [fav, setFav] = useState(favorite);

  const onChangeFavorite = useCallback(async () => {
    const res = await updateProblem(id, { favorite: !fav }, false);
    if (res) {
      setFav(!fav);
    }
  }, [fav]);

  return (
    <Star
      size={16}
      className={`ml-6 cursor-pointer transition-colors ${
        fav ? "fill-yellow-500 text-yellow-500" : "fill-none text-gray-400"
      }`}
      onClick={onChangeFavorite}
    />
  );
}

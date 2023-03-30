import { useState, useEffect, KeyboardEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import cache from "../../utils/cache";
import { TO_DO } from "../../constants";
import { EActions, IToDo } from "./types";

const useToDo = () => {
  const toDos = cache.getItem(TO_DO) || [];
  const [doings, setDoings] = useState<IToDo[]>(toDos);
  const [newDoing, setNewDoing] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const totalDoings = doings.length;
  const doneDoings = doings.filter((doing) => doing.done).length;

  useEffect(() => {
    cache.setItem(TO_DO, doings);
  }, [doings]);

  const handleAdd = () => {
    if (newDoing) {
      const upDated = [
        ...doings,
        { task: newDoing, done: false, id: uuidv4() },
      ];
      setDoings(upDated);
      setNewDoing("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<any>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const handleDelete = (id: string) => {
    const filteredDoings = doings.filter((doing) => doing.id !== id);
    setDoings(filteredDoings);
  };

  const handleDone = (id: string) => {
    const filteredDoings = doings.map((doing) => {
      if (doing.id === id) {
        doing.done ? (doing.done = false) : (doing.done = true);
        return doing;
      }
      return doing;
    });
    setDoings(filteredDoings);
  };

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((itemId) => itemId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleBatchActions = (action: EActions) => {
    if (action === EActions.delete) {
      const processedDoings = doings.filter(
        (doing) => !selected.find((rm) => rm === doing.id)
      );
      setDoings(processedDoings);
    }

    if (action === EActions.toggleDone) {
      const processedDoings = doings.map((doing) => {
        if (selected.find((rm) => rm === doing.id)) {
          doing.done ? (doing.done = false) : (doing.done = true);
          return doing;
        }
        return doing;
      });
      setDoings(processedDoings);
    }

    setSelected([]);
  };

  const isIncludeSearch = (parent: string) => {
    return parent.toLowerCase().includes(searchFilter.toLowerCase());
  };

  return {
    doings,
    newDoing,
    selected,
    doneDoings,
    isFiltered,
    totalDoings,
    searchFilter,
    handleAdd,
    handleDone,
    setNewDoing,
    handleDelete,
    handleSelect,
    handleKeyDown,
    setIsFiltered,
    isIncludeSearch,
    setSearchFilter,
    handleBatchActions,
  };
};

export default useToDo;

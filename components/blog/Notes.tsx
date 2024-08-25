"use client"
import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Notes = () => {
  const [data, setData] = useState<Note[]>([]);
  const colors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff"];

  // Interface for a Note object
  interface Note {
    id: string; // Unique identifier for each note
    content: string;
  }

  useEffect(() => {
    const existingDataString = localStorage.getItem("myData");

    if (existingDataString) {
      const existingData: Note[] = JSON.parse(existingDataString);
      setData(existingData);
    }
  }, []);

  const handleDeleteNote = (noteId: string) => {
    const newData = data.filter((note) => note.id !== noteId); // Filter out the note to be deleted
    setData(newData);
    localStorage.setItem("myData", JSON.stringify(newData)); // Update localStorage
  };

  return (
    <div className="max-w-6xl mx-auto px-5">
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 1024: 3 }}>
        <Masonry gutter="20px">
          {data.map((item: Note, idx: number) => (
            <div key={item.id} style={{ color: colors[idx % colors.length] }}>
              <div
                className="px-4 py-3 font-bold text-sky-800"
                style={{ backgroundColor: colors[idx % colors.length] }}
              >
                Note - {idx + 1}
              </div>
              <div
                className="ProseMirror whitespace-pre-line border border-slate-700 px-6 py-4 rounded-lg"
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
              <button onClick={() => handleDeleteNote(item.id)}>
                Delete
              </button>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Notes;
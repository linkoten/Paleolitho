"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Image,
  Heading1,
  Heading6,
  Heading5,
  Heading4,
  Heading3,
  Table,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  editor: Editor | null;
  content: JSON;
};

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) {
    return null;
  }

  const addImage = (e: any) => {
    const url = prompt("Enter the image URL");
    if (url) {
      e.preventDefault();
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

 

  console.log(content);
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-300 text-black fill-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Heading1 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Heading2 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Heading3 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={
            editor.isActive("heading", { level: 4 })
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Heading4 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          }}
          className={
            editor.isActive("heading", { level: 5 })
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Heading5 className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 6 }).run();
          }}
          className={
            editor.isActive("heading", { level: 6 })
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Heading6 className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) =>{
            e.preventDefault();
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }}
          className={
            editor.isActive("table")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Table className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
        <button
  onClick={(e: any) => addImage(e)}
  className={
            editor.isActive("setImage")
              ? "bg-sky-300 text-black p-2 rounded-lg"
              : "text-sky-800 hover:bg-sky-300 hover:text-black p-1 hover:rounded-lg"
          }
        >
          <Image className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={(e) =>{
            e.preventDefault();
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }}
        >
          Insert table
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().addColumnBefore().run()}}>
          Add column before
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().addColumnAfter().run()}}>
          Add column after
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().deleteColumn().run()}}>
         Delete column
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().addRowBefore().run()}}>
         Add row before
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().addRowAfter().run()}}>
          Add row after
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().deleteRow().run()}}>
          Delete row
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().deleteTable().run()}}>
         Delete table
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().mergeCells().run()}}>
          Merge cells
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().splitCell().run()}}>
          Split cell
        </Button>
        <Button
          onClick={(e) =>{e.preventDefault(); editor.chain().focus().toggleHeaderColumn().run()}}
        >
          Toggle header column
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().toggleHeaderRow().run()}}>
          Toggle header row
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().toggleHeaderCell().run()}}>
          Toggle header cell
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().mergeOrSplit().run()}}>
        Merge or split
        </Button>
        <Button
          onClick={(e) =>{e.preventDefault();
            editor.chain().focus().setCellAttribute("colspan", 2).run()
          }}
        >
          Set cell attribute
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().fixTables().run()}}>       Fix tables
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().goToNextCell().run()}}>
          Go to next cell
        </Button>
        <Button onClick={(e) =>{e.preventDefault(); editor.chain().focus().goToPreviousCell().run()}}>
          Go to previous cell
        </Button>
      </div>
      {content && (
        <>
          <Label> Titre </Label>
          <Input name="title" />
          <Label> Image de Couverture</Label>

          <Input name="coverImage" />
          <Label> Extrait </Label>

          <Input name="excerpt" />

          <button
            name="content"
            type="submit"
            value={JSON.stringify(content)} // Convertir le contenu JSON en chaîne de caractères
            className="px-4 bg-sky-300 text-black py-2 rounded-md"
          >
            Add
          </button>
        </>
      )}
    </div>
  );
};

export default Toolbar;

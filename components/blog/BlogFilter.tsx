"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function BlogFilter({ options, onFilterChange }: any) {

 

  return (
    <div className=" flex justify-center items-center pt-4">
      <label htmlFor="filterSelect"></label>
      <Select onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem
              className="font-style: font-semibold italic text-left"
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default BlogFilter;

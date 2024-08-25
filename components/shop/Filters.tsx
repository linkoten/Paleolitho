"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

export default function Filters(items: any) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = useDebouncedCallback((key, value) => {
    console.log(`Filtering... ${key}: ${value}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const uniqueCountries = Array.from(
    new Set(items.items.map((item: any) => item.country))
  );
  const uniqueLocality = Array.from(
    new Set(items.items.map((item: any) => item.locality))
  );
  const uniquePeriod = Array.from(
    new Set(items.items.map((item: any) => item.period))
  );
  const uniqueStages = Array.from(
    new Set(items.items.map((item: any) => item.stages))
  );

  return (
    <div className="relative flex flex-1 flex-shrink-0 w-full space-x-2 justify-around pt-4">
        <div>
      <Label  className="sr-only">
        Country
      </Label>
      <Select
        onValueChange={(value: string) => handleSelect("country", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Country"> Country</SelectItem>
          {uniqueCountries.map((country: any) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>
      <div>
      <Label  className="sr-only">
        Locality
      </Label>
      <Select
        onValueChange={(value: string) => handleSelect("locality", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Locality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Locality"> Locality</SelectItem>
          {uniqueLocality.map((locality: any) => (
            <SelectItem key={locality} value={locality}>
              {locality}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>
      <div>
      <Label  className="sr-only">
        Period
      </Label>
      <Select
        onValueChange={(value: string) => handleSelect("period", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Period"> Period</SelectItem>
          {uniquePeriod.map((period: any) => (
            <SelectItem key={period} value={period}>
              {period}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>
      <div>
      <Label  className="sr-only">
        Stages
      </Label>
      <Select
        onValueChange={(value: string) => handleSelect("stages", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Stages" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Stages"> Stages</SelectItem>
          {uniqueStages.map((stages: any) => (
            <SelectItem key={stages} value={stages}>
              {stages}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>
    </div>
  );
}

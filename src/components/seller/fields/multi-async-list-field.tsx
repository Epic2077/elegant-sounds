// multi-async-list.tsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { debounce } from "lodash";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { FormItem, FormLabel } from "@/components/ui/form";
import { LoaderCircle, X } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

type Props<T extends { id: string }> = {
  name: string;
  bg?: string;
  defaultValue?: T[];
  isLoading: boolean;
  options: T[];
  groupBy?: (option: T) => string;
  getOptionLabel: (option: T) => string;
  label: string;
  setQuery: (q: string) => void;
};

export default function MultiAsyncListField<T extends { id: string }>({
  name,
  defaultValue,
  isLoading,
  options = [],
  bg,
  groupBy,
  getOptionLabel,
  label,
  setQuery,
}: Props<T>) {
  const [inputValue, setInputValue] = useState("");
  const [values, setValues] = useState<T[]>([]);
  const [open, setOpen] = useState(false);
  const form = useForm();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultValue) setValues(defaultValue);
  }, [defaultValue]);

  const updateQuery = useCallback(
    (inputValue: string) => {
      debounce(() => setQuery(inputValue), 500)();
    },
    [setQuery]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const groupedOptions = groupBy
    ? options.reduce((acc, option) => {
        const key = groupBy(option);
        if (!acc[key]) acc[key] = [];
        acc[key].push(option);
        return acc;
      }, {} as Record<string, T[]>)
    : { "": options };

  return (
    <FormProvider {...form}>
      <FormItem className="w-full">
        {values.map((v, index) => (
          <input
            type="hidden"
            key={v.id}
            name={`${name}.${index}`}
            value={v.id}
          />
        ))}

        <FormLabel>{label}</FormLabel>
        <Command
          shouldFilter={false}
          className="overflow-visible bg-transparent"
        >
          <div ref={wrapperRef} className="relative">
            <CommandInput
              value={inputValue}
              onClick={() => setOpen(true)}
              onValueChange={(val) => {
                setInputValue(val);
                updateQuery(val);
                setOpen(true);
              }}
              placeholder={label}
              className={bg}
            />
            <div className="absolute top-2 right-2">
              {isLoading && (
                <div className="w-4 h-4">
                  <LoaderCircle className="text-sm animate-spin" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-1 mt-1 flex-wrap">
            {values.map((value) => (
              <Badge key={value.id} variant="secondary">
                {getOptionLabel(value)}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setValues(values.filter((v) => v.id !== value.id))
                  }
                />
              </Badge>
            ))}
          </div>

          {open && (
            <>
              {Object.entries(groupedOptions).map(([group, items]) => (
                <CommandGroup key={group} heading={group}>
                  {items.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={option.id}
                      onSelect={() => {
                        setValues((prev) =>
                          prev.some((v) => v.id === option.id)
                            ? prev.filter((v) => v.id !== option.id)
                            : [...prev, option]
                        );
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={values.some((v) => v.id === option.id)}
                        className="mr-2"
                        readOnly
                      />
                      {getOptionLabel(option)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CommandList className=" z-10 w-full mt-1 border rounded-md shadow-md bg-popover">
                {options.length === 0 ? (
                  <CommandEmpty>No results found</CommandEmpty>
                ) : null}
              </CommandList>
            </>
          )}
        </Command>
      </FormItem>
    </FormProvider>
  );
}

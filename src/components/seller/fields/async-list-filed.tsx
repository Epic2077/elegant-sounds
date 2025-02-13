"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CommandLoading } from "cmdk";
import { FormProvider, useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { debounce } from "lodash";

type Props<T extends { id: string }> = {
  name: string;
  defaultValue?: T;
  isLoading: boolean;
  options: T[];
  groupBy?: (option: T) => string;
  getOptionLabel: (option: T) => string;
  label: string;
  setQuery: (q: string) => void;
  error?: boolean;
  helperText?: string | string[];
  className?: string;
};

export default function AsyncListField<T extends { id: string }>({
  name,
  defaultValue,
  isLoading,
  options,
  groupBy,
  getOptionLabel,
  label,
  setQuery,
  error,
  helperText,
  className,
}: Props<T>) {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<T | null>(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const form = useForm();

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setInputValue(getOptionLabel(defaultValue));
    }
  }, [defaultValue, getOptionLabel]);

  // A debounced version of setQuery
  const debouncedSetQuery = useCallback(
    debounce((val: string) => {
      setQuery(val);
    }, 500),
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
      <FormItem>
        {value?.id && <input type="hidden" name={name} value={value.id} />}
        <FormLabel>{label}</FormLabel>
        <Command className="overflow-visible bg-transparent">
          <div ref={wrapperRef}>
            <CommandInput
              value={inputValue}
              onClick={() => setOpen(true)}
              onValueChange={(val: string) => {
                setInputValue(val);
                if (!val) {
                  setValue(null);
                }
                debouncedSetQuery(val);
                setOpen(true);
              }}
              placeholder={label}
              className={className}
            />

            {open && (
              <CommandList className="z-10 mt-1 border rounded-md shadow-md bg-popover">
                {isLoading ? (
                  <CommandLoading>
                    <div className="flex items-center justify-center p-4">
                      <div className="w-4 h-4">
                        <LoaderCircle className="text-sm animate-spin" />
                      </div>
                    </div>
                  </CommandLoading>
                ) : (
                  <>
                    {Object.entries(groupedOptions).map(([group, items]) => (
                      <CommandGroup key={group} heading={group}>
                        {items.map((option) => (
                          <CommandItem
                            key={option.id}
                            value={getOptionLabel(option)}
                            onSelect={() => {
                              setValue(option);
                              setInputValue(getOptionLabel(option));
                              setOpen(false);
                            }}
                          >
                            {getOptionLabel(option)}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ))}
                    {options.length === 0 && (
                      <CommandEmpty>No results found</CommandEmpty>
                    )}
                  </>
                )}
              </CommandList>
            )}
          </div>
        </Command>
        {helperText && (
          <FormMessage className={error ? "text-destructive" : ""}>
            {helperText}
          </FormMessage>
        )}
      </FormItem>
    </FormProvider>
  );
}

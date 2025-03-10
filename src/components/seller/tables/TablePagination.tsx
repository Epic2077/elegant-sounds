"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  count: number;
};

export default function TablePagination({ count }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const page = parseInt(searchParams.get("page") ?? "1");

  const createQueryString = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.keys(newParams).forEach((key) => {
        params.set(key, newParams[key]);
      });

      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (newPage: number) => {
    router.push(pathname + "?" + createQueryString({ page: `${newPage}` }));
  };

  const handlePageSizeChange = (newPageSize: string) => {
    router.push(
      pathname + "?" + createQueryString({ pageSize: newPageSize, page: "1" })
    );
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium w-[100px]">Items per page:</span>
        <Select value={`${pageSize}`} onValueChange={handlePageSizeChange}>
          <SelectTrigger className="h-8 w-[100px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 25].map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 && (
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(page - 1)}
              />
            )}
          </PaginationItem>
          {Array.from({ length: Math.ceil(count / pageSize) }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            {page < Math.ceil(count / pageSize) && (
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(page + 1)}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

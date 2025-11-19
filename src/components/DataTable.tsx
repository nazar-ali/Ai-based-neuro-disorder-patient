"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  title?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean; // ⬅ added loading prop
  rowsPerPage?: string;
  onRowsPerPageChange?: (value: string) => void;
}

export function DataTable<TData, TValue>({
  title,
  columns,
  data,
  loading = false,
  rowsPerPage = "10",
  onRowsPerPageChange = () => {},
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full space-y-3">

      {title && (
        <h2 className="text-md font-extrabold tracking-tight text-gray-800">
          {title}
        </h2>
      )}

      <div className="relative rounded-xl border border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.05)] overflow-hidden bg-white">

        {/* LOADING OVERLAY */}
        {loading && (
          <div className="absolute inset-0 z-20 backdrop-blur-sm bg-white/60 flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
             <span className="text-gray-700 font-medium">Loading...</span>
          </div>
        )}

        {/* Scrollable area */}
        <div className="overflow-auto max-h-[200px]">
          <Table className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
           {table?.getHeaderGroups && (
  <TableHeader className="sticky top-0 bg-gray-100/90 backdrop-blur z-10">
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id} className="hover:bg-transparent">
        {headerGroup.headers.map((header) => (
          <TableHead
            key={header.id}
            className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-700"
          >
            {header.isPlaceholder
              ? null
              : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
)}


            <TableBody>
              {!loading && table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={`transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50/40`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-6 py-2 text-md text-gray-700"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : !loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    No records found.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
            
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-2 px-2">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <Select
            value={rowsPerPage}
            onValueChange={(value) => {
              onRowsPerPageChange(value);
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-20 bg-white border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/*Prev / Next Buttons*/}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || loading}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || loading}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}

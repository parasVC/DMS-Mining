import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { TableDataProps,tableColumn } from '@/data/table/table-columns'


interface TableProps {
    data : TableDataProps[]    
    role : string
}
const DataTable = ({data,role}:TableProps) => {
    const columns = tableColumn[role as keyof typeof tableColumn];
    return (
        <Table className="border-x border-y">
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.key}>{column.label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length ? (
                    data.map((item,i) => (
                        <TableRow key={`${item.id}-${i}`}>
                            {columns.map((column) => (
                                <TableCell key={column.key}>
                                    {column.format ? (column.format(item[column.key] as string)) :
                                        column.customRender ? column.customRender() :
                                            column.render ? column.render(item,i) :
                                                item[column.key]
                                    }
                                </TableCell>

                            ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length + 1} className="text-center">
                            No data available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable

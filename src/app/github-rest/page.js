"use client"
import { useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from '@tanstack/react-table'

const Page = () => {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState([]);

    const fetchData = () => {
        const url = `https://api.github.com/search/repositories?q=${keyword}`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                setData(responseData.items);
            });
    }

    const handleChange = (e) => {
        setKeyword(e.target.value);
    }

    const btnClick = (value) => {
        console.log(value.getValue());
    }

    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor('full_name', {
            header: () => 'Name',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('html_url', {
            header: () => 'URL',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('owner.login', {
            header: () => 'Owner',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('full_name', {
            id: 'full_name_full',
            header: () => 'Link',
            cell: (info) => (<button onClick={() => { btnClick(info) }}>Press me</button>),
            footer: info => info.column.id,
        }),
    ];

    console.log(columns);

    const tableRows = data.map((item, index) =>
        <tr key={index}><td>{item.full_name}</td>
            <td><a href={item.html_url}>{item.html_url}</a></td></tr>);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <main>
            <div>
                github-rest
                <input type="text" onChange={handleChange} />
                <button onClick={fetchData} value={keyword}>Fetch</button>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        {table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.footer,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
                <table><tbody>{tableRows}</tbody></table>
            </div>
        </main>
    )
}

export default Page;
import { limitC, statusC } from '@/utils/constant';
import { Button, Input, Select, SelectItem, Spinner } from '@heroui/react';
import { ChangeEvent, Key, ReactNode, useMemo } from 'react';
import { CiSearch } from 'react-icons/ci';
import {Pagination} from "@heroui/react";
import { IPagination } from '@/utils/interface';
import { cn } from '@/utils/cn';

interface TypeProps {
  columns: Array<{label: string, id: string}>;
  renderCell: (data: Record<string, unknown>, column: {label: string, id: string}) => ReactNode;
  data: Record<string, unknown>[];
  isLoading: boolean;
  isSuccess?: boolean;

  textEmpty: string;
  currentSearch?: string;

  showSearch?: boolean;
  placeholderSearch?: string;
  showCreate?: boolean;

  textCreate?: string;

  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearch?: () => void;

  onLimit?: (e: ChangeEvent<HTMLSelectElement>) => void;
  limit?: string;
  currentPage?: number;
  pagination?: IPagination;
  onPagination?: (e:number) => void;

  showLimit?: boolean;
  showPagination?: boolean;

  onOpenModal?: () => void;

  isTableDelete?: boolean;

  ShowStatus?: boolean;
  status?: string;
  onStatus?: (e: ChangeEvent<HTMLSelectElement>) => void;
}


const TableUi = (props: TypeProps) => {
  const {
    columns,
    renderCell,
    data,
    isLoading,
    isSuccess,

    textEmpty,
    currentSearch,

    showCreate,
    placeholderSearch,
    showSearch,
    textCreate = "Create",

    onSearch,
    onClearSearch,
    onLimit,
    limit,
    currentPage,
    pagination,
    onPagination,

    showLimit,
    showPagination,

    onOpenModal,

    isTableDelete,

    ShowStatus,
    status,
    onStatus
  } = props;

  
  const topContent = useMemo(() => {
    return (
      <div className='flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center'>
        {showSearch && (
          <Input variant='bordered' startContent={(<CiSearch />)} isClearable className='w-full sm:max-w-[24%] bg-white rounded-2xl' onChange={onSearch} onClear={onClearSearch} placeholder={placeholderSearch} />
        )}
        {showCreate && (
          <Button color='primary' onPress={onOpenModal}>
            {textCreate}
          </Button>
        )}
        {ShowStatus && (
          <Select
            className='max-w-[10%] bg-white rounded-2xl' 
            size='md' 
            variant='bordered'
            items={statusC}
            selectedKeys={status ? [status] : [""]}
            onChange={onStatus}
          >
            {statusC.map(s => (
              <SelectItem key={`${s.id}`}>
                {`${s.name}`}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>
    )
  },[showSearch, showCreate, textCreate, currentSearch, onSearch, onClearSearch, onOpenModal, placeholderSearch, ShowStatus, status, onStatus]);


  const bottomContent = useMemo(() => {
    return (
      <div className='flex justify-between'>
        {showLimit && limit && (
          <Select
            variant='bordered'
            size='md'
            className="max-w-32 bg-white rounded-2xl hidden lg:block"
            items={limitC}
            selectedKeys={[limit]}
            onChange={onLimit}
            startContent={<p className='text-sm'>limit:</p>}
            selectionMode='single'
            disallowEmptySelection
          >
            {(limit) => <SelectItem>{limit.label}</SelectItem>}
          </Select>
        )}

        {pagination && (
          <Pagination showControls isCompact onChange={onPagination} initialPage={pagination?.current} total={pagination?.totalPage} className='mx-auto' />
        )}
      </div>
    )
  }, [limitC, limit, onLimit, currentPage, pagination, onPagination, showLimit, onPagination])

  return (
        <div className='flex flex-col gap-4'>
            {topContent}


          <div className="bg-white rounded-3xl p-4 shadow-xl relative">
            <div className='overflow-auto'>
              <table className='w-full min-w-180'>
                <thead className='relative'>
                  <tr className='relative'>
                    {columns.map((c) => (
                      <th key={c.id} className='p-4 text-sm'>
                        {c.label}
                      </th>
                    ))}
                  </tr>
                  <div className={cn("absolute top-0 h-full w-full bg-primary/20 rounded-xl z-0", {"bg-danger/20" : isTableDelete})}>

                  </div>
                </thead>
                <tbody className='relative'>
                  {!isLoading && data.length !== 0 &&
                    data.map((d) => (
                      <tr key={d._id as Key}>
                        {columns.map((c) => (
                          <td key={c.id} className=' text-default-700 p-2'>
                            <div className='flex justify-center items-center'>
                              {renderCell(d, c)}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {isLoading && (
                <div className='min-h-full absolute top-0 bottom-0 left-0 right-0 bg-foreground-700/30 backdrop-blur-sm flex justify-center items-center rounded-2xl z-10'>
                  <Spinner color='primary' />
                </div>
              )}
              {isSuccess && data.length === 0 && (
                <div className='flex justify-center items-center min-h-60 w-full'>
                  <span className=' text-default-500'>
                    {textEmpty}
                  </span>
                </div>
              )}
            </div>
          </div>


          {bottomContent}
        </div>

    )
}

export default TableUi;
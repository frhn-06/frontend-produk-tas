import { useRouter } from "next/router";
import usePagination from "./usePagination";

type TypeProps = {
  currentPage: number;
  totalPage: number;
};

const Pagination = (props: TypeProps) => {
    const {
      currentPage,
      totalPage
    } = props;

    const {
      getPaginationRange
    } = usePagination();
  
  const router = useRouter();

  

  const handleChangePage = (page: number) => {
    router.replace({
      query: {
        ...router.query,
        page
      }
    });
  };

  const pages = getPaginationRange(currentPage, totalPage);

  return (
    <nav aria-label="Pagination">
      <ul className="flex items-center gap-1">

        {/* PREV */}
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => handleChangePage(currentPage - 1)}
            className="px-3 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>
        </li>

        {/* PAGE NUMBERS */}
        {pages.map((page, i) => {
          if (page === "...") {
            return (
              <li key={i} className="px-2 text-default-400">
                …
              </li>
            );
          }

          return (
            <li key={i}>
              <button
                onClick={() => handleChangePage(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={`
                  px-3 py-2 rounded border
                  ${page === currentPage
                    ? "bg-primary text-white"
                    : "bg-white"}
                `}
              >
                {page}
              </button>
            </li>
          );
        })}

        {/* NEXT */}
        <li>
          <button
            disabled={currentPage === totalPage}
            onClick={() => handleChangePage(currentPage + 1)}
            className="px-3 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Pagination;

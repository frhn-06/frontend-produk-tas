const usePagination = () => {

    const getPaginationRange = (currentPage: number, totalPage: number): (number | "...")[] => {

        const range: (number | "...")[] = [];

        if (totalPage <= 5) {
            for (let i = 1; i <= totalPage; i++) range.push(i);
            return range;
        }

        if (currentPage <= 3) {
            range.push(1, 2, 3, "...", totalPage);
            return range;
        }

        if (currentPage >= totalPage - 2) {
            range.push(1, "...", totalPage - 2, totalPage - 1, totalPage);
            return range;
        }

        range.push(
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPage
        );

        return range;
    };

    return {
        getPaginationRange
    }
}

export default usePagination;
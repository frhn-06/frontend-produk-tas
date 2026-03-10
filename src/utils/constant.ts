const limitC = [
    {key: "8", label: "8"},
    {key: "16", label: "16"},
    {key: "32", label: "32"},
]

const paginationC = [
    {
        type: "prev",
        disabled: true
    },
    {
        type: "page",
        value: 1,
        active: true
    },
    {
        type: "page",
        value: 2
    },
    {
        type: "ellipsis"
    },
    {
        type: "next"
    }
]

const statusC = [
    {name: "All Status", id: "allstatus"}, 
    {name: "Completed", id: "settlement"}, 
    {name: "Pending", id: "pending"}, 
    {name: "Expired", id: "expired"}
]

export {limitC, paginationC, statusC}
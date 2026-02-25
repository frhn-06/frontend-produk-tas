const LIST_NAV = [    
    {label: "HOME", id: "home", href: "/"},
    {label: "ABOUT", id: "about", href: "/about"},
    {label: "PRODUCTS", id: "product", href: "/products"},
    {label: "PRIA", id: "pria"},
    {label: "WANITA", id: "wanita"},
    {label: "ANAK-ANAK", id: "anak",},
]

interface NavItem {
    label: string;
    id: string;
    href?: string;
}

export type {NavItem}
export default LIST_NAV;
"use client"

import ProductPageLayout from "@/components/layouts/ProductPageLayout";
import ProductsByCategory from "@/components/views/ProductsByCategory";
import CategoryService from "@/services/category.service";


export async function getServerSideProps(context: {params: {id: string}}) {
    const params = context.params;
    try {
        const {data} = await CategoryService.findById(`${params.id}`);
        return {
            props: {
                judul: data?.data?.name
            }
        }
    } catch {
        return {
            props: {
                judul: ""
            }
        }
    }
} 

interface TypeProps {
    judul: string;
}

const PageProductsByCategory = (props: TypeProps) => {

    const {
        judul
    } = props;

    return (
        <ProductPageLayout title={`${judul} | Category` || ""}>
            <ProductsByCategory />
        </ProductPageLayout>
     
    )
}

export default PageProductsByCategory;
"use client"

import ProductPageLayout from "@/components/layouts/ProductPageLayout";
import ProductsByActivity from "@/components/views/ProductsByActivity";
import ActivityService from "@/services/activity.service";

export async function getServerSideProps(context: {params: {id: string}}) {
    const params = context.params;
    try {
        const {data} = await ActivityService.findById(`${params.id}`);
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

const PageProductsByActivity = (props: TypeProps) => {
    const {
        judul
    } = props;
    
  
    return (
        <ProductPageLayout title={`${judul} | Activity` || ""}>
            <ProductsByActivity />
        </ProductPageLayout>
     
    )
}

export default PageProductsByActivity;
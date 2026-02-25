import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import ProductService from "@/services/product.service";
import { IProduct } from "@/types/product";
import { notFound } from "next/navigation";

export async function getServerSideProps(context: {params: {slug: string}}) {
    try {
        const {data} = await ProductService.findOneByٍSlug(`${context.params.slug}`)
        return {
            props: {
                data: data?.data
            }
        }
    } catch {
        return {
            notFound: true
        }
    }
}

interface TypeProps {
    data: IProduct
}

const PageProduct = (props: TypeProps) => {
    const {
        data
    } = props

    return (
        <LandingPageLayout title={`${data.slug}`}>
            <div>

            </div>
        </LandingPageLayout>
    )
}

export default PageProduct;
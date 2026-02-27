import { IProduct } from "@/types/product";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import useProduct from "./useProduct";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import ProductListReview from "./ProductListReview";

interface TypeProps {
    data: IProduct;
}

const Product = (props: TypeProps) => {
    const {
        data
    } = props;

    const {
      dataReviews,
      isLoadingRevies,
      refetchReviews,
      isRefetchingReviews
    } = useProduct(`${data?._id}`)


    

  

    return (
        <section className="bg-white min-h-screen max-w-7xl mx-auto py-6">
          <div className="p-4 flex flex-col gap-4">
            <div className="p-4" >
              <Breadcrumbs color="secondary" variant="bordered" underline="active">
                <BreadcrumbItem href="/"><b className="text-default-700">Home</b></BreadcrumbItem>
                <BreadcrumbItem href="/products"><b className="text-default-700">Products</b></BreadcrumbItem>
                <BreadcrumbItem><b className="text-default-700">{data?.slug}</b></BreadcrumbItem>
              </Breadcrumbs>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-4">
              <div className="flex-8 flex flex-col lg:flex-row-reverse overflow-hidden lg:aspect-square">
                <ProductImage data={data} />
              </div>

              <div className="flex-6 ">
                <ProductInfo data={data} />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-4">
              <div className="flex-6">
                <ProductDescription data={data} />
              </div>

              <div className="flex-5">
                <ProductListReview data={data} dataReviews={dataReviews?.data || []} isLoadReviews={isLoadingRevies && isRefetchingReviews} refetch={refetchReviews} />
              </div>
            </div>
          </div>
        </section>
    )
}

export default Product;
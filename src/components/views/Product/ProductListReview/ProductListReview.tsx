import StarUi from "@/components/ui/StarUi";
import { IProduct } from "@/types/product";
import { IReview } from "@/types/review";
import convert from "@/utils/convert";
import { Accordion, AccordionItem, Avatar, Button, Skeleton, useDisclosure } from "@heroui/react";
import { IoStar } from "react-icons/io5";
import ModalReview from "./ModalReview";
import { SetStateAction, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { syaratLoginContext } from "@/context/syaratLoginContext";

interface TypeProps {
  data: IProduct;
  dataReviews: IReview[];
  isLoadReviews: boolean;
  refetch: () => void;
}

const ProductListReview = (props: TypeProps) => {
    const {
      data,
      dataReviews,
      isLoadReviews,
      refetch
    } = props;

    const session = useSession();

    const {setSyaratLogin} = useContext(syaratLoginContext);

    const modalReview = useDisclosure();

    const [id, setId] = useState<string | undefined>(undefined);

    const handleOpenModal = (onOpen: () => void, setId: React.Dispatch<SetStateAction<string | undefined>>, id:string) => {
      if(session.status === "authenticated") {
        onOpen();
        setId(id);
        return;
      }
      setSyaratLogin({
        isOpen: true,
        type: "komentar"
      });
      console.log('asu');
      return;
    }

    return (
        <>
          <Skeleton isLoaded={!isLoadReviews}>
            <Accordion variant="bordered">
              <AccordionItem title={(
                <h1 className="text-default-700 font-semibold">Ulasan <span className="text-default-400">({dataReviews && dataReviews?.length})</span></h1>
              )}>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IoStar className="w-12 h-12 text-yellow-400" />
                      <h3 className="text-3xl font-bold text-default-700">
                        {data?.starsAgr}
                      </h3>
                    </div>
                    <Button color="primary" onPress={() => handleOpenModal(modalReview.onOpen, setId, `${data?._id}`)}>
                      Beri Ulasan
                    </Button>
                  </div>
                  <div className="border-1 border-default-400">

                  </div>
                  <div className="p-2 flex flex-col gap-4">
                    {dataReviews && dataReviews?.length === 0 && (
                      <h2 className="text-default-400">
                        Belum ada ulasan
                      </h2>
                    )}
                    {dataReviews && dataReviews?.map((r: IReview) => (
                      <div key={r?._id} className="flex flex-col gap-3">
                        <div className="flex gap-3">
                          <div className="">
                            <Avatar showFallback src={`${r?.userId?.profilePicture}`}  size="lg"/>
                          </div>
                          <div className="flex-1 flex flex-col justify-center">
                          <h1 className="font-semibold text-default-700">
                            {r?.userId?.userName}
                          </h1>
                          <div className="flex gap-2">
                            <StarUi size="md" dataStar={r?.stars as number} disabledAngka />
                            <p className="text-default-400 text-sm"> 
                              {convert.time(`${r?.createdAt}`)}
                            </p>
                          </div>
                          </div>
                        </div>

                        <div className="text-default-700">
                          {r?.comment}
                        </div>
                      </div>
                    ))}
                </div>
                </div>
              </AccordionItem>
            </Accordion>
          </Skeleton>

          <ModalReview onClose={modalReview.onClose} isOpen={modalReview.isOpen} productId={id} refetch={refetch} />
        </>
    )
}

export default ProductListReview;
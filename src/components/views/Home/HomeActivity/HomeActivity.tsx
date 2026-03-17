import { IActivity } from '@/types/activity';
import { cn } from '@/utils/cn';
import { Skeleton } from '@heroui/react';
import Link from 'next/link';


interface TypeProps {
  data: IActivity[],
  isLoading: boolean;
}

const HomeActivity = (props: TypeProps) => {

    const {
      data,
      isLoading
    } = props;

    
    return (
        <section className="mx-4 lg:mx-8 my-4 py-4">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {!Array.isArray(data) ?
            Array.from({length: 3}).map((_, i) => (
              <Skeleton key={i} className='rounded-2xl aspect-square'></Skeleton>
            )) : data && !isLoading && data?.map((activity: IActivity) => (
              <Link key={activity?._id}  href={`/products/activity/${activity?._id}`}>
                <div className='relative overflow-hidden rounded-2xl cursor-pointer group aspect-square' >
                  <div className={cn("absolute w-full h-full z-12 flex justify-center items-center -translate-y-full transition duration-200 delay-150 group-hover:translate-y-0")}>
                    <h3 className='font-bold text-default-100 text-4xl'>
                      {activity?.name}
                    </h3>
                  </div>
                  <div className={cn("absolute w-full h-full bg-black/30 z-11 rounded-2xl translate-y-full group-hover:translate-y-0 transition duration-200")}>

                  </div>
                  <img src={`${activity?.image}`} className='w-full h-full object-cover object-center' />
                </div>
              </Link>
            ))}
          </div>
        </section>
    )
}

export default HomeActivity;
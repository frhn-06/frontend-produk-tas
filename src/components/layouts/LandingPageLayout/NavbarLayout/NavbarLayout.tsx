
import { Avatar, Badge, Button, Card, CardBody, cn, Image, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Skeleton, Spinner} from '@heroui/react';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import LIST_NAV from './listConstant';
import useNavbarLayout from './useNavbarLayout ';
import { IActivity } from '@/types/activity';
import { useRouter } from 'next/router';
import { IUser } from '@/types/auth';
import { signOut, useSession } from 'next-auth/react';
import useCart from '@/hooks/cart';
import { IoSearch } from 'react-icons/io5';
import { IProduct } from '@/types/product';



interface TypeProps {
  user: IUser;
  isLoadingUser: boolean;
}

const NavbarLayout = (props: TypeProps) => {
    const {
      user,
      isLoadingUser
    } = props;

    const {
      dataActivities,
      isLoadingActivities,

      dataProductsSearch,
      isLoadingProductsSearch,
      handleSearch,
      search
    } = useNavbarLayout();

    const {
      dataCarts,
      isLoadingCarts,
      isRefetchingCarts,
      refetchCarts
    } = useCart();

    const router = useRouter();

    const session = useSession();



    
    return (
        <>
          <Navbar maxWidth="xl" isBordered className='bg-white lg:min-h-24'>
            <NavbarBrand>
              <Link href={'/'}>
                <Image src={`/images/img/logo/logo-velaro.png`} height={32} />
              </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              {LIST_NAV.map((list) => 
                list.href ? (
                  <NavbarItem key={`${list.id}`} className='relative'>
                    <Link href={`${list.href}`} className={cn("text-default-700 font-bold hover:text-default-500", {"text-primary": router.pathname === list.href})}>
                      {`${list.label}`}
                    </Link>
                  </NavbarItem>
                ) : (
                  <NavbarItem key={`${list.id}`} className='relative group'>
                    <span className={cn("text-default-700 font-bold hover:text-default-500 cursor-pointer")}>
                      {`${list.label}`}
                    </span>
                    <div className={cn("absolute top-full bg-white scale-y-0 origin-top transition duration-250 p-4 rounded-2xl flex flex-col gap-1 min-w-36 shadow group-hover:scale-y-100")}>
                      {dataActivities?.data?.map((activity: IActivity) => (
                        <Link key={activity._id} href={`/products/activity/${activity._id}?target=${list.id}`} className='font-semibold text-default-700 hover:bg-default-400/30 rounded-xl p-2'>
                          {activity.name}
                        </Link>
                      ))}
                    </div>
                  </NavbarItem>
                )
              )}
            </NavbarContent>


            <NavbarContent justify="end">
              {/* search */}
              <NavbarItem className='min-w-26'>
                <div className='relative'>
                  <Input type='search' variant='bordered' placeholder='Search Product' onChange={handleSearch} startContent={(
                    <IoSearch className='text-default-700' />
                  )} />
                  {search !== "" && (
                    <Card className="absolute top-full translate-y-2 min-w-full">
                      <CardBody className='gap-2 p-2'>
                        {!isLoadingProductsSearch ? (
                          Array.isArray(dataProductsSearch?.data) && dataProductsSearch?.data?.length > 0 ? (
                            dataProductsSearch?.data?.map((product : IProduct) => (
                              <Link key={product._id} href={`/products/${product.slug}`} className='rounded-2xl p-1 active:bg-default-200'>
                                <div className='flex gap-4'>
                                  <div className='w-12 h-12 aspect-square'>
                                    <Image src={`${product.image}`} alt='image' className='w-full h-full aspect-square' />
                                  </div>
                                  <div>
                                    <h2 className='text-default-500 text-wrap'>
                                      {product.name}
                                    </h2>
                                  </div>
                                </div>
                              </Link>
                            ))
                          ) : (
                            <p className='text-default-400'>
                              products is empty
                            </p>
                          )
                        ) : (
                          <Spinner color='primary' />
                        )}
                      </CardBody>
                    </Card>
                  )}
                </div>
              </NavbarItem>
              {/* user */}
              <NavbarItem className="hidden lg:flex">
                {session.status === "authenticated" ? (
                  <div className='relative group'>
                    <Skeleton className='rounded-full' isLoaded={!isLoadingUser}>
                      <Avatar src={`${user?.profilePicture}`} showFallback name={`${user?.fullName}`} className='group'/>
                    </Skeleton>
                    <div className='absolute top-full min-w-24 bg-white min-h-12 rounded-2xl shadow scale-0 transition duration-250 group-hover:scale-100 p-4 flex flex-col gap-1'>
                      <Link href={user?.role === "admin" ? "/admin/dashboard" : "/member/profile"} className='p-2 rounded-xl hover:bg-default-400/30'>
                        {user?.role === "admin" ? "Dashboard" : "Profile"}
                      </Link>
                      <p onClick={() => signOut()} className='cursor-pointer p-2 rounded-xl hover:bg-default-400/30'>
                        Logout
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link href="/auth/login" className='active:bg-default-200 rounded-xl p-1'>
                    <FaRegUser className='text-primary w-6 h-6' />
                  </Link>
                )}
              </NavbarItem>
              {/* cart */}
              <NavbarItem className="flex">
                {session.status === "authenticated" ? (
                  <Badge color='danger' content={dataCarts?.data ?`${dataCarts?.data?.length}` : ""} placement='top-right'>
                    <Link href="/checkout/cart" className='relative p-1 rounded-xl active:bg-default-200'>
                      <MdOutlineShoppingCart className='text-primary w-7 h-7' />
                    </Link>
                  </Badge>
                ) : dataCarts?.data?.length === 0 || session.status === "unauthenticated" && (
                  <Link href="/checkout/cart" className='relative p-1 rounded-xl active:bg-default-200'>
                    <MdOutlineShoppingCart className='text-primary w-7 h-7' />
                  </Link>
                )}
              </NavbarItem>

              <NavbarMenuToggle className='sm:hidden' />

            </NavbarContent>



            <NavbarMenu className='bg-white gap-1 fixed '>
              {LIST_NAV.map((list, index) => 
                list.href ? (
                  <NavbarMenuItem key={`${list}-${index}`}>
                    <Link
                      className={cn("w-full font-semibold text-default-700 text-md active:bg-default-400/30 p-2 rounded-xl", {"text-primary" : router.pathname === list.href})}
                      href={`${list.href}`}
                    >
                      {list.label}
                    </Link>
                  </NavbarMenuItem>
                ) : (
                  <NavbarMenuItem key={`${list}-${index}`}>
                    <span
                      className={cn("w-full font-semibold text-default-700 text-md active:bg-default-400/30 p-2 rounded-xl")}>
                      {list.label}
                    </span>
                  </NavbarMenuItem>
                )
              )}
              <NavbarMenuItem className='border-t-1 border-default-400/60 mt-2'>
              <div className='p-2'>
                {session.status === "authenticated" ? ( 
                  user?.role === "admin" ? (
                    // admin
                    <div className='flex flex-col gap-2'>
                      <Skeleton isLoaded={!!user} className='w-fit'>
                        <Link href={`/admin/profile`} onClick={(e) => e.preventDefault()}>
                          <Avatar src={`${user?.profilePicture}`} showFallback name={`${user?.fullName}`} className='group'/> 
                        </Link>
                      </Skeleton>
                      <Link href="/admin/dashboard" className='text-default-700 font-semibold rounded-xl p-1 active:bg-default-200'>
                        Dashboard
                      </Link>
                      <Button color='primary' variant='flat' onPress={() => signOut()}>
                        Logout
                      </Button>
                    </div>
                    ) : (
                      // member
                      <div className='flex flex-col gap-2'>
                        <Skeleton isLoaded={!!user} className='w-fit'>
                          <Link href={`/member/profile`} >
                            <Avatar src={`${user?.profilePicture}`} showFallback name={`${user?.fullName}`} className='group'/> 
                          </Link>
                        </Skeleton>
                        <Link href="/member/dashboard" className='text-default-700 font-semibold rounded-xl p-1 active:bg-default-200'>
                          Dashboard
                        </Link>
                        <Button color='primary' variant='flat' onPress={() => signOut()}>
                          Logout
                        </Button>
                      </div>
                    )     
                  ) : (
                  <Link href="/auth/login" className='flex gap-2 rounded-xl p-2 active:bg-default-200'>
                    <FaRegUser className='text-primary w-6 h-6' /> Login
                  </Link>
                )}
              </div>
              </NavbarMenuItem>
            </NavbarMenu>
          </Navbar>


        </>
     
    )
}

export default NavbarLayout;
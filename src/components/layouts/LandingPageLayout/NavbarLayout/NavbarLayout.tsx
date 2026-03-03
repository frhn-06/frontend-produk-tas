
import { Avatar, Badge, cn, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spinner} from '@heroui/react';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import LIST_NAV from './listConstant';
import useNavbarLayout from './useNavbarLayout ';
import { IActivity } from '@/types/activity';
import { useRouter } from 'next/router';
import { IUser } from '@/types/auth';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useCart from '@/hooks/cart';



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
    } = useNavbarLayout();

    const {
      dataCarts,
      isLoadingCarts,
      isRefetchingCarts
    } = useCart();

    const router = useRouter();

    const session = useSession();

  


    
    return (
        <>
          <Navbar maxWidth="xl" isBordered className='bg-white lg:min-h-24'>
            <NavbarBrand>
              <Image src={`/images/img/logo/logo-velaro.png`} height={32} />
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
                      {dataActivities?.data?.map((d: IActivity) => (
                        <Link key={d._id} href={`/product/${list.id}?q=${d._id}`} className='font-semibold text-default-700 hover:bg-default-400/30 rounded-xl p-2'>
                          {d.name}
                        </Link>
                      ))}
                    </div>
                  </NavbarItem>
                )
              )}
            </NavbarContent>

            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex">
                {session.status === "authenticated" ? (
                  <div className='relative group'>
                    <Avatar src={`${user?.profilePicture}`} showFallback name={`${user?.fullName}`} className='group'/>
                    <div className='absolute top-full min-w-24 bg-white min-h-12 rounded-2xl shadow scale-0 transition duration-250 group-hover:scale-100 p-4 flex flex-col gap-1'>
                      <Link href="/admin/dashboard" className='p-2 rounded-xl hover:bg-default-400/30'>
                        Dashboard
                      </Link>
                      <p onClick={() => signOut()} className='cursor-pointer p-2 rounded-xl hover:bg-default-400/30'>
                        Logout
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link href="/auth/login">
                    <FaRegUser className='text-primary w-6 h-6' />
                  </Link>
                )}
              </NavbarItem>
              <NavbarItem className="flex">
                {session.status === "authenticated" ? (
                  <Badge color='danger' content={dataCarts?.data ?`${dataCarts?.data?.length}` : ""} placement='top-right'>
                    <Link href="/checkout/cart" className='relative'>
                      <MdOutlineShoppingCart className='text-primary w-7 h-7' />
                    </Link>
                  </Badge>
                ) : dataCarts?.data?.length === 0 || session.status === "unauthenticated" && (
                  <Link href="/checkout/cart" className='relative'>
                    <MdOutlineShoppingCart className='text-primary w-7 h-7' />
                  </Link>
                )}
              </NavbarItem>

              <NavbarMenuToggle className='sm:hidden' />

            </NavbarContent>



            <NavbarMenu className='bg-white gap-1'>
              {LIST_NAV.map((list, index) => 
                list.href ? (
                  <NavbarMenuItem key={`${list}-${index}`}>
                    <Link
                      className={cn("w-full font-semibold text-default-700 text-md active:bg-default-400/30 p-2 rounded-xl", {"text-primary" : router.pathname.startsWith(list.href)})}
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
                    <div className='flex flex-col gap-2'>
                      <Link href={`/admin/profile/${user?._id}`}>
                        <Avatar src={`${user?.profilePicture}`} showFallback name={`${user?.fullName}`} className='group'/> 
                      </Link>
                      <Link href="/admin/dashboard" className='text-default-700 font-semibold '>
                        Dashboard
                      </Link> 
                    </div>
                    ) : (
                      <Link href={`/member/profile/${user?._id}`} >
                        <Avatar src={`${user?.profilePicture}`} showFallback name={`${user?.fullName}`} className='group'/> 
                      </Link>
                    )     
                  ) : (
                  <Link href="/auth/login" className='flex gap-2 '>
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
import { Avatar, Badge, cn, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from '@heroui/react';
import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import LIST_NAV from './listConstant';
import { useState } from 'react';
import useNavbarLayout from './useNavbarLayout ';
import { IActivity } from '@/types/activity';
import { useRouter } from 'next/router';
import { IUser } from '@/types/auth';
import { signOut, useSession } from 'next-auth/react';


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
      isLoadingActivities
    } = useNavbarLayout();

    const router = useRouter();

    const session = useSession();




    return (
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
                    <p onClick={() => signOut()} className='p-2 rounded-xl hover:bg-default-400/30'>
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
              <Badge color='danger' content="12" placement='top-right'>
                <Link href="/auth/login" className='relative'>
                  <MdOutlineShoppingCart className='text-primary w-7 h-7' />
                </Link>
              </Badge>
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
      // <div className='relative'>
        
      //   {/* <div className={cn("hidden lg:flex justify-around items-center absolute min-h-fit w-full py-4 bg-white border-b-1 border-b-default-400/30 scale-y-0 origin-top transition duration-200 hover:scale-y-100", {"scale-y-100" : typeof hoverNav === "string"})} onMouseLeave={handleCloseHover}>
      //     {dataActivities?.data?.map((d: IActivity) => (
      //       <Link key={`${d._id}`} href={`/product/${hoverNav}?q=${d._id}`}>
      //         {d.name as ReactNode}
      //       </Link>
      //     ))}
      //   </div> */}
      // </div>
      






      // <div className="hidden lg:block bg-white border-b-2 border-default-400/40 px-4">
      //   <div className='container flex justify-between items-center min-h-20'>
      //     <div className="w-24">
      //       <Image src={`/images/img/logo/logo-velaro.png`} className='w-full' />
      //     </div>
      //     <div className='flex items-center gap-4'>
      //       {listNav.map((list) => (
      //         <div key={`${list.id}`} className={cn("relative", {"group" : !list.href})}>
      //           <Link href={`${list.href}`} className='font-bold text-default-700' >
      //             {`${list.label}`}
      //           </Link>
      //           <div className='opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition duration-200 rounded-2xl shadow-xl min-w-40 min-h-20 bg-white absolute top:full p-4 flex flex-col gap-1'>
      //             <Link href={""} className='font-semibold text-default-600 text-sm hover:bg-default-300/30 p-2 rounded-xl transition'>
      //               Hiking
      //             </Link>
      //             <Link href={""} className='font-semibold text-default-600 text-sm hover:bg-default-300/30 p-2 rounded-xl transition'>
      //               Sekolah
      //             </Link>
      //             <Link href={""} className='font-semibold text-default-600 text-sm hover:bg-default-300/30 p-2 rounded-xl transition'>
      //               Formal
      //             </Link>
      //           </div>
      //         </div>
      //       ))}
      //     </div>
      //     <div className='flex gap-4 items-center'>
      //       <Link href="/auth/login">
      //         <FaRegUser className='text-primary w-7 h-7' />
      //       </Link>
      //       <Link href="/member/cart">
      //         <MdOutlineShoppingCart className="text-primary w-7 h-7" />
      //       </Link>
      //     </div>
      //   </div>
      // </div>
    )
}

export default NavbarLayout;
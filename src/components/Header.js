// We'll use ES7 snippets
import Image from "next/image";
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const {data: session} = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

    return (
        <header>
         {/* Top Nav */}
          <div className="flex items-center bg-amazon_blue p-1 flex-grow text-sm py-2">
            <div className="mt-2.5 -ml-3 flex items-center flex-grow sm:flex-grow-0">
              <Image
                onClick={() => router.push('/')}
                src="https://links.papareact.com/f90"
                width={150}
                height={36}
                objectFit="contain"
                className="cursor-pointer"
              />
              <p className="text-white mb-3.5 -ml-6 text-sm">.in</p>
            </div>   

            {/* Search */}
            <div className="hidden sm:flex items-center rounded-md h-10 flex-grow bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
                <input 
                  type="text" 
                  name="text"
                  placeholder="Search in products listed below..." 
                  className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent px-4 "
                />
                <SearchIcon className="h-12 p-4" />
            </div> 

            {/* Right section */}
            <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
              <div onClick={!session ? signIn : signOut} className="link">
                  <p>
                    {session ? `Hello, ${session.user.name}` : "Sign In"}
                  </p>
                  <p className="font-bold md:text-sm">Account & Lists </p>
              </div>

              <div onClick={() => router.push('/orders')} className="link">
                  <p>Returns</p>
                  <p className="font-bold md:text-sm">& Orders</p>
              </div>

              <div onClick={() => router.push('/checkout')} className=" relative link flex items-center">
                 <span className="absolute top-0 right-0 md:right-4 h-4 w-4 text-center bg-yellow-400 rounded-full text-black font-bold">{items.length}</span>
                 <ShoppingCartIcon className="h-10 mb-1" />
                 <p className="hidden md:inline font-bold md:text-sm mt-4">Cart</p> 
              </div>
            </div>
          </div> 

         {/* Bottom Nav */}
         <div className="flex items-center space-x-4 p-2 pl-3 bg-amazon_blue-light text-white text-sm">
            <p className="link flex items-center">
               <MenuIcon className="h-6 mr-1" />
               All
            </p>
            <p className="link">Today's Deals</p>
            <p className="link">Sell</p>
            <p className="link">Health, Household & Personal Care</p>
            <p className="link hidden sm:inline-flex">Kindle eBooks</p>
            <p className="link hidden sm:inline-flex">Gift Ideas</p>
            <p className="link hidden lg:inline-flex">Home Improvement</p>
            <p className="link hidden lg:inline-flex">Gift Cards</p>
            <p className="link hidden lg:inline-flex">Pet Supplies</p>
            <p className="link hidden lg:inline-flex">Subscribe & Save</p>
            <p className="link hidden lg:inline-flex">Sports, Fitness & Outdoors</p>
         </div>
        </header>
    )
}

export default Header;


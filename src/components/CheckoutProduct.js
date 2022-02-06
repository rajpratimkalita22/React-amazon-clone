import { StarIcon } from '@heroicons/react/solid';
import Currency from "react-currency-formatter";
import { useDispatch } from 'react-redux';
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import { addToBasket, removeFromBasket, deleteFromBasket } from"../slices/basketSlice";
function CheckoutProduct({id, title, price, rating, description, category, image, hasPrime,count }) {
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
            id,
            title, 
            price, 
            rating, 
            description, 
            category, 
            image, 
            hasPrime,
            count,
        };

        // Push item into redux
        dispatch(addToBasket(product));
        toast.success('Successfully added!')
    };

    const deleteItemFromBasket = () => {
        //delete an item out of 2 or 3 from redux
        dispatch(deleteFromBasket({count, id}))
        if(count > 1) 
         toast.success('item deleted!')
        else 
         toast.error('This didnt work')     
    }

    const removeItemFromBasket = () => {
        //remove a product completety from redux state
        dispatch(removeFromBasket({id}));
        toast.success('Successfully removed!')
    }
    
    return (
        <div className="grid grid-cols-5 border-b pb-4">
            <div className="absolute top-right flex flex-col"><Toaster/></div>
            <Image src={image} height={100} width={100} objectFit="contain"/>

            {/* middle section */}
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon className="h-5 text-yellow-500" />
                      ))
                    }
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <div className='flex items-center space-x-4'>
                   <p><Currency quantity={price} currency="INR" /></p>
                </div>
    
    
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img 
                          loading="lazy"
                          src="https://links.papareact.com/fdw" 
                          alt="" 
                          className="w-12" 
                        />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            {/* Right add/remove buttons */}
             <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                 <div className='flex items-center justify-between'>
                     <button onClick={deleteItemFromBasket} className="button">-</button>
                     <span className='font-medium text-sm'>Quantity:{" "}{count}</span>
                     <button onClick={addItemToBasket} className="button">+</button>
                 </div>
                 {/* <button onClick={addItemToBasket} className="button">Add to Cart</button> */}
                 <button onClick={removeItemFromBasket} className="button">Remove from Cart</button>
             </div>
        </div>
    );
}

export default CheckoutProduct;
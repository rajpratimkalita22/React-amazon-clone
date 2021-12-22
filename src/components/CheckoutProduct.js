import { StarIcon } from '@heroicons/react/solid';
import Currency from "react-currency-formatter";
import { useDispatch } from 'react-redux';
import Image from "next/image";
import { addToBasket, removeFromBasket } from"../slices/basketSlice";
function CheckoutProduct({id, title, price, rating, description, category, image, hasPrime }) {
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
            hasPrime
        };

        // Push item into redux
        dispatch(addToBasket(product));
    };

    const removeItemFromBasket = () => {
        //remove items from redux
        dispatch(removeFromBasket({id}));
    }
    
    return (
        <div className="grid grid-cols-5 border-b pb-4">
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
                   <p className='text-sm'>Quantity: </p>
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
                 <button onClick={addItemToBasket} className="button">Add to Cart</button>
                 <button onClick={removeItemFromBasket} className="button">Remove from Cart</button>
             </div>
        </div>
    );
}

export default CheckoutProduct;
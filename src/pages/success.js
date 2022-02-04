import { CheckCircleIcon, CheckIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import Header from "../components/Header"
import Head from "next/head";


function success() {
    const router = useRouter();
    return (
        <div className="bg-gray-100 h-screen">
            <Head>
            <title>Success Page</title>
                <link rel = "icon" href = "https://icons.iconarchive.com/icons/bokehlicia/pacifica/96/amazon-icon.png" type = "image/  x-icon">
                </link>
            </Head>
            <Header />
            <main className="max-w-screen-lg mx-auto">
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center space-x-2 mb-5 lg: mx-auto">
                        <CheckCircleIcon className="text-green-500 h-10"/>
                        <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
                    </div>
                    <img className="object-contain h-52 my-2" src="https://aeroshield.me/wp-content/uploads/2019/09/Customer-Thank-You-Note-1.png" alt="ThankYou" 
                    />
                    <p className="font-medium my-4">
                      Thankyou for shopping with us. We'll send a confirmation once your item had shipped. If you would like to check the status of your order(s) please press the link below.
                    </p>
                    <button onClick={() => router.push('/orders')} className="button mt-8">Go to my orders</button>
                </div>
            </main>
        </div>
    )
}

export default success



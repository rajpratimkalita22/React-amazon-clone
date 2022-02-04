import { getSession } from "next-auth/react";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({products}) {
  return (  // const { products } = props    ...pulling out the products property from prop object by destructuring

    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
        <link rel = "icon" href = "https://icons.iconarchive.com/icons/bokehlicia/pacifica/96/amazon-icon.png" type = "image/x-icon">
        </link>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        <ProductFeed prods = {products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("http://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return { props: { products, session } }
}

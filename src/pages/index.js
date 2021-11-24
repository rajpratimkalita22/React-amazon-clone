import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Amazon 2.0</title>
        <link rel = "icon" href = "https://icons.iconarchive.com/icons/bokehlicia/pacifica/96/amazon-icon.png" type = "image/x-icon">
        </link>
      </Head>

    {/* <h1>Hey papaFAM</h1> */}
      {/* Header */}
      <Header />
    </div>
  );
}

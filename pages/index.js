import Head from 'next/head';
import Header from '../components/header';
import Hero from '../components/hero';
import QuickMeal from '../components/quickMeal';
import { useRouter } from 'next/router';
import SearchMeals from '../components/searchMeals';
import Footer from '../components/footer';

export default function Home() {
  const { query } = useRouter();
  return (
    <div>
      <Head>
        <title>Resepi</title>
        <meta name='description' content='Simple Recipe App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='main'>
        <Hero />
        {query?.search?.length > 0 ? <SearchMeals /> : <QuickMeal />}
      </main>
      <Footer/>
    </div>
  );
}

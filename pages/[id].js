import { useRouter } from 'next/router';
import useSWR from 'swr';
import Header from '../components/header';
import { MdTimer, MdArrowBackIosNew } from 'react-icons/md';
import { FaTag } from 'react-icons/fa';
import Image from 'next/image';
import Head from 'next/head';

export default function MealPage() {
  const { query, back } = useRouter();
  const { data, error } = useSWR(
    `/api/meals/${query.id}`,
    (url) => fetch(url).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div>
      <Head>
        <title>Resepi | {query.name}</title>
        <meta name='description' content='Simple Recipe App' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Header />
        <button onClick={() => back()} className='flex items-center md:ml-10 md:mt-10 p-2 cursor-pointer'>
          <MdArrowBackIosNew/> Back
        </button>
        {error ? (
          <section>
            <div className='flex justify-center items-center'>
              Something is wrong
            </div>
          </section>
        ) : (
          <section>
            {!data ? (
              <div className='flex justify-center items-center'>Loading...</div>
            ) : (
              <>
                <div className='flex justify-center p-10'>
                  <div
                    className='shadow-xl rounded-full'
                    style={{
                      backgroundImage: `url(${data.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      height: '380px',
                      width: '380px',
                    }}
                  ></div>
                </div>
                <div className='md:px-32 flex items-center flex-col'>
                  <h1 className='text-2xl font-semibold'>{data.title}</h1>
                  <span className='flex items-center'>
                    <MdTimer className='mr-1' /> {data.readyInMinutes} minutes
                  </span>
                  <span className='flex items-center'>
                    <FaTag className='mr-1' /> {data.dishTypes.join(', ')}
                  </span>
                </div>
                <div className='md:px-32 px-6 py-6'>
                  <div
                    dangerouslySetInnerHTML={{ __html: `${data.summary}` }}
                  ></div>
                </div>
                <div className='py-6 md:px-32 px-10 flex flex-col items-center'>
                  <h2 className='text-2xl font-medium'>Ingredients</h2>
                  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
                    {data.extendedIngredients?.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className='card p-6 shadow flex flex-col items-center text-center rounded-full'
                        style={{ height: '180px', width: '180px' }}
                      >
                        <Image
                          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                          width='100px'
                          height='100px'
                          alt={ingredient.name}
                        />
                        <span className='text-xs'>{ingredient.original}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='py-6 px-10 md:px-32'>
                  <h2 className='text-2xl font-medium text-center'>
                    Instructions
                  </h2>
                  <div className='flex justify-center'>
                    <div className='card p-6 md:w-5/6 shadow rounded-lg'>
                      {!data.analyzedInstructions[0] && 'We are sorry, apparently no instructions for this recipe.'}
                      {data.analyzedInstructions[0]?.steps?.map((step) => (
                        <div key={step.number} className='p-2'>
                          {step.number}. {step.step}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

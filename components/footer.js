import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className='flex justify-end text-sm py-2 px-5'>
        <span className='mr-1'>
          © {new Date().getFullYear()}
        </span>
        <Link href='https://github.com/iamardi'>Mardi N</Link>
      </div>
    </footer>
  );
}

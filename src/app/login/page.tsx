import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './login-form';
import { login } from './_actions';

export default function LoginPage() {
  return (
    <div className="flex h-full justify-center items-center">
      <div className="card max-w-sm m-5">
        <Image
          className="mx-auto"
          priority={true}
          width={192}
          height={120}
          src="/kk_logo_black.png"
          alt="Kilo für Kilo Logo"
        />
        <LoginForm login={login} />
        <div className="flex gap-2 justify-center">
          <span>You don&apos;t have an account?</span>
          <Link className="font-anton" href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

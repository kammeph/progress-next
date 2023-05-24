import Image from 'next/image';
import Link from 'next/link';
import SignupForm from './signup-form';
import { signup } from './_actions';

export default function SignupPage() {
  return (
    <div className="flex h-full justify-center items-center">
      <div className="card max-w-sm m-5">
        <Image
          className="mx-auto w-auto h-auto"
          priority={true}
          width={192}
          height={120}
          src="/kk_logo_black.png"
          alt="Kilo für Kilo Logo"
        />
        <SignupForm signup={signup} />
        <div className="flex gap-2 justify-center">
          <span>Already have an account?</span>
          <Link className="font-anton" href="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

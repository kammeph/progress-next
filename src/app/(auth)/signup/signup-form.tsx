'use client';

import { FormEvent, useCallback, useEffect, useRef, useState, useTransition } from 'react';

export default function SignupForm({ signup }: { signup: (username: string, password: string) => Promise<void> }) {
  const [_, startTransition] = useTransition();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, [usernameRef]);

  const isFormValid = useCallback(
    () => !!username && !!password && !!confirmPassword && password === confirmPassword,
    [username, password, confirmPassword]
  );

  function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isFormValid()) return;
    startTransition(() => signup(username, password));
  }

  return (
    <form onSubmit={handleSignup} className='flex flex-col gap-2'>
      <input
        ref={usernameRef}
        className='input'
        type='text'
        placeholder='Username'
        name='username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className='input'
        type='password'
        placeholder='Password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className='input'
        type='password'
        placeholder='Confirm Password'
        name='confirmPassword'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className='btn' type='submit' disabled={!isFormValid()}>
        Sign Up
      </button>
    </form>
  );
}

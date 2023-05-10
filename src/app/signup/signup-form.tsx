'use client';

import { FormEvent, useCallback, useState } from 'react';
import { signup } from './_actions';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFormValid = useCallback(
    () => !!username && !!password && !!confirmPassword && password === confirmPassword,
    [username, password, confirmPassword]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isFormValid()) return;
    await signup(username, password);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button className="btn" type="submit" disabled={!isFormValid()}>
        Sign Up
      </button>
    </form>
  );
}

"use client";

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  

const handleLogout = () => {
  const router = useRouter();
  // Perform logout logic (e.g., clearing session cookies, tokens)
  localStorage.clear(); // Example: Clear local storage
  router.push('/login'); // Redirect to the login page
};

  return (
    <div onClick={handleLogout} className="cursor-pointer flex items-center gap-3 bg-white h-12 p-2 mt-4">
      <img src="/assets/logout_icon.svg" alt="Logout Icon" className="w-5 h-5" />
      <span className="mt-1">Logout</span>
    </div>
  );
};

export default LogoutButton;

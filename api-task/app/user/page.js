'use client';

import { useEffect, useState } from 'react';

export default function RandomUserPage() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    setUser(data.results[0]);
  };

  useEffect(() => {
    fetchUser();
    const interval = setInterval(fetchUser, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!user) return <p>Yüklənir...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Random User</h1>
      <img src={user.picture.large} alt="User" />
      <p><strong>Name:</strong> {user.name.first} {user.name.last}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Country:</strong> {user.location.country}</p>
    </div>
  );
}

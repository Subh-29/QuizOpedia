'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/actions/userAction'

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const bar1 = useRef(null);
  const bar2 = useRef(null);
  const bar3 = useRef(null);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log("Token: ", token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        // console.log("decoded ", decoded);

        setUser(decoded);
      } catch (err) {
        // console.error('Invalid token');
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(menuRef.current, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.3 });
      gsap.to(bar1.current, { rotate: 45, y: 8, duration: 0.3 });
      gsap.to(bar2.current, { x: -300 + "vw", duration: 0.2 });
      gsap.to(bar3.current, { rotate: -45, y: -8, duration: 0.3 });
    } else {
      gsap.to(menuRef.current, { height: 0, opacity: 0, duration: 0.3 });
      gsap.to(bar1.current, { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(bar2.current, { x: 0, duration: 0.2 });
      gsap.to(bar3.current, { rotate: 0, y: 0, duration: 0.3 });
    }
  }, [menuOpen]);

  const navLinkStyles = (path) =>
    pathname === path
      ? 'text-white bg-[var(--accent)] px-4 py-2 rounded-md'
      : 'text-zinc-300 hover:text-[var(--text-on-light)] hover:bg-[var(--soft)]/50 px-4 py-2 rounded-md transition-all';

  const handleLogout = () => {
    dispatch(logoutUser());
    setUser(null);
    setMenuOpen(false);
    router.push('/');
  };

  const isAdmin = user?.role === 'admin';
  const isUser = user;

  return (
    <nav className="bg-zinc-900/60 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-15">
          <Link href="/" className="text-white font-bold text-4xl tracking-tight">
            QuizOpedia
          </Link>

          {/* Hamburger */}
          <div className="md:hidden flex flex-col justify-center items-center gap-[6px]" onClick={() => setMenuOpen(!menuOpen)}>
            <span ref={bar1} className="w-6 h-[2px] bg-white block transition-all duration-300" />
            <span ref={bar2} className="w-6 h-[2px] bg-white block transition-all duration-300" />
            <span ref={bar3} className="w-6 h-[2px] bg-white block transition-all duration-300" />
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className={navLinkStyles('/')}>Home</Link>
            <Link href="/about" className={navLinkStyles('/about')}>About</Link>
            <Link href="/contact" className={navLinkStyles('/contact')}>Contact Us</Link>
            {isUser && <Link href="/user" className={navLinkStyles('/user')}>User</Link>}
            {isUser && <Link href="/user/quiz" className={navLinkStyles('/user/quiz')}>Quiz</Link>}
            {isAdmin && <Link href="/admin" className={navLinkStyles('/admin')}>Admin</Link>}
            {isAdmin && <Link href="/admin/quiz" className={navLinkStyles('/admin/quiz')}>Admin Quiz</Link>}
            {user ? (
              <button onClick={handleLogout} className="text-red-400 hover:text-white px-4 py-2 rounded-md transition-all">
                Logout
              </button>
            ) : (
              <Link href="/login" className={navLinkStyles('/login')}>Login</Link>
            )}
          </div>
        </div>

        {/* Mobile */}
        <div ref={menuRef} className="overflow-hidden md:hidden flex flex-col gap-2 py-1">
          <Link href="/" onClick={() => setMenuOpen(false)} className={navLinkStyles('/')}>Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className={navLinkStyles('/about')}>About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className={navLinkStyles('/contact')}>Contact Us</Link>
          
          {isUser && <Link href="/user" onClick={() => setMenuOpen(false)} className={navLinkStyles('/user')}>User</Link>}
          {isUser && <Link href="/user/quiz" onClick={() => setMenuOpen(false)} className={navLinkStyles('/user/quiz')}>Quiz</Link>}
          {isAdmin && <Link href="/admin" onClick={() => setMenuOpen(false)} className={navLinkStyles('/admin')}>Admin</Link>}
          {isAdmin && <Link href="/admin/quiz" onClick={() => setMenuOpen(false)} className={navLinkStyles('/admin/quiz')}>Admin Quiz</Link>}

          {user ? (
            <button onClick={handleLogout} className="text-left text-red-400 hover:text-white px-4 py-2 rounded-md transition-all">
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className={navLinkStyles('/login')}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

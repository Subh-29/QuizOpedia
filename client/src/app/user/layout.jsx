import UserGuard from '@/components/UserGuard';

export default function AdminLayout({ children }) {
  return <UserGuard>{children}</UserGuard>;
}

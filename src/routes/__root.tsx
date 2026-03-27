import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Header } from '../layout/Header.tsx';
import { Footer } from '../layout/Footer.tsx';

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </>
  )
});

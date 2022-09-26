import Header from "./Header";
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Header />
      {children}
    </div>
  );
}

export default Layout;

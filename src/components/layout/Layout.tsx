import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = React.memo(
  ({ children, showHeader = true }) => {
    return (
      <div className="min-h-screen pb-16 bg-gradient-to-b from-background via-background to-background relative overflow-hidden animated-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-cyan-400/5" />
        {showHeader && <Header />}
        <main
          role="main"
          className={`container mx-auto px-4 pb-16 ${showHeader ? "pt-16" : ""}`}
        >
          {children}
        </main>
        <BottomNav />
      </div>
    );
  },
);

export default Layout;

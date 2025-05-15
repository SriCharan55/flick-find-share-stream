
import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16 px-4">
        <p className="text-sm text-muted-foreground md:text-base">
          © {new Date().getFullYear()} CineHaven. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm md:text-base">
          <a href="#" className="text-muted-foreground hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="text-muted-foreground hover:underline">
            Terms of Service
          </a>
          <span className="flex items-center text-muted-foreground">
            Made with <Heart className="h-4 w-4 mx-1 text-primary" /> by CineHaven
          </span>
        </div>
      </div>
    </footer>
  );
};

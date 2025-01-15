"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Globe className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">World Tourism</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/blogs")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              Blogs
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "px-3 py-2 text-sm font-medium",
                    pathname.startsWith("/destination")
                      ? "text-primary"
                      : "text-gray-600"
                  )}
                >
                  Destinations
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/destination/usa">USA</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/destination/india">India</Link>
                </DropdownMenuItem>
                {/* Add more countries */}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "px-3 py-2 text-sm font-medium",
                    pathname.startsWith("/category")
                      ? "text-primary"
                      : "text-gray-600"
                  )}
                >
                  Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/category/beaches">Beaches</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/category/mountains">Mountains</Link>
                </DropdownMenuItem>
                {/* Add more categories */}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              href="/about"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium",
                isActive("/about")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              About Us
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive("/")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive("/blogs")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              Blogs
            </Link>
            <Link
              href="/destinations"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                pathname.startsWith("/destination")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              Destinations
            </Link>
            <Link
              href="/categories"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                pathname.startsWith("/category")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive("/about")
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
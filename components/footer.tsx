import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">World Tourism</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Discover amazing destinations around the world with detailed travel
              guides, tips, and booking options.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-base text-gray-600 hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-base text-gray-600 hover:text-primary"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-base text-gray-600 hover:text-primary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Categories
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/category/beaches"
                  className="text-base text-gray-600 hover:text-primary"
                >
                  Beaches
                </Link>
              </li>
              <li>
                <Link
                  href="/category/mountains"
                  className="text-base text-gray-600 hover:text-primary"
                >
                  Mountains
                </Link>
              </li>
              <li>
                <Link
                  href="/category/cities"
                  className="text-base text-gray-600 hover:text-primary"
                >
                  Cities
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="ml-2 text-gray-600">Location</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary" />
                <span className="ml-2 text-gray-600">+1 234 567 890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary" />
                <span className="ml-2 text-gray-600">contact@worldtourism.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} World Tourism. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
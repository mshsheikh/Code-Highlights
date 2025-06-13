import Link from "next/link";

export const metadata = {
  title: "404 – Page Not Found",
};

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#171236] to-[#962b2b] flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        {/* Large “404” title */}
        <h1 className="text-white text-6xl font-extrabold drop-shadow-lg mb-6">
          404
        </h1>

        {/* SVG illustration (you can swap this for any custom graphic) */}
        <svg
          className="mx-auto mb-6 w-48 h-48 opacity-80"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="90" fill="white" opacity="0.1" />
          <path
            d="M60 80 L80 100 L60 120 M140 80 L120 100 L140 120"
            stroke="white"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Explanatory text */}
        <p className="text-white text-lg mb-8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        {/* Button back home */}
        <Link
          href="/"
          className="
            inline-block
            bg-white
            text-black
            font-semibold
            px-6
            py-3
            rounded-full
            shadow-lg
            transition
            duration-200
            hover:bg-purple-600
            hover:text-white
          "
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Logo from "public/logo.png";
import React from "react";
import { config } from "@/config";
import { locales } from "@/locales";
import { routes } from "@/routes";

const HomePage = () => (
  <>
    <Head>
      <title>{locales.heroTitle}</title>
      <meta name="description" content={locales.heroDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="isolate bg-white">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fc8d89"></stop>
              <stop offset="1" stopColor="#ff8080"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex flex-1">
            <Link href={routes.home} className="-m-1.5 p-1.5">
              <span className="sr-only">{config.APP_NAME}</span>
              <Image className="h-10 w-10 rounded-full" src={Logo} alt="Logo" />
            </Link>
          </div>

          <div>
            <Link
              href={routes.signIn}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {locales.mint}
            </Link>
          </div>

          <div className="flex flex-1 justify-end">
            <Link
              href={routes.signIn}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {locales.signIn}
            </Link>
          </div>
        </nav>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {locales.heroTitle}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {locales.heroDescription}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href={routes.signIn}
                  className="rounded-md bg-theme-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-theme-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-600"
                >
                  {locales.getStatrted}
                </Link>
                <a
                  href="https://github.com/0xtiby/nw3"
                  className="text-base font-semibold leading-7 text-gray-900"
                >
                  {locales.learnMore}
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fc8d89"></stop>
                  <stop offset="1" stopColor="#ff8080"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </main>
    </div>
  </>
);

export default HomePage;

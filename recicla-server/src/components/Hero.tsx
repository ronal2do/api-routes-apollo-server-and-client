"use client"

import { useId } from 'react'

import { AppScreen } from './AppScreen'
import { AppStoreLink } from './AppStoreLink'
import { Button } from './Button'
import { Container } from './Container'
import { PhoneFrame } from './PhoneFrame'
import Image from 'next/image'
import clsx from 'clsx'
const logoBbc = '/images/logos/bbc.svg'
const logoCbs = '/images/logos/cbs.svg'
const logoCnn = '/images/logos/cnn.svg'
const logoFastCompany = '/images/logos/fast-company.svg'
const logoForbes = '/images/logos/forbes.svg'
const logoHuffpost = '/images/logos/huffpost.svg'
const logoTechcrunch = '/images/logos/techcrunch.svg'
const logoWired = '/images/logos/wired.svg'

function BackgroundIllustration(props: React.SVGProps<SVGSVGElement>) {
  let id = useId()

  return (
    <div className={props.className}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#c7ebcc"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#84d28f" />
            <stop offset="1" stopColor="#84d28f" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#c7ebcc"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#84d28f" />
            <stop offset="1" stopColor="#84d28f" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#ffffff" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
      />
    </svg>
  )
}

const homeMan = '/images/home-man.png'
const stars = '/images/stars01.png'

function AppDemo() {
  return (
    <AppScreen>
      <AppScreen.Body>
        <AppScreen.Title>
          <div className="text-xs p-4 leading-6 text-white bg-paradiso-900 bg-contain bg-no-repeat bg-right-bottom" style={{backgroundImage: `url(${homeMan})`, backgroundPosition: "164px 50px" }}>
            <h2 className='text-white font-medium text-2xl'>Hi Ronaldo,</h2>
            <p>you have</p>
            <p className='text-paradiso-300 font-extrabold text-2xl'>8310 <span className='text-lg'>points</span></p>
            <p className='w-48 pb-4'>To earn more points and coupons, answer questions and stay tuned for notifications.</p>
          </div>
        </AppScreen.Title>
        <div className="p-4">
          <div className="flex gap-2">
            <div className="text-xs leading-6 text-paradiso-900">
              <div className="bg-contain bg-no-repeat bg-right-bottom" style={{backgroundImage: `url(${stars})`}}>
                <p className="font-bold text-center">Tip of the day</p>
                <h1 className='text-bay-leaf-500 font-extrabold text-center py-4 text-2xl'>Services</h1>
              </div>
              <p className="text-paradiso-900 text-center font-medium py-4">Large volumes such as old furniture and appliances and tree trimmings have a sure way of discarding. Just call 3169.2900 and make an appointment with Ambiental's special solid waste collection staff.</p>
            </div>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-5">            
            <div className="mt-4 rounded-lg bg-bay-leaf-500 px-4 py-2 text-center text-sm font-semibold text-white">
              Keep playing
            </div>
          </div>
        </div>
      </AppScreen.Body>
    </AppScreen>
  )
}

export function Hero() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-6xl font-bold tracking-tight text-bay-leaf-300">
              Recycle and have fun with positive impact!
            </h1>
            <p className="mt-6 text-lg text-paradiso-900 dark:text-aqua-haze-50">
              ReciclaAPP is the perfect app for anyone who wants to make a positive impact on the environment while having fun. Join the ReciclaAPP community today and start earning points for your efforts towards a sustainable future.
            </p>

            <p className="mt-6 text-lg text-paradiso-900 dark:text-aqua-haze-50">
              Download ReciclaAPP at:
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <AppStoreLink />
              <AppStoreLink />
              <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                color="orange"
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <p className="ml-2.5">Watch the video</p>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-bottom-20 lg:-top-10 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <PhoneFrame className="mx-auto max-w-[366px]" priority>
                <AppDemo />
              </PhoneFrame>
            </div>
          </div>
          <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
            <p className="text-center text-sm font-semibold text-bay-leaf-500 lg:text-left">
              Partners
            </p>
            <ul
              role="list"
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
            >
              {[
                ['Forbes', logoForbes],
                ['TechCrunch', logoTechcrunch],
                ['Wired', logoWired],
                ['CNN', logoCnn, 'hidden xl:block'],
                ['BBC', logoBbc],
                ['CBS', logoCbs],
                ['Fast Company', logoFastCompany],
                ['HuffPost', logoHuffpost, 'hidden xl:block'],
              ].map(([name, logo, className]) => (
                <li key={name} className={clsx('flex relative', className)}>
                  <Image src={logo} alt={name} height={32} width={100}
                    className="h-8 object-cover" unoptimized />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}

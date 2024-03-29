"use client"

import { Fragment, LegacyRef, Ref, useEffect, useId, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'

import { AppScreen } from './AppScreen'
import { CircleBackground } from './CircleBackground'
import { Container } from './Container'
import { PhoneFrame } from './PhoneFrame'
import {
  DiageoLogo,
  LaravelLogo,
  MirageLogo,
  ReversableLogo,
  StatamicLogo,
  StaticKitLogo,
  TransistorLogo,
  TupleLogo,
} from './StockLogos'

const MotionAppScreenHeader = motion(AppScreen.Header)
const MotionAppScreenBody = motion(AppScreen.Body)

const features = [
  {
    name: 'Invite friends for better returns',
    description:
      'For every friend you invite to ReciclaAPP, you get insider notifications 5 seconds sooner. And it’s 10 seconds if you invite an insider.',
    icon: DeviceUserIcon,
    screen: InviteScreen,
  },
  {
    name: 'Answer the quiz and get points',
    description:
      'We hide your stock purchases behind thousands of anonymous trading accounts, so suspicious activity can never be traced back to you.',
    icon: DeviceNotificationIcon,
    screen: InvestScreen,
  },
  {
    name: 'Every questions has many alternatives',
    description:
      'We hide your stock purchases behind thousands of anonymous trading accounts, so suspicious activity can never be traced back to you.',
    icon: DeviceTouchIcon,
    screen: OptionsScreen,
  },
]

function DeviceUserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#FFFFFF" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 23a3 3 0 100-6 3 3 0 000 6zm-1 2a4 4 0 00-4 4v1a2 2 0 002 2h6a2 2 0 002-2v-1a4 4 0 00-4-4h-2z"
        fill="#ff9d75"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v24a4.002 4.002 0 01-3.01 3.877c-.535.136-.99-.325-.99-.877s.474-.98.959-1.244A2 2 0 0025 28V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 001.041 1.756C8.525 30.02 9 30.448 9 31s-.455 1.013-.99.877A4.002 4.002 0 015 28V4z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

function DeviceNotificationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#FFFFFF" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#FFFFFF"
      />
      <path
        d="M9 8a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H11a2 2 0 01-2-2V8z"
        fill="#ff9d75"
      />
    </svg>
  )
}

function DeviceTouchIcon(props: React.SVGProps<SVGSVGElement>) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient
          id={`${id}-gradient`}
          x1={14}
          y1={14.5}
          x2={7}
          y2={17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ff9d75" />
          <stop offset={1} stopColor="#D4D4D4" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx={16} cy={16} r={16} fill="#FFFFFF" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v13h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h4v2H9a4 4 0 01-4-4V4z"
        fill="#FFFFFF"
      />
      <path
        d="M7 22c0-4.694 3.5-8 8-8"
        stroke={`url(#${id}-gradient)`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 20l.217-5.513a1.431 1.431 0 00-2.85-.226L17.5 21.5l-1.51-1.51a2.107 2.107 0 00-2.98 0 .024.024 0 00-.005.024l3.083 9.25A4 4 0 0019.883 32H25a4 4 0 004-4v-5a3 3 0 00-3-3h-5z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

const headerAnimation = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const maxZIndex = 2147483647

type BodyAnimationCustomProps = {
  changeCount: number
  isForwards: boolean
}

const bodyVariantBackwards: BodyVariant = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: 'blur(4px)',
  transition: { duration: 0.4 },
}

type BodyVariant = {
  y?: string
  zIndex: number
  opacity?: number
  scale?: number
  filter?: string
  transition: {
    duration: number
  }
}

const bodyVariantForwards = (custom) => ({
  y: '100%',
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
})

type BodyAnimation = {
  initial: string
  animate: string
  exit: string
  variants: {
    initial: (custom: BodyAnimationCustomProps) => BodyVariant
    animate: (custom: BodyAnimationCustomProps) => {
      y: string
      opacity: number
      scale: number
      zIndex: number
      filter: string
      transition: {
        duration: number
      }
    }
    exit: (custom: BodyAnimationCustomProps) => BodyVariant
  }
}

const bodyAnimation: BodyAnimation = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: (custom: BodyAnimationCustomProps): BodyVariant =>
      custom.isForwards ? bodyVariantForwards(custom) : bodyVariantBackwards,
    animate: (custom) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom: BodyAnimationCustomProps) =>
      custom.isForwards ? bodyVariantBackwards : bodyVariantForwards(custom),
  },
}

function InviteScreen({ custom, animated = false }: {
  custom?: BodyAnimationCustomProps;
  animated?: boolean | undefined;
}) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(animated ? headerAnimation : {})}>
         <AppScreen.Title>
          <div className="text-xs p-4 text-white bg-paradiso-900 bg-origin-content bg-no-repeat bg-bottom text-center" style={{ backgroundImage: `url(${stars})` }}>
            <p className='pb-4 text-xl'>Invite friends</p>
            <p className='text-paradiso-300 font-extrabold text-xl'>100 points</p>
          </div>
        </AppScreen.Title>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(animated ? { ...bodyAnimation, custom } : {})}>
        <div className="px-4 py-6">
          <div className="space-y-6">
            {[
              { label: 'Full name', value: 'Albert H. Wiggin' },
              { label: 'Email address', value: 'awiggin@chase.com' },
            ].map((field) => (
              <div key={field.label}>
                <div className="text-sm text-gray-500">{field.label}</div>
                <div className="mt-2 border-b border-gray-200 pb-2 text-sm text-gray-900">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-bay-leaf-300 px-3 py-2 text-center text-sm font-semibold text-white">
            Invite friend
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

const stars = '/images/stars02.png'

function InvestScreen({ custom, animated = false }: {
  custom?: BodyAnimationCustomProps;
  animated?: boolean | undefined;
}) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(animated ? headerAnimation : {})}>
        <AppScreen.Title>
          <div className="text-xs p-4 text-white bg-paradiso-900 bg-origin-content bg-no-repeat bg-bottom text-center" style={{ backgroundImage: `url(${stars})` }}>
            <p className='px-8 pb-4'>Read carefully because the next question is worth</p>
            <p className='text-paradiso-300 font-extrabold text-4xl'>100</p>
            <p className='text-paradiso-300 font-extrabold text-2xl'>points</p>
          </div>
        </AppScreen.Title>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(animated ? { ...bodyAnimation, custom } : {})}>
        <div className="px-4 py-6">
          <div className="space-y-4">
            <p>
              A malleable, light and resistant metal, aluminum is one of the favorites of the packaging industry. Another advantage of it is its almost infinite reuse, that is, it can be processed several times with close to zero loss.
            </p>
            <div className="rounded-lg bg-bay-leaf-300 px-3 py-2 text-center text-sm font-semibold text-white">
              I'm ready to reply
            </div>
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

const alternatives = [
  "Brazil",
  "Ntherlands",
  "Japan",
  "United States"
]

function OptionsScreen({ custom, animated = false }: {
  custom?: BodyAnimationCustomProps;
  animated?: boolean | undefined;
}) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(animated ? headerAnimation : {})}>
        <AppScreen.Title>
          <div className="text-xs p-4 text-white bg-paradiso-900 bg-origin-content bg-no-repeat bg-bottom text-center" style={{ backgroundImage: `url(${stars})` }}>
            <p className='pb-4 text-xl'>Which country is champion in aluminum recycling?</p>
            <p className='text-paradiso-300 font-extrabold text-xl'>100 points</p>
          </div>
        </AppScreen.Title>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(animated ? { ...bodyAnimation, custom } : {})}>
        <div className="px-4 py-6">
          <div className="space-y-4">
            {alternatives.map((alt, idx) => (
              <div key={idx} className={`
                rounded-lg px-3 py-2 text-center text-sm font-semibold
                ${idx === 0 ? "bg-amber-500" : "bg-gray-300"}
                ${idx === 0 ? "text-white" : "text-paradiso-900"}
              `}>
                {alt}
              </div>
            ))}
            <div className="rounded-lg bg-bay-leaf-300 px-3 py-2 text-center text-sm font-semibold text-white">
              Skip question
            </div>
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function usePrevious(value: number) {
  let ref = useRef<number>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function FeaturesDesktop() {
  let [changeCount, setChangeCount] = useState(0)
  let [selectedIndex, setSelectedIndex] = useState(0)
  let prevIndex = usePrevious(selectedIndex)
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  let onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex)
      setChangeCount((changeCount) => changeCount + 1)
    },
    100,
    { leading: true }
  )

  return (
    <Tab.Group
      as="div"
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <Tab.List className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-blumine-800/30"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-blumine-800/50"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 text-lg font-semibold text-white">
                <Tab className="text-left [&:not(:focus-visible)]:focus:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-white">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </Tab.List>
      <div className="relative col-span-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#13B5C8" className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]">
          <Tab.Panels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <Tab.Panel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] [&:not(:focus-visible)]:focus:outline-none"
                  >
                    <feature.screen
                      animated
                      custom={{ isForwards, changeCount }}
                    />
                  </Tab.Panel>
                ) : null
              )}
            </AnimatePresence>
          </Tab.Panels>
        </PhoneFrame>
      </div>
    </Tab.Group>
  )
}

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState<number>(0)
  let slideContainerRef = useRef<HTMLDivElement>(null)
  let slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(slideRefs.current.indexOf(entry.target as HTMLDivElement))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      }
    )

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex: number) => (
          <div
            key={featureIndex}
            ref={(ref) => ((slideRefs.current[featureIndex]) = ref)}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-blumine-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color="#13B5C8"
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <PhoneFrame className="relative mx-auto w-full max-w-[366px]">
                <feature.screen />
              </PhoneFrame>
              <div className="absolute inset-x-0 bottom-0 bg-blumine-800/95 p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-white">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex: number) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-blumine-300' : 'bg-blumine-500'
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex]?.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-blumine-700 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-bay-leaf-300">
            Every feature you need to win. Try it for yourself.
          </h2>
          <p className="mt-2 text-lg text-white">
            ReciclaAPP was built for investors like you who play by their own rules
            and aren’t going to let SEC regulations get in the way of their
            dreams. If other investing tools are afraid to build it, ReciclaAPP has
            it.
          </p>
        </div>
      </Container>
      <div className="mt-16 md:hidden">
        <FeaturesMobile />
      </div>
      <Container className="hidden md:mt-20 md:block">
        <FeaturesDesktop />
      </Container>
    </section>
  )
}

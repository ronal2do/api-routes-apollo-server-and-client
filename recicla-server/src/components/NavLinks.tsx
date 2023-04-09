import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const links = [
  ['Features', '#features'],
  ['Reviews', '#reviews'],
  ['Pricing', '#pricing'],
  ['FAQs', '#faqs'],
]


export function NavLinks() {
  let [hoveredIndex, setHoveredIndex] = useState<Number | null>(null)

  return (
    <>
      {links.map(([label, href], index) => (
        <Link
          key={label}
          href={href}
          className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-blumine-800 dark:text-aqua-haze-50 transition-colors delay-150 hover:text-blumine-900 hover:delay-[0ms]"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-blumine-700"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <p className="relative z-10 font-medium">{label}</p>
        </Link>
      ))}
    </>
  )
}

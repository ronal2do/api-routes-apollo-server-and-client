import { AppStoreLink } from './AppStoreLink'
import { CircleBackground } from './CircleBackground'
import { Container } from './Container'

export function CallToAction() {
  return (
    <section
      id="get-free-shares-today"
      className="relative overflow-hidden bg-bay-leaf-300 py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#fff" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Join the green revolution today, every small action counts!
          </h2>
          <p className="mt-4 text-lg text-paradiso-700">
            It takes 30 seconds to sign up. Download the app and create an
            account today.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreLink color="white" />
          </div>
        </div>
      </Container>
    </section>
  )
}

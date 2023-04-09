import { getCurrentUser } from '../../actions/getCurrentUser'
import { CallToAction } from '../../components/CallToAction'
import { Faqs } from '../../components/Faqs'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Hero } from '../../components/Hero'
import { PrimaryFeatures } from '../../components/PrimaryFeatures'
import { Reviews } from '../../components/Reviews'
import { SecondaryFeatures } from '../../components/SecondaryFeatures'

export default async function Page() {
  const currentUser = await getCurrentUser();
  return (
    <>
      <main>
        <Header currentUser={currentUser}/>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Reviews />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}



import type { NextPage } from "next"
import { Footer, LandpageHeader, LandpageHero, SubscribeToNewsletter } from "../components";

const Index: NextPage = () => {
  return (
    <>
      <LandpageHeader />
      <LandpageHero />
      <SubscribeToNewsletter/>
      <Footer/>
     </>
  )
};

export default Index;
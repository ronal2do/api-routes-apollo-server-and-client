import {
  Box,
  Container
} from "@chakra-ui/react";

import { Session } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { DashboardLayout, QuestionsPreview, StatsWithIcons } from "../../components";

import { NextPageWithLayout } from "../_app";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void
}

const Dashboard: NextPageWithLayout<IAuthProps> = () => {
  return (
    <>
      <Container maxW="6xl" p={{ base: 5, md: 10 }}>
        Main Content Here 
      </Container>
      <StatsWithIcons/>
      {/* <QuestionsPreview /> */}
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    }
  }
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default Dashboard

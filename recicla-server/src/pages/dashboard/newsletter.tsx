import {
  Box,
} from "@chakra-ui/react";

import { Session } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { DashboardLayout } from "../../components";

import { NextPageWithLayout } from "../_app";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void
}

const Newsletter: NextPageWithLayout<IAuthProps> = () => {
  const session = useSession()
  return (
    <>
      <Box height="100vh" p={4}>
        Newsletter Content Here {session?.data?.user?.name }
      </Box>
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

Newsletter.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default Newsletter

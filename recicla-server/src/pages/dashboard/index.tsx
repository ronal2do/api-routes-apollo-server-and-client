import {
  Box,
} from "@chakra-ui/react";

import { Session } from "@prisma/client";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { DashboardLayout } from "../../components";

import { NextPageWithLayout } from "../_app";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void
}

const Dashboard: NextPageWithLayout<IAuthProps> = () => {
  return (
    <>
      <Box height="100vh" p={4}>
        Main Content Here 
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

Dashboard.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default Dashboard

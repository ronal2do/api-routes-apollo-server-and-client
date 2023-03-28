import {
  Box,
  Container,
  Text
} from "@chakra-ui/react";

import { Session } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { DashboardLayout, QuestionsPreview, StatsWithIcons } from "../../components";
import { useGetQuestions } from "../../hooks";

import { NextPageWithLayout } from "../_app";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void
}

const Question = () => {
  const { data, loading, error } = useGetQuestions();

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log('data', data?.questions)
  return (
    <>
      {data?.questions ? (
        <QuestionsPreview questions={data.questions}/>
      ) : (<Text>No questions</Text>)
      }
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

Question.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default Question

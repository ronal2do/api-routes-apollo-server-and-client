import { Question, QuestionLevels } from "@prisma/client";
import { GraphQLContext } from "../../pages/api/graphql";

function createRelayData(data: any, args: any) {
  if (data.length === 0) {
    return {
      count: 0,
      pageInfo: {
        endCursor: null,
        hasNextPage: null,
      },
      edges: [],
    }
  }

  let first = 5;

  if (args.first !== undefined) {
    const min_value = 1;
    const max_value = 25;
    if (args.first < min_value || args.first > max_value) {
      throw new Error(
        `Invalid limit value (min value: ${min_value}, max: ${max_value})`
      );
    }
    first = args.first;
  }
  // initialise cursor
  let after = 0;
  if (args.after !== undefined) {
    const index = data.findIndex((item: any) => item.id === args.after);
    if (index === -1) {
      throw new Error(`Invalid after value: cursor not found.`);
    }
    after = index + 1;
    if (after === data.length) {
      throw new Error(
        `Invalid after value: no items after provided cursor.`
      );
    }
  }

  const entities = data.slice(after, after + first);
  const last = entities[entities.length - 1];

  return {
    count: data.length,
    pageInfo: {
      endCursor: last.id,
      hasNextPage: after + first < data.length,
    },
    edges: entities.map((entity: any) => ({
      cursor: entity.id,
      node: entity,
    })),
  };
}

interface QuestionInputArgs {
  introduction: string
  label: string
  level: QuestionLevels
  correctAnswer: number,
  answers: string[]
}

const resolvers = {
  Mutation: {
    registerQuestion: async (
      _: any, 
      args: QuestionInputArgs, 
      context: GraphQLContext
    ): Promise<{ question?: Question, success?: boolean, error: string | null }> => {
      const { introduction,
        label,
        level,
        correctAnswer,
        answers
      } = args;
      const { session, prisma } = context;

      try {
        const count = await prisma.question.count()
        const existing = await prisma.question.findUnique({
          where: {
            // @ts-ignore
            label
          }
        })

        if (existing) {
          return {
            question: existing,
            error: "question elaready registered"
          }
        }
        const sequentialIndex = count + 1;
        const question = await prisma.question.create({
          data: {
            introduction,
            label,
            level,
            correctAnswer,
            answers,
            sequentialIndex,
          }
        })
        
        return {
          question,
          success: true,
          error: null
        }

      } catch (error: any) {
        console.log("nerwsletter errror", error)
        return {
          error: error?.message,
          success: false
        }
      }
    },
    // answerQuestion(userId: String!, questionId: String!, result: Boolean!): MetaQuestionPayload
    // addQuestionMetadata(questionId: String!, result: Boolean!): MetaQuestionPayload
    answerQuestion: async (
      _: any, 
      args: { userId: string, questionId: string, result: boolean }, 
      context: GraphQLContext
    ): Promise<{ success?: boolean, error?: string | null }> => {
      const {
        userId,
        questionId,
        result
      } = args;
      const { session, prisma } = context;

      try {
        const findQuestion = await prisma.question.findUnique({
          where: {
            id: questionId
          }
        })

        if (!findQuestion) {
          return {
            error: "question not found"
          }
        }
        
        const findMeta = await prisma.questionMetadata.findUnique({
          where: {
            questionId
          }
        })

        if (!findMeta) {

          await prisma.questionMetadata.create({
            data: {
              questionId,
              hits: result == true ? 1 : 0,
              misses: result == false ? 1 : 0,
              views: 1,
            }
          })

        }
        
        if (findMeta) {
          await prisma.questionMetadata.update({
            where: {
              questionId
            },
            data: {
              hits: result == true ? findMeta.hits + 1 : findMeta.hits,
              misses: result == false ? findMeta.misses + 1 : findMeta.misses,
              views: findMeta.views + 1,
            }
          })
        }
        
        await prisma.computedAnswers.create({
          data: {
            userId,
            questionId,
            result,
          }
        })
        
        return {
          success: true,
          error: null
        }

      } catch (error: any) {
        console.log("nerwsletter errror", error)
        return {
          error: error?.message,
          success: false
        }
      }
    },
  },
  Query: {
    questions: async (_: any, args: any, context: GraphQLContext) => {
      const { prisma } = context;
      const data = await prisma.question.findMany({
        include: {
          metadata: true
        },
      })
      const convert = createRelayData(data, args)
      return convert
    },
    randomQuestions: async (_: any, args: any, context: GraphQLContext) => {
      const { prisma } = context;
      const count = await prisma.question.count()

      const randomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      const sequentialIndex = randomNumber(1, count)
      const data = await prisma.question.findUnique({
        where: {
          sequentialIndex
        }
      })

      return data
    },
  },
}

export default resolvers
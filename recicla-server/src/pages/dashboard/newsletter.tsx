import {
  Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { DashboardLayout } from "../../components";
import { useGetNewsletters } from "../../hooks";

const Newsletter = () => {
  const { data, loading, error } = useGetNewsletters();

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Box height="100vh" p={4}>
      <TableContainer>
        <Table variant='striped'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>email</Th>
            </Tr>
          </Thead>
          <Tbody>
          {data && data.newsletters?.edges?.map((edge) => (
            <Tr key={edge.node.id}>
              <Td>{edge.node.id}</Td>
              <Td>{edge.node.email}</Td>
            </Tr>
          ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Id</Th>
              <Th>email</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}

Newsletter.getLayout = function getLayout(page: ReactNode) {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}

export default Newsletter

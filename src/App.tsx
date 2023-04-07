import {} from '@chakra-ui/icons';
import {
  Button,
  Container,
  Heading,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './components/Column';
import DarkModeIconButton from './components/DarkModeIconButton';
import { ColumnType } from './utils/enums';
import { TaskModel } from './utils/models';
function App() {
  const [elements, setElements] = useState<TaskModel[]>([]);
  useEffect(() => {
    const data = localStorage.getItem('tasks_on_right_area');
    if (data !== null) setElements(JSON.parse(data));
  }, []);

  const [showElement, setShowElement] = useState<boolean>(false);

  // console.log(elements);
  function handleSave() {
    setShowElement(true);
  }

  return (
    <main>
      <Heading
        fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        mt={4}
      >
        Welcome to DnD Kanban
      </Heading>

      <DarkModeIconButton position="absolute" top={0} right={2} />

      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 32, md: 64 }}
          >
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
          </SimpleGrid>
        </Container>
      </DndProvider>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '50px',
        }}
      >
        <div>
          <Button onClick={handleSave}>
            <span>Save</span>
          </Button>
        </div>

        <div className="table-container">
          <TableContainer>
            <Table variant="simple">
              <TableCaption>My table</TableCaption>
              <Thead>
                <Tr>
                  <Th>Th1</Th>
                  <Th>Th2</Th>
                  <Th>Th3</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  {/* <Td>{showElement && elements[0]?.title}</Td> */}
                  {/* <Td>{showElement && elements[2]?.title}</Td> */}
                  {showElement &&
                    elements?.map((elem, index) => (
                      <Td key={index}>{elem.title}</Td>
                    ))}
                </Tr>
                <Tr>
                  {/* <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td> */}
                </Tr>
                <Tr>
                  {/* <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td> */}
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </main>
  );
}

export default App;

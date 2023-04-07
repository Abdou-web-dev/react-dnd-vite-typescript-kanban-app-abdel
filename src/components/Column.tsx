import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { TasksList } from '../components/lists/TasksList';
import useColumnDrop from '../hooks/useColumnDrop';
import useColumnTasks from '../hooks/useColumnTasks';
import { ColumnType } from '../utils/enums';
import './styles.scss';

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In Progress': 'blue',
};

function Column({ column }: { column: ColumnType }) {
  const {
    tasks,
    addEmptyTask,
    deleteTask,
    dropTaskFrom,
    swapTasks,
    updateTask,
  } = useColumnTasks(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  return (
    <>
      <div className="column-component-container">
        <Box className="box-container">
          <Heading fontSize="md" mb={4} letterSpacing="wide">
            <Badge
              px={2}
              py={1}
              rounded="lg"
              colorScheme={ColumnColorScheme[column]}
            >
              {column}
            </Badge>
          </Heading>
          <IconButton
            size="xs"
            w="full"
            color={useColorModeValue('gray.500', 'gray.400')}
            bgColor={useColorModeValue('gray.100', 'gray.700')}
            _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
            py={2}
            variant="solid"
            onClick={addEmptyTask}
            colorScheme="black"
            aria-label="add-task"
            icon={<AddIcon />}
          />
          <Stack
            className="chakra-elems-stack"
            ref={dropRef}
            direction={{ base: 'row', md: 'column' }}
            h={{ base: 300, md: 600 }}
            p={4}
            mt={2}
            spacing={4}
            bgColor={useColorModeValue('gray.50', 'gray.900')}
            rounded="lg"
            boxShadow="md"
            overflow="auto"
            opacity={isOver ? 0.85 : 1}
          >
            <TasksList {...{ tasks, column }}></TasksList>
          </Stack>
        </Box>
      </div>
    </>
  );
}

export default Column;

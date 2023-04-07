import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Checkbox, IconButton, ScaleFade, Select } from '@chakra-ui/react';
import _ from 'lodash';
import { memo, useEffect, useState } from 'react';
import { useTaskDragAndDrop } from '../hooks/useTaskDragAndDrop';
import { TaskModel } from '../utils/models';
import { AutoResizeTextarea } from './AutoResizeTextArea';

type TaskProps = {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel['id'], updatedTask: TaskModel) => void;
  onDelete: (id: TaskModel['id']) => void;
  onDropHover: (i: number, j: number) => void;
  tasks: TaskModel[];
};

function Task({
  index,
  task,
  tasks,
  onUpdate: handleUpdate,
  onDropHover: handleDropHover,
  onDelete: handleDelete,
}: TaskProps) {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>(
    { task, index: index },
    handleDropHover,
  );
  const [boxWidth, setBoxWidth] = useState<string>(``);
  const [textValue, setTextValue] = useState<string>('');
  const [selectValue, setSelectValue] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(true);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = e.target.value;
    // console.log(newTitle);
    let number_of_letters = countLetters(newTitle);
    if (number_of_letters <= 20 && number_of_letters >= 0) {
      setBoxWidth('60%');
    } else if (number_of_letters <= 24 && number_of_letters >= 20) {
      setBoxWidth('70%');
    } else if (number_of_letters <= 30 && number_of_letters >= 24) {
      setBoxWidth('85%');
    } else if (number_of_letters >= 35) {
      setBoxWidth('100%');
    }

    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  // a function that counts the number of letters of a text
  function countLetters(text: string) {
    const arr = text.split(''); //no space must be inside these quotes
    return arr.filter((word) => word !== '').length;
  }

  useEffect(() => {
    if (countLetters(task.title) >= 30) {
      setBoxWidth('100%');
    }
    // console.log((task.title.match(/\n/g) || '').length + 1);
    if (task) {
      console.log(task.color);
    }
  }, [task.title]);

  let newTasks = [...tasks];
  useEffect(() => {
    const cond_1 = task.color === 'cyan.300';
    const cond_2 = task.color === 'orange.300';
    const cond_3 = task.color === 'blue.300';
    const isRightColor: boolean = cond_1 || cond_2 || cond_3;

    if (task && task.column === 'In Progress' && isRightColor) {
      newTasks.push(task);
      localStorage.setItem('tasks_on_right_area', JSON.stringify(newTasks));
      // console.log(newTasks);
    }
    if (tasks.length === 0) {
      localStorage.removeItem('tasks_on_right_area');
    }
  }, [newTasks, task]);

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        style={{ width: boxWidth }}
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        w={200}
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={task.color}
        opacity={isDragging ? 0.5 : 1}
      >
        <IconButton
          position="absolute"
          top={0}
          right={0}
          zIndex={100}
          aria-label="delete-task"
          size="md"
          colorScheme="solid"
          color={'gray.700'}
          icon={<DeleteIcon />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={handleDeleteClick}
        />
        {task.color === `red.300` || task.color === `pink.300` ? (
          <Select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            // style={{ width: '200px' }}
          >
            <option value="sky">Sky</option>
            <option value="earth">Earth</option>
            <option value="mountains">Mountains</option>
          </Select>
        ) : task.color === `green.300` || task.color === `yellow.300` ? (
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            // value={task.title}
          />
        ) : task.color === `purple.300` || task.color === `teal.300` ? (
          <>
            <Checkbox
              checked={checked}
              onChange={handleCheckBoxChange}
            ></Checkbox>
          </>
        ) : (
          // show a textArea for other colors
          <AutoResizeTextarea
            style={{ overflowY: 'hidden' }}
            value={task.title}
            fontWeight="semibold"
            cursor="inherit"
            border="none"
            p={0}
            resize="none"
            minH={70}
            maxH={200}
            focusBorderColor="none"
            color="gray.700"
            onChange={handleTitleChange}
          />
        )}
      </Box>
    </ScaleFade>
  );
}
export default memo(Task, (prev, next) => {
  if (
    _.isEqual(prev.task, next.task) &&
    _.isEqual(prev.index, next.index) &&
    prev.onDelete === next.onDelete &&
    prev.onDropHover === next.onDropHover &&
    prev.onUpdate === next.onUpdate
  ) {
    return true;
  }

  return false;
});

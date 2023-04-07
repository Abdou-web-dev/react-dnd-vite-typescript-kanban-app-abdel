import { useLocalStorage } from 'usehooks-ts';

import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';

function useTaskCollection() {
  // var utc: string = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

  // useLocalStorage is React hook Similar to useState but first arg is key to the value in local storage.
  //   const [name, setName] = useLocalStorage("name", "Bob");
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>('tasks', {
    Todo: [
      {
        // id: utc,
        id: uuidv4(),
        column: ColumnType.TO_DO,
        title: 'Task 1',
        color: 'blue.300',
      },
    ],
    'In Progress': [
      {
        id: uuidv4(),
        column: ColumnType.IN_PROGRESS,
        title: 'Task 2',
        color: 'yellow.300',
      },
    ],
  });
}

export default useTaskCollection;

import useColumnTasks from '../../hooks/useColumnTasks';
import { ColumnType } from '../../utils/enums';
import { TaskModel } from '../../utils/models';
import Task from '../Task';

interface TasksListPros {
  tasks: TaskModel[];
  column: ColumnType;
}

export const TasksList = ({ tasks, column }: TasksListPros) => {
  const { deleteTask, swapTasks, updateTask } = useColumnTasks(column);

  return (
    <>
      {tasks.map((task: TaskModel, index: number) => (
        <div>
          <Task
            key={task.id}
            task={task}
            {...{ tasks }}
            index={index}
            onDropHover={swapTasks}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </div>
      ))}
    </>
  );
};

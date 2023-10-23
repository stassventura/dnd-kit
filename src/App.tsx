/* eslint-disable @typescript-eslint/no-explicit-any */
import KanbanBoard from './components/KanbanBoard';
import TaskCard from './components/TaskCard';
import { columns, items } from './data';
function App() {
  return (
    <>
      <KanbanBoard
        initialColumns={columns}
        initialItems={items}
        itemField="status"
        itemComponent={TaskCard}
        onChange={(items: any) => {
          console.log('change', items);
        }}
      />
    </>
  );
}

export default App;

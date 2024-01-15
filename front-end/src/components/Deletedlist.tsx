import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";
// import { useStore } from "@nanostores/react";
// import $deletedtodos from "@/store/DeletedTodos";
type todoType = {
  id: string;
  todo: string;
  description: string;
  time: string;
  lastUpdated?: string;
  title?: string;
};

type propsType = {
  todos: todoType[];
};

const Deletedlist = ({ todos }: propsType) => {
  return (
    <Table>
      <TableCaption>A list of your recent deleted todos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead className="w-[150px]">Todo</TableHead>
          <TableHead>Time</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo, id) => (
          <TableRow key={todo.id}>
            <TableCell>{id + 1}</TableCell>
            <TableCell className="font-medium">{todo.todo}</TableCell>
            <TableCell>{todo.time.split(",")[1]}</TableCell>
            <TableCell>
              <a className="w-full" href={"/bin/" + todo.id}>
                <ArrowUpRight />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Deletedlist;

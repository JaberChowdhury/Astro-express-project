import { Card, CardContent } from "@/components/ui/card";
import { Trash, FilePenLine } from "lucide-react";
// import $deletedtodos from "@/store/DeletedTodos";
// import $todos from "@/store/Todos";
// import { useStore } from "@nanostores/react";

interface propsType {
  info: string;
}

const Todoaction = ({ info }: propsType) => {
  // const deletedtodos = useStore($deletedtodos);
  // const todos = useStore($todos);

  const { from } = JSON.parse(info);

  return (
    <Card className="w-full border-none">
      <CardContent className="flex gap-x-2 flex-row-reverse">
        <a href={`/${from}`}>
          <FilePenLine className="text-blue-300" />
        </a>
        <a href={`/${from}`}>
          <Trash className="text-red-300" />
        </a>
      </CardContent>
    </Card>
  );
};

export default Todoaction;

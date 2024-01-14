import {
  Card,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

interface propsType {
  data: {
    id: string;
    todo: string;
    description: string;
    time: string;
  };
}

const Todo = ({ data }: propsType) => {
  return (
    <Card className="border-none">
      <CardContent>
        <Card className="w-full my-2 py-1 px-2 flex justify-between items-center">
          <CardDescription>ID :</CardDescription>
          <CardDescription>{data.id}</CardDescription>
        </Card>
      </CardContent>
      <CardContent>
        <CardDescription>{data.time}</CardDescription>
        <hr className="my-2" />
        <CardTitle>{data.todo}</CardTitle>
        <CardDescription className="mt-10">{data.description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Todo;

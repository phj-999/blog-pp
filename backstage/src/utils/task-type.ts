import { useQuery } from "react-query";
import { useHttp } from "./http";

export interface TaskType {
    id: number;
    name: string;
  }

  
export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};

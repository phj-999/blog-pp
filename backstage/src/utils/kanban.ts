import { useQuery, QueryKey, useMutation } from "react-query";
import { useHttp } from "./http";
import { useAddConfig } from "./use-optimistic-options";

export interface Kanban {
    id: number;
    name: string;
    projectId: number;
  }
  

export const useKanbans = (param?: Partial<Kanban>) => {
    const client = useHttp();
  
    return useQuery<Kanban[]>(["kanbans", param], () =>
      client("kanbans", { data: param })
    );
  };
  
  export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      (params: Partial<Kanban>) =>
        client(`kanbans`, {
          data: params,
          method: "POST",
        }),
      useAddConfig(queryKey)
    );
  };
  

  export interface SortProps {
    // 要重新排序的 item
    fromId: number;
    // 目标 item
    referenceId: number;
    // 放在目标item的前还是后
    type: "before" | "after";
    fromKanbanId?: number;
    toKanbanId?: number;
  }
    //拖拽后固定
//   export const useReorderKanban = (queryKey: QueryKey) => {
//     const client = useHttp();
//     return useMutation((params: SortProps) => {
//       return client("kanbans/reorder", {
//         data: params,
//         method: "POST",
//       });
//     }, useReorderKanbanConfig(queryKey));
//   };
  export const useReorderKanban = () => {
    const client = useHttp();
    return useMutation((params: SortProps) => {
      return client("kanbans/reorder", {
        data: params,
        method: "POST",
      });
    });
  };
  
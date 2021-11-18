import styled from '@emotion/styled';
import { Spin } from 'antd';
import React, { useCallback } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { Drag, Drop, DropChild } from '../../components/drag-and-drop';
import { useDocumentTitle } from '../../utils';
import { SearchPanel } from './search-panel';
import { useProjectInUrl, useTasksSearchParams } from './utils';

export const KanbanScreen = () => {
    useDocumentTitle("看板列表");

    const { data: currentProject } = useProjectInUrl();
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
        useKanbanSearchParams()
    );
    const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
    const isLoading = taskIsLoading || kanbanIsLoading;

    const onDragEnd = useDragEnd();

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ScreenContainer>
                <h1>{currentProject?.name}看板</h1>
            </ScreenContainer>
            <SearchPanel />
            {isLoading ? (
                <Spin size={"large"} />
            ) : (
                {/*column式排列 水平拖拽 id是kanban */ }
                < Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanban'}>
            <ColumnsContainer>


                {kanbans?.map((kanban) => (
                    <Drag key={kanban.uid}>
                        <KanbanColumn kanban={kanban} key={kanban.id} />
                    </Drag>
                ))}


                <CreateKanban />
            </ColumnsContainer>
        </>
    )
}
<TaskModal />
        </DragDropContext >
    )
}


export const useDragEnd = () => {
    const { data: kanbans } = useKanbans(useKanbanSearchParams());
    const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
    const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
    const { data: allTasks = [] } = useTasks(useTasksSearchParams());
    return useCallback(
        ({ source, destination, type }: DropResult) => {
            if (!destination) {
                return;
            }
            // 看板排序
            if (type === "COLUMN") {
                const fromId = kanbans?.[source.index].id;
                const toId = kanbans?.[destination.index].id;
                if (!fromId || !toId || fromId === toId) {
                    return;
                }
                const type = destination.index > source.index ? "after" : "before";
                reorderKanban({ fromId, referenceId: toId, type });
            }
            if (type === "ROW") {
                const fromKanbanId = +source.droppableId;
                const toKanbanId = +destination.droppableId;
                if (fromKanbanId === toKanbanId) {
                    return;
                }
                const fromTask = allTasks.filter(
                    (task) => task.kanbanId === fromKanbanId
                )[source.index];
                const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
                    destination.index
                ];
                if (fromTask?.id === toTask?.id) {
                    return;
                }
                reorderTask({
                    fromId: fromTask?.id,
                    referenceId: toTask?.id,
                    fromKanbanId,
                    toKanbanId,
                    type:
                        fromKanbanId === toKanbanId && destination.index > source.index
                            ? "after"
                            : "before",
                });
            }
        },
        [kanbans, reorderKanban, allTasks, reorderTask]
    );
};


export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

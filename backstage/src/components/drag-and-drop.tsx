/**
 *  在react-beautiful-dnd组件的drop组件基础上 自己封装一个drop组件
 *
 */
import { type } from 'os';
import React, { PropsWithChildren, ReactNode } from 'react'
import { Draggable, Droppable, DroppableProps, DroppableProvided, DroppableProvidedProps, DraggableProps } from 'react-beautiful-dnd';

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }
//childrendrop的子元素
export const Drop = ({ children, ...props }: DropProps) => {
    return (
        <Droppable {...props}>
            {
                (provided => {
                    if (React.isValidElement(children)) {//克隆children
                        return React.cloneElement(children, {//给克隆的子元素children强制加上props
                            ...provided.droppableProps,
                            ref: provided.innerRef,
                            provided
                        })
                    }
                    return <div />
                })
            }
        </Droppable>
    )
}

type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> & React.HtmlHTMLAttributes<HTMLDivElement>
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
    ({ children, ...props }, ref) => (
      <div ref={ref} {...props}>
        {children}
        {props.provided?.placeholder}
      </div>
    )
  );

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }
export const Drag = ({ children, ...props }: DragProps) => {
    return <Draggable {...props}>
        {
            (provided => {
                if (React.isValidElement(children)) {
                    return React.cloneElement(children, {
                        ...provided.draggableProps,
                        ...provided.dragHandleProps,
                        ref: provided.innerRef
                    })
                }
                return <div />
            })
        }
    </Draggable>
}
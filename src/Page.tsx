/// <reference path="renderer.d.ts" />
import {memo, useState, useCallback, useEffect, useRef} from 'react';


type TodoCommentType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoComment = (props: TodoCommentType) => {
    console.log("=== TodoComment rendered ===");
    const {value, onChange} = props;
    return (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}
type DeleteButtonType = {
    onClick: () => void;
}

export const DeleteButton = (props: DeleteButtonType) => {
    console.log("=== DeleteButton rendered ===");
    const {onClick} = props;
    return (
        <button onClick={onClick}>
            削除
        </button>
    )
}
type DoneButtonType = {
    completed: boolean;
    onClick: () => void;
}

export const DoneButton = (props: DoneButtonType) => {
    console.log("=== DoneButton rendered ===");
    const {completed, onClick} = props;
    return (
        <button onClick={onClick}>
            {completed ? '完了済' : '完了'}
        </button>
    )
}

type TodoInputType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoInput = (props: TodoInputType) => {
    console.log("=== TodoInput rendered ===");
    const {value, onChange} = props;
    return (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}
export type TimesType = Array<{start: string, end: string}>

type EstimatedMinutesType = {
    times: TimesType;
}

export const EstimatedMinutes = (props: EstimatedMinutesType) => {
    console.log("=== EstimatedMinutes rendered ===");
    const {times} = props;
    return (
        <label>{JSON.stringify(times)}</label>
    )
}
type TodoEstimateType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoEstimate = (props: TodoEstimateType) => {
    console.log("=== TodoEstimate rendered ===");
    const {value, onChange} = props;
    return (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

type TodoTaskcodeType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoTaskcode = (props: TodoTaskcodeType) => {
    console.log("=== TodoTaskcode rendered ===");
    const {value, onChange} = props;
    return (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}
type TodoOrderType = {
    value: string;
    onChange: (newText: string) => void;
}

export const TodoOrder = (props: TodoOrderType) => {
    console.log("=== TodoOrder rendered ===");
    const {value, onChange} = props;
    return (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

export type TodoType = {
    id: number,
    tags: {Date: string, Order: string},
    text: string,
    taskcode: string,
    estimate: string,
    times: TimesType,
    completed: boolean,
    comment: string
};

type TodoRecordType = {
    key: number;
    todo: TodoType;
    onOrderChanged: (id: number, newText: string) => void;
    onTextChange: (id: number, newText: string) => void;
    onTaskcodeChanged: (id: number, newText: string) => void;
    onEstimatedMinutesChanged: (id: number, newText: string) => void;
    onDoneButtonClicked: (id: number) => void;
    onCommentChanged: (id: number, newText: string) => void;
    onDeleteButtonClicked: (id: number) => void;
}

export const TodoRecord = memo((props: TodoRecordType) => {
    console.log("=== TodoRecord rendered ===");
    const {todo,
        onOrderChanged,
        onTextChange,
        onTaskcodeChanged,
        onEstimatedMinutesChanged,
        onDoneButtonClicked,
        onCommentChanged,
        onDeleteButtonClicked
    } = props;
    return (
        <div>
            <TodoOrder value={todo.tags.Order} onChange={(newText) => onOrderChanged(todo.id, newText)} />
            <TodoInput value={todo.text} onChange={(newText) => onTextChange(todo.id, newText)} />
            <TodoTaskcode value={todo.taskcode} onChange={(newText) => onTaskcodeChanged(todo.id, newText)} />
            <TodoEstimate value={todo.estimate} onChange={(newText) => onEstimatedMinutesChanged(todo.id, newText)} />
            <EstimatedMinutes times={todo.times} />
            <DoneButton completed={todo.completed} onClick={() => onDoneButtonClicked(todo.id)} />
            <TodoComment value={todo.comment} onChange={(newText) => onCommentChanged(todo.id, newText)} />
            <DeleteButton onClick={() => onDeleteButtonClicked(todo.id)} />
        </div>
    )
});



type TodoListType = {
    todos: Array<TodoType>;
    onOrderChanged: (id: number, newText: string) => void;
    onTextChange: (id: number, newText: string) => void;
    onTaskcodeChanged: (id: number, newText: string) => void;
    onEstimatedMinutesChanged: (id: number, newText: string) => void;
    onDoneButtonClicked: (id: number) => void;
    onCommentChanged: (id: number, newText: string) => void;
    onDeleteButtonClicked: (id: number) => void;
}

export const TodoList = (props: TodoListType) => {
    console.log("=== TodoList rendered ===");
    const {todos,
        onOrderChanged,
        onTextChange,
        onTaskcodeChanged,
        onEstimatedMinutesChanged,
        onDoneButtonClicked,
        onCommentChanged,
        onDeleteButtonClicked} = props;
    return (
        <div>
            {todos.map(todo => (
                <TodoRecord
                    key={todo.id}
                    todo={todo}
                    onOrderChanged={onOrderChanged}
                    onTextChange={onTextChange}
                    onTaskcodeChanged={onTaskcodeChanged}
                    onEstimatedMinutesChanged={onEstimatedMinutesChanged}
                    onDoneButtonClicked={onDoneButtonClicked}
                    onCommentChanged={onCommentChanged}
                    onDeleteButtonClicked={onDeleteButtonClicked}
                />
            ))}
        </div>
    )
}


export const Page = () => {
    console.log("=== Page rendered ===");
    const [todos, setTodos] = useState([]);
    const isInitialRender = useRef(true);

    useEffect(() => {
        readFile();
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else {
            writeFile();
        }
    }, [todos]);

    const readFile = async () => {
        try {
            const content = await window.electronAPI.readFile('/tmp/sample.json');
            const j = JSON.parse(content);
            console.log(j);
            setTodos(j);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    const writeFile = async () => {
        try {
            const content = JSON.stringify(todos, null, 4);
            await window.electronAPI.writeFile('/tmp/sample.json', content);
        } catch (error) {
            console.error(error);
            alert('Failed to save');
        }
    };

    const onOrderChanged = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, tags: {Date: todo.tags.Date, Order: newText}} : todo
        ));
    }, []);

    const onTextChange = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, text: newText} : todo
        ));
    }, []);

    const onTaskcodeChanged = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, taskcode: newText} : todo
        ));
    }, []);

    const onEstimatedMinutesChanged = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, estimate: newText} : todo
        ));
    }, []);

    const onDoneButtonClicked = useCallback((id: number) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        ));
    }, []);

    const onCommentChanged = useCallback((id: number, newText: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? {...todo, comment: newText} : todo
        ));
    }, []);

    const onDeleteButtonClicked = useCallback((id: number) => {
        console.log("=== delete button pushed ===");
        setTodos(prevTodos => prevTodos.filter(todo =>
            todo.id !== id
        ));
    }, []);

    return (
        <div>
            <h1>My Todo List</h1>
            <TodoList todos={todos}
                onOrderChanged={onOrderChanged}
                onTextChange={onTextChange}
                onTaskcodeChanged={onTaskcodeChanged}
                onEstimatedMinutesChanged={onEstimatedMinutesChanged}
                onDoneButtonClicked={onDoneButtonClicked}
                onCommentChanged={onCommentChanged}
                onDeleteButtonClicked={onDeleteButtonClicked}
            />
        </div>
    );
}

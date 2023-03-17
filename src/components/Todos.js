import { createAction,handleActions } from "redux-actions";
import {produce} from 'immer'


const CHANGE_INPUT = 'todos/CHANGE_INPUT'
const INSERT = 'todos/INSERT'
const TOGGLE = 'todos/TOGGLE'
const REMOVE = 'todos/REMOVE'

export const changeInput = createAction(CHANGE_INPUT, input => input)


let id = 3;
export const insert = createAction(INSERT, text => ({
    id : id++,
    text,
    done : false,
}))

export const toggle = createAction(TOGGLE, id => id)
export const remove = createAction(REMOVE, id => id)


const TodoItem = ({todo,onToggle,onRemove}) => {
    return (
        <div>
            <input type='checkbox'  
                onClick={() => onToggle(todo.id)}
                checked={todo.done} readOnly={true}/>
            <span style={{textDecoration:todo.done? 'line-through':'none'}}> {todo.text} </span>
            <button onClick={()=> onRemove(todo.id)}>삭제</button>
        </div>
    )
}

const Todos = handleActions(
    {
        [CHANGE_INPUT] : (state,{payload:input}) => 
            produce(state,draft => {
                draft.input = input;
            }), 
        [INSERT] : (state, {payload:todo}) => 
            produce(state,draft => {
                draft.todos.push(todo)
            }),
        [TOGGLE] : (state,{payload : id}) => 
            produce(state,draft => {
                const todo = draft.todos.find(todo => todo.id === id);
                todo.done = !todo.done;
            }),
        [REMOVE] : (state,{payload : id}) => 
            produce(state,draft => {
                const index = draft.todos.findIndex(todo => todo.id === id)
                draft.todos.splice(index, 1)
            })
    } ,       
    
    initialState
);

// const Todos = ({ 
//     input,todos,onChangeInput,onInsert,onToggle,onRemove,
// }) => {
//     const onSubmit = e => {
//         e.preventDefualt();
//         onInsert(input);
//         onChangeInput('')
//     };
//     const onChange = e => onChangeInput(e.target.value);

//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input value={input} onChange={onChange} />
//                 <button type ="submit">등록</button>
//             </form>  
//             <div>
//                 {todos.map(todo => {
//                     <TodoItem todo={todo} key={todo.id}
//                     onToggle={onToggle} onRemove={onRemove} />
//                 })}
//             </div>    
//         </div>
//     );
// };

export default Todos;
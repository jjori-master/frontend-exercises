import './TodoItem.css';

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onCheckBoxChange = () => {
    onUpdate(id);
  };

  return (
    <div className="TodoItem">
      <input type="checkbox" checked={isDone} onChange={onCheckBoxChange} />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button type="button" onClick={() => onDelete(id)}>
        삭제
      </button>
    </div>
  );
};

export default TodoItem;

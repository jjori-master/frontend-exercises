import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useDiary from '../hooks/useDirary';

import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';

import { DiaryDispatchContext, DiaryStateContext } from '../App';

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    const isConfirm = window.confirm(
      '일기를 정말 삭제할 까요? 다시 복구되지 않아요!'
    );
    if (!isConfirm) return;

    onDelete(params.id);

    // 페이지를 이동 시키면서 뒤로가기 방지 : replace
    nav('/', { replace: true });
  };

  const onSubmit = ({ input }) => {
    const isConfirm = window.confirm('일기를 정말 수정할까요?');
    if (!isConfirm) return;

    onUpdate(
      input.id,
      input.createdDate.getTime(),
      input.emotionId,
      input.content
    );
    nav('/', { replace: true });
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={<Button text={'< 뒤로가기'} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={'삭제하기'} type={'NEGATIVE'} onClick={onClickDelete} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;

import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { emotionList } from '../util/constants';
import { getStringedDate } from '../util/get-stringed-date';

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });

  const nav = useNavigate();

  const onChangeInput = e => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit({ input });
  };

  useEffect(() => {
    if (!initData) return;
    setInput({
      ...initData,
      createdDate: new Date(Number(initData.createdDate)),
    });
  }, [initData]);

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          type="date"
          value={getStringedDate(input.createdDate)}
          onChange={onChangeInput}
          name="createdDate"
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map(item => (
            <EmotionItem
              {...item}
              key={item.emotionId}
              isSelected={item.emotionId === input.emotionId}
              onClick={() =>
                onChangeInput({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                })
              }
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          placeholder="오늘은 어땠나요?"
          value={input.content}
          onChange={onChangeInput}
        ></textarea>
      </section>
      <section className="button_section">
        <Button text={'취소하기'} onClick={() => nav(-1)} />
        <Button
          text={'작성완료'}
          type={'POSITIVE'}
          onClick={onClickSubmitButton}
        />
      </section>
    </div>
  );
};

export default Editor;

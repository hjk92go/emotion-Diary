//감정표현하기위해 존재하는 컴포넌트
const EmotionItem = ({ emotion_id, emotion_img, emotion_descript, onClick }) => {
  return (
    <div className="EmotionItem" onClick={() => onClick(emotion_id)}>
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;

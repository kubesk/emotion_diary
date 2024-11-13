import {getEmotionImage} from '../util/get-emotion-image';
import Button from './Button';
import './DiaryItem.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';


const DiaryItem = ({id, emotionId, createdDate, content}) => {
    const nav = useNavigate();

    const {onDelete} = useContext(DiaryDispatchContext);


    return (
        <div className="DiaryItem">
            <div 
                className={`img_section img_section_${emotionId}`}
                onClick={()=>nav(`/diary/${id}`)}
            >
                <img src={getEmotionImage(emotionId)} />
            </div>
            <div 
                className="info_section"
                onClick={()=>nav(`/diary/${id}`)}
            >
                <div className='created_date'>
                    {new Date(createdDate).toLocaleDateString()}
                </div>
                <div className='content'>
                    {content}
                </div>
            </div>
            <div className="button_section">
                <Button 
                    text={"수정하기"} 
                    onClick={()=>nav(`/edit/${id}`)}
                />
                <Button 
                    text={"X"} 
                    onClick={()=>{onDelete(id)}}
                />
            </div>
        </div>
    )
}

export default DiaryItem;

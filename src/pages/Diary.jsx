import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import { useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import {getStringedDate} from '../util/get-stringed-date';
import usePageTitle from "../hooks/usePageTitle";


const Diary = () =>{
    const params = useParams();
    const nav = useNavigate();
    const diaryItem = useDiary(params.id);
    
    usePageTitle(`${params.id}번 일기`);
    
    if(!diaryItem ){
        return <div> 데이터 로딩중...!</div>;
    }

    const { createdDate, emotionId, content} = diaryItem;
    const title = getStringedDate(new Date(createdDate));

    return (
        <>
            <Header title={`${title} 기록`}
                leftChild={<Button 
                            onClick={()=>nav(-1)}
                            text={"< 뒤로 가기"} />}
                rightChild={<Button 
                            onClick={()=>nav(`/edit/${params.id}`)}
                            text={"수정하기"} />}
            />
            <Viewer emotionId={emotionId} content={content}/>
        
        </>


    )
}

export default Diary;
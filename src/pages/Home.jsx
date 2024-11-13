import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import {useState, useContext} from 'react';
import { DiaryStateContext } from '../App';
import usePageTitle from '../hooks/usePageTitle';

const getMonthlyData = (pivotDate, data) =>{
    console.log("data: ",data);

    const beginTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth(),
        1,
        0,
        0,
        0
    ).getTime();

    const endTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth()+1,
        0,
        23,
        59,
        59
    ).getTime();

    return data.filter((item) => item.createdDate >= beginTime && item.createdDate < endTime)

}


const Home = () =>{

    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());

    usePageTitle("감정 일기장");

    const onIncreseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()+1));
    };

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()-1));
    };

    const monthlyData = getMonthlyData(pivotDate, data);
    console.log(monthlyData);

    return (
        <div>
            <Header 
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`} 
                leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
                rightChild={<Button onClick={onIncreseMonth} text={">"} />}
            />
            <DiaryList data={monthlyData}/>
        </div>
    );
}

export default Home;
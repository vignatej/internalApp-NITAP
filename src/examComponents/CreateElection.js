import { useRef } from "react";

const CreateElection = ()=>{
    const name_ref = useRef();
    const startDate_ref = useRef();
    const endDate_ref = useRef();

    const elecBtnHandler = (event)=>{
        event.preventDefault();
        const form = new FormData();
        form.append("admin_id", localStorage.getItem("admin_id"));
        form.append("name", name_ref.current.value);
        form.append("start_time", startDate_ref.current.value);
        form.append("endDate", endDate_ref.current.value);

    }


    return <>
        <p>name of election</p>
        <input  ></input>
        <p>start time</p>
        <input type="datetime" ></input>
        <p>endtime</p>
        <input type="datetime" ></input>
        <button>submit</button>
    </>;
};export default CreateElection;
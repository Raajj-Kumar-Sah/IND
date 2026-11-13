import {useEffect,useState} from "react";
import {CalendarDays,Video} from "lucide-react";
import SectionHeading from "../../components/SectionHeading.jsx";
import DataTable from "../../components/DataTable.jsx";
import {recruitmentApi} from "../../services/recruitment.js";
export default function InterviewsManager(){
 const [items,setItems]=useState([]);const [error,setError]=useState("");
 async function load(){try{const r=await recruitmentApi.listInterviews();setItems(r.data||[])}catch(e){setError(e.message)}}
 useEffect(()=>{load()},[]);
 async function change(id,status){try{await recruitmentApi.updateInterviewStatus(id,status);await load()}catch(e){setError(e.message)}}
 const rows=items.map(i=>({candidate:i.candidateName,email:i.candidateEmail,when:new Date(i.startsAt).toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"}),mode:i.mode.replace("_"," "),interviewer:i.interviewerName,notification:i.notificationStatus,status:<select className="field" value={i.status} onChange={e=>change(i._id,e.target.value)}><option>SCHEDULED</option><option>COMPLETED</option><option>CANCELLED</option><option>RESCHEDULED</option></select>,meeting:i.meetingUrl?<a href={i.meetingUrl} target="_blank" rel="noreferrer" className="text-gold">Open link</a>:i.location}));
 return <><SectionHeading eyebrow="TALENT CALENDAR" title="Interviews" description="View scheduled candidate interviews, meeting links and notification status."/><div className="mt-4 flex items-center gap-2 text-xs text-[#999]"><CalendarDays size={15}/> {items.length} scheduled interview records</div>{error&&<p className="mt-3 text-sm text-red-300">{error}</p>}<div className="mt-6"><DataTable columns={[{key:"candidate",label:"Candidate"},{key:"email",label:"Email"},{key:"when",label:"Date & time"},{key:"mode",label:"Mode"},{key:"interviewer",label:"Interviewer"},{key:"meeting",label:"Meeting"},{key:"notification",label:"Email"},{key:"status",label:"Status"}]} rows={rows}/></div></>;
}

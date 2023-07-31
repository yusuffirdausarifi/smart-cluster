import "../style/detail.css"
import alarmActive from "../asset/active.png";
import alarmInactive from "../asset/inactive.png";

export const DetailListAlarm = ({handleDetail, datapb, datafa, dataint, datapir, id}) =>{
    return(
        <div className="detailListAlarm">
            <div className="boxListDetail">
                <button onClick={handleDetail}>Exit</button>
                <div className="listAlarm">
                    <div className="alarm1">
                        <h2>Panic Button</h2>
                        <img src={datapb[id-1]===1? alarmActive:alarmInactive} alt="" />
                    </div>
                    <div className="alarm2">
                        <h2>Fire Alarm</h2>
                        <img src={datafa[id-1]===1? alarmActive:alarmInactive} alt="" />
                    </div>
                    <div className="alarm3">
                        <h2>Intruder Alarm</h2>
                        <img src={dataint[id-1]===1? alarmActive:alarmInactive} alt="" />
                    </div>
                    <div className="alarm3">
                        <h2>PIR Sensor</h2>
                        <img src={datapir[id-1]===1? alarmActive:alarmInactive} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
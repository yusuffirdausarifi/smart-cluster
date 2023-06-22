import "../style/device.css"
import active from "../asset/active.png"
import inactive from "../asset/inactive.png"
import { useState } from "react"
import { DetailAlarm, DetailListAlarm } from "./detailAlarm"

export const ListDevice = () =>{

    const[status, setStatus] = useState(true);
    const[detail, setDetail] = useState(false);

    const handleDetail = () =>{
        setDetail(current=>!current);
    }

    const acknowledgeStatus = () =>{
        setStatus(current=>!current);
    }

    const nothing = () =>{
        setStatus(false);
    }

    return(
        <div className="listDevice">
            <div className="topDevice">
                <div className="boxDevice">
                    <div className="nameDevice">
                        <h3>Home X001</h3>
                    </div>
                    <div className="notifAck">
                        <img src={status===false? inactive : active} alt="" />

                        <div className="buttonList">
                            <button className={status===false? "ackno" : "ack"} onClick={status===false? nothing : acknowledgeStatus}>Acknowledge</button>
                            <button className={status===false? "relno" : "rel"} onClick={status===false? nothing : acknowledgeStatus}>Release Ack</button>
                        </div>
                    </div>

                    <div className="detailAlarm">
                        <button onClick={handleDetail}>Detail Alarm</button>
                    </div>
                </div>
                <div className="boxDevice">
                    <div className="nameDevice">
                        <h3>Home X002</h3>
                    </div>
                    <div className="notifAck">
                        <img src={inactive} alt="" />

                        <div className="buttonList">
                            <button className={"ackno"}>Acknowledge</button>
                            <button className={"relno"}>Release Ack</button>
                        </div>
                    </div>

                    <div className="detailAlarm">
                        <button onClick={handleDetail}>Detail Alarm</button>
                    </div>
                </div>
                <div className="boxDevice">
                    <div className="nameDevice">
                        <h3>Home X003</h3>
                    </div>
                    <div className="notifAck">
                        <img src={inactive} alt="" />

                        <div className="buttonList">
                            <button className={"ackno"}>Acknowledge</button>
                            <button className={"relno"}>Release Ack</button>
                        </div>
                    </div>

                    <div className="detailAlarm">
                        <button onClick={handleDetail}>Detail Alarm</button>
                    </div>
                </div>
                <div className="boxDevice">
                    <div className="nameDevice">
                        <h3>Home X004</h3>
                    </div>
                    <div className="notifAck">
                        <img src={inactive} alt="" />

                        <div className="buttonList">
                            <button className={"ackno"}>Acknowledge</button>
                            <button className={"relno"}>Release Ack</button>
                        </div>
                    </div>

                    <div className="detailAlarm">
                        <button onClick={handleDetail}>Detail Alarm</button>
                    </div>
                </div>
            </div>
            <div className="botDevice">
                <div className="boxDevice">
                    <div className="nameDevice">
                        <h3>Home X005</h3>
                    </div>
                    <div className="notifAck">
                        <img src={inactive} alt="" />

                        <div className="buttonList">
                            <button className={"ackno"}>Acknowledge</button>
                            <button className={"relno"}>Release Ack</button>
                        </div>
                    </div>

                    <div className="detailAlarm">
                        <button onClick={handleDetail}>Detail Alarm</button>
                    </div>
                </div>
                <div className="boxDevice">
                    <div className="nameDevice">
                        <h3>Home X006</h3>
                    </div>
                    <div className="notifAck">
                        <img src={inactive} alt="" />

                        <div className="buttonList">
                            <button className={"ackno"}>Acknowledge</button>
                            <button className={"relno"}>Release Ack</button>
                        </div>
                    </div>

                    <div className="detailAlarm">
                        <button onClick={handleDetail}>Detail Alarm</button>
                    </div>
                </div>
                <div className="boxDevice">
                    <div className="nameDevice">
                        <h3>Home X007</h3>
                    </div>
                    <div className="notifAck">
                        <img src={inactive} alt="" />

                        <div className="buttonList">
                            <button className={"ackno"}>Acknowledge</button>
                            <button className={"relno"}>Release Ack</button>
                        </div>
                    </div>

                    <div className="detailAlarm">
                        <button onClick={handleDetail}>Detail Alarm</button>
                    </div>
                </div>
                <div className="boxDevice">
                    <div className="nameDevice">
                        <h3>Home X008</h3>
                    </div>
                    <div className="notifAck">
                        <img src={inactive} alt="" />

                        <div className="buttonList">
                            <button className={"ackno"}>Acknowledge</button>
                            <button className={"relno"}>Release Ack</button>
                        </div>
                    </div>

                    <div className="detailAlarm">
                        <button onClick={handleDetail}>Detail Alarm</button>
                    </div>
                </div>
            </div>

            {detail && <DetailListAlarm handleDetail={handleDetail}></DetailListAlarm> }
        </div>
    )
}
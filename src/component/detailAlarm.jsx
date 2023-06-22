import "../style/detail.css"

export const DetailListAlarm = ({handleDetail}) =>{
    return(
        <div className="detailListAlarm">
            <div className="boxListDetail">
                <button onClick={handleDetail}>X</button>
                <div className="listAlarm">
                    <div className="alarm1">
                        <h2>Panic Button</h2>
                        <div className="circleStatus">

                        </div>
                    </div>
                    <div className="alarm2">
                        <h2>Fire Alarm</h2>
                        <div className="circleStatus">

                        </div>
                    </div>
                    <div className="alarm3">
                        <h2>Intruder Alarm</h2>
                        <div className="circleStatus">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
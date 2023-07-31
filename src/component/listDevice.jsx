import "../style/device.css"
import active from "../asset/active.png"
import inactive from "../asset/inactive.png"
import { useEffect, useState } from "react"
import { DetailListAlarm } from "./detailAlarm"
import mqtt from 'mqtt';
import { HistoryData } from "./historyData"

export const ListDevice = () =>{

    const[status, setStatus] = useState([0,0,0,0,0,0,0,0]);
    const[activeStatus, setActive] = useState([0,0,0,0,0,0,0,0]);

    const[ackButton, setAck] = useState([0,0,0,0,0,0,0,0]);
    const[releaseButton, setRls] = useState([0,0,0,0,0,0,0,0]);
    
    const[pb, setPb] = useState([0,0,0,0,0,0,0,0]);
    const[fa, setFa] = useState([0,0,0,0,0,0,0,0]);
    const[int, setInt] = useState([0,0,0,0,0,0,0,0]);
    const[pir, setPir] = useState([0,0,0,0,0,0,0,0]);

    const[history, setHistory] = useState([]);
    const[detail, setDetail] = useState(false);
    const [client, setClient] = useState(false);
    const [idClient, setIdClient] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
          setActive(prevStatus => {
            const newStatus = prevStatus.map(value => {
              if (value > 0) {
                return value - 1;
              }
              return value;
            });
            return newStatus;
          });
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    const handleDetail = (x) =>{
        setDetail(current=>!current);
        setIdClient(x);
    }

    const saveHistory = (x, y) =>{
        
            const timestamp = new Date().getTime();
            const localTime = new Date(timestamp).toLocaleString();
            const devId = x.match(/H(\d+)/);
            const num = parseInt(devId[1]);

            const devName = `Home X00${num}`;

            const newData = [localTime, devName, y];

            setHistory((prevHistory) => [...prevHistory, newData]);   
        
    }

    const changeStatus = (x,y) =>{
        const str = x;
        const numbersAfterH = str.match(/H(\d+)/);
        
        const extractedNumber = parseInt(numbersAfterH[1]);


        if(y === "PB/On" || y === "FA/On" || y === "Int/On" || y === "PIR/On"){

            publishAlarmHub();

              setStatus(prevStatus => {
                const newStatus = [...prevStatus];
                newStatus[extractedNumber - 1] = 1;
                return newStatus;
              });
              
              setAck(prevStatus => {
                const newStatus = [...prevStatus];
                newStatus[extractedNumber - 1] = 1;
                return newStatus;
              });

              setRls(prevStatus => {
                const newStatus = [...prevStatus];
                newStatus[extractedNumber - 1] = 1;
                return newStatus;
              });

            if(y === "PB/On"){
                setPb(prevStatus => {
                    const newStatus = [...prevStatus];
                    newStatus[extractedNumber - 1] = 1;
                    return newStatus;
                  });

            }

            else if(y === "FA/On"){
                setFa(prevStatus => {
                    const newStatus = [...prevStatus];
                    newStatus[extractedNumber - 1] = 1;
                    return newStatus;
                  });
            }

            else if(y === "Int/On"){
                setInt(prevStatus => {
                    const newStatus = [...prevStatus];
                    newStatus[extractedNumber - 1] = 1;
                    return newStatus;
                  });
            }

            else if(y === "PIR/On"){
                setPir(prevStatus => {
                    const newStatus = [...prevStatus];
                    newStatus[extractedNumber - 1] = 1;
                    return newStatus;
                  });
            }

        }

        else if(y === "PB/Off" || y === "FA/Off" || y === "Int/Off" || y === "PIR/Off"){

            if(y === "PB/Off"){
                setPb(prevStatus => {
                    const newStatus = [...prevStatus];
                    newStatus[extractedNumber - 1] = 0;
                    return newStatus;
                  });
            }

            else if(y === "FA/Off"){
                setFa(prevStatus => {
                    const newStatus = [...prevStatus];
                    newStatus[extractedNumber - 1] = 0;
                    return newStatus;
                  });
            }

            else if(y === "Int/Off"){
                setInt(prevStatus => {
                    const newStatus = [...prevStatus];
                    newStatus[extractedNumber - 1] = 0;
                    return newStatus;
                  });
            }

            else if(y === "PIR/Off"){
                setPir(prevStatus => {
                    const newStatus = [...prevStatus];
                    newStatus[extractedNumber - 1] = 0;
                    return newStatus;
                  });
            }
        }

        else if(y === "Life"){
            setActive(prevStatus => {
                const newStatus = [...prevStatus];
                newStatus[extractedNumber - 1] = 20;
                return newStatus;
              });
        }
    }

    const publishMessage = (topic, message) => {
        if (client && client.connected) {
        client.publish(topic, message, (err) => {
            if (err) {
            console.log('Error while publishing:', err);
            } else {
            console.log('Message published successfully.');
            }
        });
        } else {
        console.log('MQTT client is not connected.');
        }
    };

    const publishAlarmHub = () => {
        if (client && client.connected) {
        const topic = "Xcamp/SmartCluster/Hub";
        const message = "AlarmHub/Active";
        client.publish(topic, message, (err) => {
            if (err) {
            console.log('Error while publishing:', err);
            } else {
            console.log('Message published successfully.');
            }
        });
        } else {
        console.log('MQTT client is not connected.');
        }
    };

    

    const mqttConnect = () => {
		setClient(
			mqtt.connect(`wss://broker.emqx.io:8084/mqtt`, {
				clientId: 'smart-cluster' + Math.random().toString(16).substr(2, 8),
				keepalive: 60,
				clean: true,
				connectTimeout: 30 * 1000,
				protocolId: 'MQTT',
				protocolVersion: 4,
				username: 'emqx',
				password: 'public',
			})
		)
	} 
    
    useEffect(() => {
		mqttConnect()
	}, [])

    useEffect(() => {
		if (client) {
			client.on('connect', () => {
				console.log('Connected to MQTT broker')
				// SUBSCRIBE to topics
				for (let i = 1; i <= 8; i++) {
                    const topic = `Xcamp/SmartCluster/H${i}`;
                    client.subscribe(topic, err => {
                      if (err) console.log(err);
                    });
                  }
			})
			client.on('reconnect', () => {
				console.log('Reconnecting to MQTT broker')
			})
			client.on('offline', () => {
				console.log('MQTT client is offline')
			})
			client.on('error', err => {
				console.log('MQTT client error', err)
			})

            client.on('message', (topic, message) => {
				changeStatus(topic.toString(), message.toString());
                saveHistory(topic.toString(), message.toString());
			})
		}
	}, [client])

    useEffect(()=>{
        for (let i = 0; i < 8; i++) {
            if(pb[i] === 0 && fa[i] === 0 && int[i] === 0 && pir[i] === 0){
                setStatus(prevStatus => {
                    const newStatus = [...prevStatus];
                    newStatus[i] = 0;
                    return newStatus;
                  });
            }    
        }
    },[pb, fa, int, pir])

    useEffect(()=>{
        if(history.length >=100){
            setHistory([])
        }
    },[history])

    const acknowledgeStatus = (x) =>{
        const topic = `Xcamp/SmartCluster/H${x}`;
        publishMessage(topic, 'Ack/On');
        
        setAck(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[x-1] = 0;
            return newStatus;
          });
    }

    const acknowledgeRelease = (x) =>{
        const topic = `Xcamp/SmartCluster/H${x}`;
        publishMessage(topic, 'Ack/Off');

        setRls(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[x-1] = 0;
            return newStatus;
          });
    }

    return(
        <div className="listDevice">

            <div className="titleList">
                <h1>Cluster Device List & Data History</h1>
            </div>

            <div className="topDevice">
            {status.slice(0,4).map((s, index) => (
                <div className="boxDevice" key={index}>
                    <div className="nameDevice">
                        <h3>Home X00{index + 1}</h3>

                        <div className={activeStatus[index] !== 0? "statusBarActive" : "statusBarInactive"}>

                        </div>
                    </div>

                    <div className="notifAck">
                    <img src={s === 1 ? active : inactive} alt="" />
                        <div className="buttonList">
                            <button className={ackButton[index] === 1 ? "ack" : "ackno"} disabled={ackButton[index] === 1 ? false : true} onClick={() => acknowledgeStatus(String(index + 1))}>Acknowledge</button>
                            <button className={releaseButton[index] === 1 ? "rel" : "relno"} disabled={releaseButton[index] === 1 ? false : true} onClick={() => acknowledgeRelease(String(index + 1))}>Release Ack</button>
                        </div>
                    </div>

                    <div className="detailAlarm">
                        <button onClick={() => handleDetail(index + 1)}>Show Alarm Info</button>
                    </div>
                </div>
            ))}
            </div>
            <div className="botDevice">
            {status.slice(4,8).map((s, index) => (
                <div className="boxDevice" key={index}>
                    <div className="nameDevice">
                        <h3>Home X00{index + 5}</h3>

                        <div className={activeStatus[index+4] !== 0? "statusBarActive" : "statusBarInactive"}>

                        </div>
                    </div>

                    <div className="notifAck">
                    <img src={s === 1 ? active : inactive} alt="" />
                        <div className="buttonList">
                            <button className={s === 1 ? "ack" : "ackno"} disabled={s === 1 ? false : true} onClick={() => acknowledgeStatus(String(index + 5))}>Acknowledge</button>
                            <button className={s === 1 ? "rel" : "relno"} disabled={s === 1 ? false : true} onClick={() => acknowledgeRelease(String(index + 5))}>Release Ack</button>
                        </div>
                    </div>
                    
                    <div className="detailAlarm">
                        <button onClick={() => handleDetail(index + 5)}>Show Alarm Info</button>
                    </div>
                </div>
            ))}
            </div>

            <div className="deviceHistory">
                <HistoryData data={history}></HistoryData>
            </div>

            {detail && <DetailListAlarm handleDetail={handleDetail} datapb={pb} datafa={fa} dataint={int} datapir={pir} id={idClient}></DetailListAlarm> }
        </div>
    )
}
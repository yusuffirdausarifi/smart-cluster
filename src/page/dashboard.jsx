import "../style/dashboard.css";
import logo from "../asset/xcamp.png"
import { ListDevice } from "../component/listDevice";
import hub from "../asset/hub.png"
import spoke from "../asset/spoke.png"
import fitur from "../asset/fitur.png"
import { HistoryHub } from "../component/historyHub";
import mqtt from 'mqtt';
import { useEffect, useState, useRef } from "react";

export const Dashboard = () =>{

    const[history, setHistory] = useState([]);
    const[client, setClient] = useState(false);
    const[hubStatus, setHub] = useState(false);
    const[hubPortal, setPortal] = useState(false);
    const[hubAlarm, setAlarm] = useState(false);

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
	}, []);

    useEffect(()=>{
        if(history.length >=100){
            setHistory([])
        }
    },[history])

    const hubTimeoutRef = useRef();

    const resetHub = () => {
        setHub(false);
      };

    const saveHistory = (x, y) =>{

            if(y === "MainGW/Off"){
                setPortal(false);
            }

            else if(y === "MainGW/On"){
                setPortal(true);
            }

            if(y === "AlarmHub/Active"){
                setAlarm(true);
            }

            if(y === "AlmClear"){
                setAlarm(false);
            }

            else if(y === "Life"){
                if (hubTimeoutRef.current) {
                    clearTimeout(hubTimeoutRef.current);
                  }

                setHub(true);
                hubTimeoutRef.current = setTimeout(resetHub, 20000);
            }

            // if(x === "Xcamp/SmartCluster/Hub"){
            //     const timestamp = new Date().getTime();
            //     const localTime = new Date(timestamp).toLocaleString();
            //     const devName = `Hub X001`;
            //     const newData = [localTime, devName, y];

            //     setHistory((prevHistory) => [...prevHistory, newData]);
            // }
        
    }

    useEffect(() => {
		if (client) {
			client.on('connect', () => {
				console.log('Connected to MQTT broker')
				
                const topic = `Xcamp/SmartCluster/Hub`;
                    client.subscribe(topic, err => {
                      if (err) console.log(err);
                });

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
				console.log(message.toString());
                saveHistory(topic.toString(), message.toString());
			})
		}
	}, [client])

    return(
        <div className="dashboard">
            <div className="topNav">
                <div className="imageNav">
                    <img src={logo} alt="" />
                </div>
                <div className="titleNav">
                    <h2>SMART CLUSTER</h2>
                </div>

                <div className="versionNav">
                    <h4>Version 1.0</h4>
                </div>
            </div>
            <div className="mainContent">
                <div className="bottomContent">
                    <div className="hubDevice">
                        <div className="titleProject">
                            <h1>HUB DEVICE</h1>
                        </div>

                        <div className="boxHub">
                            <img src={hub} alt="" />
                            <div className="hubInfo">
                                <h1>Hub X001 Status</h1>

                                <div className="statusHubIndicator">
                                    <div className="statusBoxHub">
                                        <h4>Status</h4>

                                        <div className={hubStatus === true? "indicatorActive" : "indicatorInactive"}>

                                        </div>
                                    </div>

                                    <div className="statusBoxHub">
                                        <h4>Portal</h4>

                                        <div className={hubPortal === true? "indicatorInactiveReverse" : "indicatorActiveReverse"}>
                                            {/* <h5>{hubPortal === true? "Open" : "Close"}</h5> */}
                                        </div>
                                    </div>

                                    <div className="statusBoxHub">
                                        <h4>Alarm</h4>

                                        <div className={hubAlarm === true? "indicatorInactiveReverse" : "indicatorActiveReverse"}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <ListDevice></ListDevice>
                </div>
                <div className="topContent">
                    <div className="titleProject">
                        <h1>ABOUT SMART CLUSTER</h1>
                    </div>

                    <div className="projectDefinition">
                        <div className="projectImage">
                            <img src={hub} className="deviceImage" alt="" />
                            <img src={spoke} className="deviceImage" alt="" />
                            <img src={fitur} className="featureList" alt="" />
                        </div>
                        <div className="projectText">
                            <p> Discover Smart Cluster, the revolutionary IoT solution for ultimate home security. 
                                With seamless integration of cutting-edge technology, it offers 
                                unparalleled peace of mind, allowing you to enjoy worry-free days 
                                outside your abode. Embrace the enchanting allure of tomorrow's 
                                safeguarding technology today and revel in the comfort of a protected 
                                home wherever life leads you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
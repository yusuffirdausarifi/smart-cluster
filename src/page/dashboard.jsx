import "../style/dashboard.css";
import logo from "../asset/xcamp.png"
import tech from "../asset/technology.png"
import alarm from "../asset/alarm.png"
import fitur from "../asset/fitur.png"
import { ListDevice } from "../component/listDevice";
import { useState } from "react";

export const Dashboard = () =>{

    console.log(window.location.hostname);
    

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
                <div className="topContent">
                    <div className="boxTotal">
                        <div className="titleBox">
                            <div className="smallBox">

                            </div>
                            <h3>TOTAL REGISTERED DEVICE</h3>
                        </div>
                        <div className="contentTotal">
                            <img src={tech} alt="" />
                            <div className="teksTotal">
                                <h2>8 Devices</h2>
                                <p>There are total 8 Device Registered on System</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className="boxAlarm">
                        <div className="titleBox">
                            <div className="smallBoxAlarm">

                            </div>
                            <h3>SMART CLUSTER EXPLANATION</h3>
                        </div>
                        <div className="contentAlarm">
                            <img src={alarm} alt="" />
                            <p>
                                Smart Cluster adalah sebuah solusi teknologi inovatif berbasis IoT yang 
                                terintegrasi, untuk mendukung keamanan beraktivitas ditempat anda.
                                <br />
                                <br />
                                Dengan berbagai fitur dan manfaat dari Smart Cluster, anda dapat merasakan rasa aman dan nyaman
                                terhadap tempat tinggal anda ketika beraktifitas diluar rumah. 
                            </p>
                            <div className="featureList">
                                <img src={fitur} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottomContent">
                    <ListDevice></ListDevice>
                </div>
            </div>
        </div>
    )
}
import "../style/dashboard.css";
import logo from "../asset/xcamp.png"
import { ListDevice } from "../component/listDevice";
import hub from "../asset/hub.png"
import spoke from "../asset/spoke.png"
import fitur from "../asset/fitur.png"

export const Dashboard = () =>{

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
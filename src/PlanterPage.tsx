import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, { Component, useState } from "react";
import { PlanterDetails } from "./Interfaces";
import ForestIcon from '@mui/icons-material/Forest';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CalculateIcon from '@mui/icons-material/Calculate';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { AgChartsReact } from 'ag-charts-react';
import { AgChart, AgChartOptions } from 'ag-charts-community';
const ChartExample = () => {
  const [options, setOptions] = useState<AgChartOptions>({
    title: {
      text: 'Planting Streak of 2023',
    },
    data: [
    {
      age: 1,
      Month: 182.9,
      winnings: 160.22,
    },
    {
      age: 2,
      Month: 338.7,
      winnings: 198.3,
    },
    {
      age: 1,
      Month: 111.4,
      winnings: 288.47,
    },
    {
      age: 1,
      Month: 165.5,
      winnings: 224.69,
    },
    {
      age: 3,
      Month: 46.8,
      winnings: 273.39,
    },
    {
      age: 3,
      Month: 225.4,
      winnings: 259.15,
    },
    {
      age: 3,
      Month: 227.7,
      winnings: 223.65,
    }],
    series: [
      {
        type: 'histogram',
        xKey: 'age',
        xName: 'Month',
      },
    ],
    legend: {
      enabled: false,
    },
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: { text: 'Months of 2023' },
        tick: { interval: 1 },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Number of Trees Planted' },
      },
    ],
  });

  return <AgChartsReact options={options} />;
};
class PlanterPage extends Component<{
  Planter: PlanterDetails;
  Logout: () => void;
}> {
  handleClose = (event: { currentTarget: any }) => {
    this.setState({ open: false });
  };
  a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  getLocationUrl(latlong: string) {
    let latLongs = latlong.split(":");
    return `http://maps.google.com/maps?z=12&t=m&q=loc:${latLongs[0]}+${latLongs[1]}`;
  }
  state = {
    ...this.props,
    open: false,
    tab: 0,
    editProfile: false,
    firstName: this.props.Planter.firstName,
    middleName: this.props.Planter.middleName,
    lastName: this.props.Planter.lastName,
    phoneNumber: this.props.Planter.PhoneNumber,
    plots:this.props.Planter.plots,
    email: this.props.Planter.email,
    NewPlotSize: 0,
    NewPlotCountry: "",
    NewPlotState: "",
    NewPlotDistrict: "",
    NewPlotLoc: "",
    acceptTerms: false,
    electricity:0,
    travelKM:0,
    vehicle:"Car"
  };
  resetNewPlot() {
    this.setState({
      NewPlotSize: 0,
      NewPlotCountry: "",
      NewPlotState: "",
      NewPlotDistrict: "",
      NewPlotLoc: "",
      acceptTerms: false,
    });
  }
  DisableNewPlotCreation() {
    if (
      this.state.NewPlotCountry &&
      this.state.NewPlotState &&
      this.state.NewPlotDistrict &&
      this.state.NewPlotLoc &&
      this.state.acceptTerms &&
      this.state.NewPlotSize >= 40
    ) {
      return false;
    } else return true;
  }
  render() {
    return (
      <div className="Planter">
         <div style={{backgroundColor:"#e6fcf5",height:"100px",width:"100%"}}></div>
        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              right: 10,
              top: 10,
              position: "absolute",
            }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={() => this.setState({ open: !this.state.open })}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={this.state.open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={this.state.open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {this.state?.firstName?.slice(0, 1)?.toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            id="account-menu"
            open={this.state.open}
            onClose={this.handleClose}
            onClick={this.handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: "30px",
                  right: "20px",
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            style={{ top: "-70%", right: "80px" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => this.setState({ editProfile: true })}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={this.handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => this.props.Logout()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
        {/* <div
          style={{
            width: "10%",
            backgroundColor: "grey",
            position: "fixed",
            height: "100%",
          }}
        > */}
        {/* <div style={{width:"10%",backgroundColor:"white",verticalAlign:"center",color:"green",position:"fixed",height:"10%",border:"1px solid green"}}>
  <div style={{    textAlign: "center",
    marginTop: "27%"}}>
      <EmojiEventsIcon ></EmojiEventsIcon>
<span>My Impact</span></div>
</div> */}
        <div>
          <Box
            style={{ backgroundColor: "white" }}
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "100%",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={this.state.tab}
              onChange={(event: React.SyntheticEvent, newtab: number) =>
                this.setState({ tab: newtab })
              }
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: "divider" }}
            >
              <Tab
                icon={<EmojiEventsIcon />}
                iconPosition="start"
                label="My Impact"
                {...this.a11yProps(0)}
              />
              <Tab   icon={<ForestIcon />}
                iconPosition="start" label="My Plots" {...this.a11yProps(1)} />
              <Tab icon={<AddLocationAltIcon />}
                iconPosition="start" label="Add new Plot" {...this.a11yProps(2)} />
              <Tab icon={<CurrencyRupeeIcon />}
                iconPosition="start" label="My Credit" {...this.a11yProps(3)} />
              <Tab icon={<MilitaryTechIcon />}
                iconPosition="start" label="Send Returns" {...this.a11yProps(4)}></Tab>
              <Tab
              icon={<CalculateIcon />}
              iconPosition="start"
                label="Carbon Foot Print Calculator"
                {...this.a11yProps(5)}
              />
            </Tabs>
            {this.state.tab == 0 && !this.state.editProfile && (
              <div className="TabData container">
              <div className="my-impact-main-flex">
                <div className="my-impact-histogram">
                  <ChartExample/>
                </div>
                <div className="my-impact-results">
                  <h2 className="heading-secondary" style={{marginBottom:"1.2rem"}}>The Savings</h2>
                  <p className="p-element" style={{marginBottom:"4rem",marginLeft:"1rem",fontSize:"1.6rem"}}>Statistics modelled per your investement</p>
        
                  <div className="my-impact-exact-results">
                    <div>
                      <h3 className="my-impact-exact-results-main-value">7</h3>
                      <p className="my-impact-exact-results-main-text">Trees planted this Year</p>
                    </div>
                    <div>
                      <h3 className="my-impact-exact-results-main-value">34</h3>
                      <p className="my-impact-exact-results-main-text">Total Number of trees Planted</p>
                    </div>
                    <div>
                      <h3 className="my-impact-exact-results-main-value">{34*21} </h3>
                      <p className="my-impact-exact-results-main-text">Kg CO2 will be removed from Atmosphere this year.</p>
                    </div>
                  </div>
              </div>
            </div>
        
                      </div>
            )}
            {this.state.tab == 1 && !this.state.editProfile && (
              <div className="TabData">
                {this.state.plots?.length > 0 && 
                
                this.state.plots.map((e)=>
                <div className="Plotscontainer">
      <div className="cta">
        <div className="cta-img-box" role="img" aria-label="Woman enjoying food"></div>
        <div className="cta-text-box">
          <h2 className="heading-secondary">Know the information of the My plots</h2>
          <div className="cta-plot-info">
            <div className="combination-of-label-and-dropdown" style={{justifyContent: "unset"}}>
              <label className="cta-label">Locate My Plot</label> <label className="locateIcon">
              <MyLocationIcon onClick={()=> window.open(e.PlotAddress)} >Loc</MyLocationIcon>
              </label>
            </div>

            <div className="combination-of-label-and-dropdown">
              <label className="cta-label">Number of Trees planted:{(parseInt(e?.TreeCount?.toString())-parseInt(e?.AvailableTreeCount.toString()))}</label>
              <label className="cta-label"></label>
            </div>

            <div className="combination-of-label-and-dropdown">
              <label className="cta-label">Various trees are {}</label>
              <label className="cta-label"></label>
            </div>

            <div className="combination-of-label-and-dropdown">
              <label className="cta-label">Amount received:{(parseInt(e?.TreeCount?.toString())-parseInt(e?.AvailableTreeCount.toString()))*1500}</label>
              <label className="cta-label"></label>
            </div>
          </div>
        </div>
      </div></div>
                
                
                )}
                {this.state.plots?.length === 0 && 
                
                <div>Please add plots in the add plots tab</div>}
              </div>
            )}
            {this.state.tab == 2 && !this.state.editProfile && (
              <div className="FOrMargin">
             <div className="container">
             <div className="cta-form">

                 <div className="combination-of-label-and-dropdown">
                  <label className="label-add-plot">Enter Country</label>
                  <select
                    className="select-add-plot"
                    name="Country:"
                    value={this.state?.NewPlotCountry}
                    onChange={(e) =>
                      this.setState({ NewPlotCountry: e.target.value })
                    }
                  >
                    <option></option>
                    <option>India</option>
                    <option>US</option>          
                  </select>
                </div>
                <div className="combination-of-label-and-dropdown">
                  <label className="label-add-plot">Enter State</label>
                  <select
                    className="select-add-plot"
                    name="District:"
                    value={this.state?.NewPlotState}
                    onChange={(e) =>
                      this.setState({ NewPlotState: e.target.value })
                    }
                  >
                    <option></option>
                    <option>Andhra Pradesh</option>
                    <option>Telangana</option>
                    <option>Kerala</option>          
                  </select>
                </div>
               
                <div className="combination-of-label-and-dropdown">
                  <label className="label-add-plot">Enter District</label>
                  <select
                  className="select-add-plot"
                    name="areas"
                    value={this.state?.NewPlotDistrict}
                    onChange={(e) =>
                      this.setState({ NewPlotDistrict: e.target.value })
                    }
                  >
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>           
                  </select>
                </div>
                <div className="combination-of-label-and-dropdown">
                  <label className="label-add-plot">Location(Long/Lat)</label>
                  <input
                  className="select-add-plot"
                    type="text"
                    value={this.state?.NewPlotLoc}
                    onChange={(e) =>
                      this.setState({ NewPlotLoc: e.target.value })
                    }
                  />
                </div>
                <div className="combination-of-label-and-dropdown">
                  <label className="label-add-plot">Area (Sq.ft)</label>
                  <input
                  className="select-add-plot"
                    type="number"
                    value={this.state.NewPlotSize}
                    onChange={(e) =>
                      this.setState({ NewPlotSize: e.target.value })
                    }
                  />
                </div>
                <div></div>
                <div className="combination-of-label-and-dropdown">
                  <label className="label-add-plot">Approximatly </label> {" "}
                  <label style={{ color: "red" }} className="label-add-plot">
                    {parseInt((this.state.NewPlotSize / 40 ?? 0).toString())}
                  </label>
                   <label className="label-add-plot"> plants that can be planter here:</label>
                </div>

                <div></div>
               
                <div className="combination-of-label-and-dropdown">
                  <label className="label-add-plot">
                    Avg Cost for planting entire Plot:{" "}
                  </label>
                  <label style={{ color: "red" }}>
                    {parseInt((this.state.NewPlotSize / 40 ?? 0).toString()) *
                      1500}
                  </label>
                </div>

                <div></div>

                <div className="combination-of-label-and-dropdown">
                  <label className="label-add-plot">
                    Avg Monthly Maintance for all the trees in Plot:{" "}
                  </label>
                   {" "}
                  <label style={{ color: "red" }} className="label-add-plot">
                    {parseInt((this.state.NewPlotSize / 40 ?? 0).toString()) *
                      300}
                  </label>
                </div>
                <div></div>
                <div className="combination-of-label-and-dropdown-try agree-box">
                  <Checkbox
                    value={this.state.acceptTerms}
                    onChange={(e) =>
                      this.setState({ acceptTerms: e.target.checked })
                    }
                    style={{ width: "unset" }}
                  />
                  <p className="agree-terms-p-element">
                    I've read and agree with the{" "}
                    <a href="#">terms & conditions!</a>
                  </p>
                </div>

                <div className="combination-of-label-and-dropdown">
                <button type="submit" className="btn btn--form"
                onClick={(e) => {
                  axios
                    .post(
                      "http://in-gps2508a:5001/api/v1/plots/AddPlotInfo",
                      {
                        AvailableTreeCount: parseInt(
                          (this.state.NewPlotSize / 40 ?? 0).toString()
                        ),
                        TreeCount: parseInt(
                          (this.state.NewPlotSize / 40 ?? 0).toString()
                        ),
                        AverageUnitCost: 1500,
                        City: this.state.NewPlotDistrict,
                        Country: this.state.NewPlotCountry,
                        IsPlotVerified: true,
                        PlotArea: this.state.NewPlotSize,
                        MobileNumber: this.state.phoneNumber,
                        State: this.state.NewPlotState,
                        PlotAddress: this.getLocationUrl(
                          this.state.NewPlotLoc
                        ),
                      }
                    )
                    .then(() => this.resetNewPlot());
                }}>Submit</button>
                </div>
                
                {/* <Button
                  
                  disabled={this.DisableNewPlotCreation()}
                  onClick={(e) => {
                    axios
                      .post(
                        "http://in-gps1571a:5001/api/v1/plots/AddPlotInfo",
                        {
                          AvailableTreeCount: parseInt(
                            (this.state.NewPlotSize / 40 ?? 0).toString()
                          ),
                          TreeCount: parseInt(
                            (this.state.NewPlotSize / 40 ?? 0).toString()
                          ),
                          AverageUnitCost: 1500,
                          City: this.state.NewPlotDistrict,
                          Country: this.state.NewPlotCountry,
                          IsPlotVerified: true,
                          PlotArea: this.state.NewPlotSize,
                          MobileNumber: this.state.phoneNumber,
                          State: this.state.NewPlotState,
                          PlotAddress: this.getLocationUrl(
                            this.state.NewPlotLoc
                          ),
                        }
                      )
                      .then(() => this.resetNewPlot());
                  }}
                  variant="contained"
                  color="success"
                  style={{left:"70%"}}
                >
                  Submit
                </Button> */}
                
              </div>
              </div>
              </div>
            )}
            {this.state.tab == 3 && !this.state.editProfile && (
              <div className="TabData">Item 4</div>
            )}
            {this.state.tab == 4 && !this.state.editProfile && (
              <div className="TabData">Item 5</div>
            )}
            {this.state.tab == 5 && !this.state.editProfile && (
              <div className="CarbonCalcContainer TabData">
              <div className="various-pollution-flex">
                <div className="electricity-pollution-flex">
                  <div className="icon-margin">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                      fill="#000000" viewBox="0 0 256 256"><path
                        d="M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z"></path></svg>
                  </div>
                  <div>
                  <div className="electricity-flex">
                      <label className="label-class">Average electricity Units Consumed in a month</label>
                      <input type="text" value={this.state.electricity} className="input-class"onChange={(e)=>this.setState({electricity:e.target.value})}/>
                    </div>
                  </div>
                  <div>
                    <div className="total-value-grouped">
                      <label className="label-class label-class-inline">A total of </label>
                      <label className="label-class label-class-inline">{this.state.electricity*.85}</label>
                      <label className="label-class label-class-inline"> kgs CO2 is getting
                        released monthly due to your
                        power usage.</label>
                    </div>
                  </div>
                </div>
                <div className="electricity-pollution-flex">
                  <div className="icons-2-dev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                      fill="#000000" viewBox="0 0 256 256"><path
                        d="M240,112H229.2L201.42,49.5A16,16,0,0,0,186.8,40H69.2a16,16,0,0,0-14.62,9.5L26.8,112H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V192h96v16a16,16,0,0,0,16,16h24a16,16,0,0,0,16-16V128h8a8,8,0,0,0,0-16ZM69.2,56H186.8l24.89,56H44.31ZM64,208H40V192H64Zm128,0V192h24v16Zm24-32H40V128H216ZM56,152a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,152Zm112,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H176A8,8,0,0,1,168,152Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                      fill="#000000" viewBox="0 0 256 256"><path
                        d="M216,120a41,41,0,0,0-6.6.55l-5.82-15.14A55.64,55.64,0,0,1,216,104a8,8,0,0,0,0-16H196.88L183.47,53.13A8,8,0,0,0,176,48H144a8,8,0,0,0,0,16h26.51l9.23,24H152c-18.5,0-33.5,4.31-43.37,12.46a16,16,0,0,1-16.76,2.07C81.29,97.72,31.13,77.33,26.71,75.6L21,73.36A17.74,17.74,0,0,0,16,72a8,8,0,0,0-2.87,15.46h0c.46.18,47.19,18.3,72.13,29.63a32.15,32.15,0,0,0,33.56-4.29c4.86-4,14.57-8.8,33.19-8.8h18.82a71.74,71.74,0,0,0-24.17,36.59A15.86,15.86,0,0,1,131.32,152H79.2a40,40,0,1,0,0,16h52.12a31.91,31.91,0,0,0,30.74-23.1,56,56,0,0,1,26.59-33.72l5.82,15.13A40,40,0,1,0,216,120ZM40,168H62.62a24,24,0,1,1,0-16H40a8,8,0,0,0,0,16Zm176,16a24,24,0,0,1-15.58-42.23l8.11,21.1a8,8,0,1,0,14.94-5.74L215.35,136l.65,0a24,24,0,0,1,0,48Z"></path></svg>
                  </div>
                  <div className="travel-flex">
                      <label className="label-class">Average Distance travelled by you per
                        day</label>
                      <input type="text" className="input-class"value={this.state.travelKM} onChange={(e)=>this.setState({travelKM:e.target.value})}/>
                    </div>
                 
                    <div className="travel-flex-down">
                      <label className="label-class">Vehicle
                        Type</label>
                      <select name="areas" className="select-vehicle"value={this.state.vehicle} onChange={(e)=>this.setState({vehicle:e.target.value})}>
                        <option>Car</option>
                        <option>Bike</option>
                      </select>
                      </div>
                  <div>
                    <div className="total-value-grouped">
                      <label className="label-class label-class-inline">A total of </label>
                      <label className="label-class label-class-inline">{Math.round(this.state.vehicle=="Car"?this.state.travelKM*1.22:this.state.travelKM*1.5)*300/100}</label>
                      <label className="label-class label-class-inline"> Kgs of CO2 is getting
                        released monthly due to usage of fossil fueled vehicles.</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
            {this.state.tab == 6 && !this.state.editProfile && (
              <div className="TabData">Item 7</div>
            )}
            {this.state.editProfile && (
              <div className="EditAccountDetails TabData">
                <label style={{fontSize:"20px"}}>My Profile</label>
                <div className="ProfileData">
                <label>First Name</label>
                <input
                  value={this.state?.firstName}
                  onChange={(e) => this.setState({ firstName: e.target.value })}
                ></input>
                <label>Middle Name</label>
                <input
                  value={this.state?.middleName}
                  onChange={(e) =>
                    this.setState({ middleName: e.target.value })
                  }
                ></input>
                <label>Last Name</label>
                <input
                  value={this.state?.lastName}
                  onChange={(e) => this.setState({ lastName: e.target.value })}
                ></input>
                <label>PhoneNumber</label>
                <input disabled={true} value={this.state?.phoneNumber}></input>
                <label>Mail Address</label>
                <input
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                ></input>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => axios.post("http://in-gps2508a:5001/api/v1/plotOwner/AddPlotOwnerInfo",{FirstName:this.state.firstName,LastName:this.state.lastName,MiddleName:this.state.middleName,MobileNumber:this.state.phoneNumber}).then(()=>
                    this.setState({
                      editProfile: false,
                    }))
                  }
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    this.setState({
                      firstName: this.props.Planter.firstName,
                      middleName: this.props.Planter.middleName,
                      lastName: this.props.Planter.lastName,
                      email: this.props.Planter.email,
                      editProfile: false,
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
              </div>
            )}
          </Box>
        </div>
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            position: "fixed",
          }}
        ></div>
      </div>
    );
  }
}
export default PlanterPage;

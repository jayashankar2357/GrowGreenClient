import React, { Component } from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import { DonorDetails } from "./Interfaces";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

class DonorPage extends Component<{ Donor: DonorDetails; Logout: () => void }> {
  state = { ...this.props, open: false, tab: 0,editProfile:false,firstName:this.props.Donor.firstName,
    middleName:this.props.Donor.middleName,lastName:this.props.Donor.lastName,phoneNumber:this.props.Donor.PhoneNumber,
    email:this.props.Donor.email };
  handleClose = (event: { currentTarget: any }) => {
    this.setState({ open: false });
  };
  a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  render() {
    return (
      <div className={this.props.Donor.isAdmin?"Admin":"Donor"}>
        <div
          style={{
            width: "100%",
            height: "100px",
            backgroundColor: "lightgreen",
          }}
        >
          <span style={{ fontSize: 20 }}>
            Welcome {this.state?.firstName} {this.state?.middleName}{" "}
            {this.state?.lastName}
          </span>
        </div>
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
              <MenuItem onClick={() => this.setState({editProfile:true})}>
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
                <ListItemIcon >
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
            style={{ backgroundColor: "cornsilk" }}
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
                icon={<FavoriteIcon />}
                iconPosition="bottom"
                label="My Impact"
                {...this.a11yProps(0)}
              />
              <Tab label="My Trees" {...this.a11yProps(1)} />
              <Tab label="Adopt new Tree" {...this.a11yProps(2)} />
              <Tab label="My Credit" {...this.a11yProps(3)} />
              <Tab label="My Returns" {...this.a11yProps(4)}></Tab>
              <Tab
                label="Carbon Foot Print Calculator"
                {...this.a11yProps(5)}
              />
              {this.props.Donor.isAdmin && (
                <Tab label="Complaints" {...this.a11yProps(6)} />
              )}
            </Tabs>
            {this.state.tab == 0&&!this.state.editProfile && <div className="TabData">Item One</div>}
            {this.state.tab == 1 &&!this.state.editProfile&& (
              <div className="TabData">
                {this.state.Donor.orders?.length > 0 && <div></div>}
              </div>
            )}
            {this.state.tab == 2 &&!this.state.editProfile&& (
              <div className="TabData adot_a_tree">
                <div></div>
              </div>
            )}
            {this.state.tab == 3 &&!this.state.editProfile&& <div className="TabData">Item 4</div>}
            {this.state.tab == 4&&!this.state.editProfile && <div className="TabData">Item 5</div>}
            {this.state.tab == 5 &&!this.state.editProfile&& <div className="TabData">Item 6</div>}
            {this.state.tab == 6&&!this.state.editProfile && <div className="TabData">Item 7</div>}
            {this.state.editProfile&&<div className="EditAccountDetails TabData">
              <label>First Name</label>
              <input value={this.state?.firstName} onChange={(e)=>this.setState({firstName:e.target.value})}></input>
              <label>Middle Name</label>
              <input value={this.state?.middleName}  onChange={(e)=>this.setState({middleName:e.target.value})}></input>
              <label>Last Name</label>
              <input value={this.state?.lastName}  onChange={(e)=>this.setState({lastName:e.target.value})}></input>
              <label>PhoneNumber</label>
              <input disabled={true} value={this.state?.phoneNumber}></input>
              <label>Mail Address</label>
              <input value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}></input>
              <Button variant="contained" color="success"
                onClick={() =>{
                  this.setState({
                    editProfile: false,
                  })
                }
                }
              >
                Save
              </Button>
              <Button variant="contained" color="error"
                onClick={() =>{
                  this.setState({
                    firstName: this.props.Donor.firstName,
                    middleName: this.props.Donor.middleName,
                    lastName: this.props.Donor.lastName,
                    email: this.props.Donor.email,
                    editProfile: false,
                  })
                }
                }
              >
                Cancel
              </Button>
              </div>}
              
          </Box>
        </div>
        <div
          style={{
            backgroundColor: "lightgreen",
            height: "100%",
            width: "100%",
            position: "fixed",
          }}
        ></div>
      </div>
    );
  }
}
export default DonorPage;

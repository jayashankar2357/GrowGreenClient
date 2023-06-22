import React, { Component } from "react";
import { HiOutlineUser } from "react-icons/hi";
import DonorPage from "./DonorPage";
import { DonorDetails, PlanterDetails } from "./Interfaces";
import PlanterPage from "./PlanterPage";
import ActionAlerts from "./Alert";
import { Box, Button, makeStyles, Tab, Tabs } from "@mui/material";
import axios from "axios";
import { PaperPlaneRight } from "@phosphor-icons/react";
import InstagramIcon from "@mui/icons-material/Instagram";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import SendIcon from "@mui/icons-material/Send";
import Featured from './public/Featured.jpg';
import ACoupleOfTrees from './public/ACoupleOfTrees.jpg';
import PlantWithMoney from './public/PlantWithMoney.jpg';
import MakeAnImpact from './public/MakeAnImpact.jpg';
import Icon from './public/Icon.png'; 



class MainPage extends Component<any> {
  state = {
    showLoginPage: false,
    loggedInAsDonor: false,
    loggedInAsPlanter: false,
    LoginType: 0,
    ShowMainPage: true,
    id: "",
    test: "",
    PhoneNum: "",
    PhoneNumber: "",
    otpReceieved: "",
    OTPSendForDonor: false,
    OTPSendForPlanter: false,
    OTP: undefined,
    Donor: this.emptyDonor(),
    Planter: this.emptyPlanter(),
  };
  emptyDonor(): DonorDetails {
    let donor: DonorDetails;
    donor = {
      firstName: "",
      middleName: "",
      lastName: "",
      orders: [],
      cart: [],
      PhoneNumber: "",
      isAdmin: false,
      email: "",
    };
    return donor;
  }
  emptyPlanter(): PlanterDetails {
    let planter: PlanterDetails;
    planter = {
      firstName: "",
      middleName: "",
      lastName: "",
      plots: [],
      PhoneNumber: "",
      email: "",
    };
    return planter;
  }

  filledDonor(data: any): DonorDetails {
    console.log(data);
    let donor: DonorDetails;
    donor = {
      firstName: data?.data?.subscriberInfo?.FirstName,
      middleName: data?.data?.subscriberInfo?.MiddleName,
      lastName: data?.data?.subscriberInfo?.LastName,
      orders: data?.data?.subscriberTrees,
      cart: [],
      PhoneNumber: this.state?.PhoneNumber,
      isAdmin: false,
      email: "",
    };
    return donor;
  }
  filledPlanter(data: any): PlanterDetails {
    console.log(data);
    let planter: PlanterDetails;
    planter = {
      firstName: data?.data?.plotOwnerInfo?.FirstName,
      middleName: data?.data?.plotOwnerInfo?.MiddleName,
      lastName: data?.data?.plotOwnerInfo?.LastName,
      plots: data?.data?.OwnedPlots,
      PhoneNumber: this.state?.PhoneNumber,
      email: "",
    };
    return planter;
  }

  Login(e: any) {
    console.log(e.target.value);
    this.setState({ test: e.Tostring() });
  }

 

  render() {
    return (
      <div>
        {this.state.ShowMainPage && (
          <body className="MainPage">
            <header className="header">
              <a href="#">
                <img className="logo" alt="GrowGreen logo" src={Icon}/>
              </a>
              <nav className="main-nav">
                <ul className="main-nav-list">
                  <li>
                    <a className="main-nav-link" href="#">
                      Impact
                    </a>
                  </li>
                  <li>
                    <a className="main-nav-link" href="#">
                      How it works
                    </a>
                  </li>
                  <li>
                    <a className="main-nav-link" href="#">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      className="main-nav-link" href="#"
                      onClick={() =>
                        this.setState({
                          showLoginPage: true,
                          ShowMainPage: false,
                        })
                      }
                    >
                      Login
                    </a>
                  </li>
                </ul>
              </nav>
            </header>

            <section className="section-hero">
              <div className="hero">
                <div className="hero-text-box">
                  <h1 className="heading-primary">Our Mission</h1>
                  <p className="hero-description">
                    As the number-one provider of high-quality carbon credits,
                    we aim to connect landowners to net-zero leaders.
                  </p>
                </div>
                <div className="hero-img-box">
                  <img src={Featured} className="hero-img" />
                </div>
              </div>
            </section>

            <section className="section-cta">
              <div className="container impact-container">
                <div className="cta">
                  <div className="cta-text-box">
                    <h2 className="heading-secondary">Impact to Data</h2>
                    <p className="cta-text">
                      Together, landowners who engaged in sustainable forest
                      management and net-zero leaders created the largest forest
                      carbon project in the US.
                    </p>
                  </div>
                  <div className="my-impact-exact-results">
                    <div>
                      <h3 className="my-impact-exact-results-main-value">
                        13400
                      </h3>
                      <p className="my-impact-exact-results-main-text">
                        some value
                      </p>
                    </div>
                    <div>
                      <h3 className="my-impact-exact-results-main-value">
                        13400
                      </h3>
                      <p className="my-impact-exact-results-main-text">
                        some value
                      </p>
                    </div>
                    <div>
                      <h3 className="my-impact-exact-results-main-value">
                        13400
                      </h3>
                      <p className="my-impact-exact-results-main-text">
                        some value
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div>
                <div className="container">
                  <span className="subheading">How it works</span>
                  <h2 className="heading-secondary">
                    Three steps to a cleaner Environment
                  </h2>
                </div>
                <div className="container grid">
                  <div className="contained-feature-tabs">
                    <div>
                      <h1 className="step-number">01</h1>
                    </div>
                    <div>
                      <h3 className="heading-tertiary">Choose your Tree</h3>
                    </div>
                    <div>
                      <p className="step-description">
                        Select the perfect tree for you by browsing the
                        website's options and finding the right species and
                        location
                      </p>
                    </div>
                    <div>
                      <img
                        className="step-img"
                        alt=""
                        src={ACoupleOfTrees}
                      />
                    </div>
                  </div>
                  <div className="contained-feature-tabs">
                    <div>
                      <h1 className="step-number">02</h1>
                    </div>
                    <div>
                      <h3 className="heading-tertiary">Pay for your Tree</h3>
                    </div>
                    <div>
                      <p className="step-description">
                        Complete your purchase by paying the required amount
                        using your preferred payment method.
                      </p>
                    </div>
                    <div>
                      <img
                        className="step-img"
                        alt=""
                        src={PlantWithMoney}
                      />
                    </div>
                  </div>
                  <div className="contained-feature-tabs">
                    <div>
                      <h1 className="step-number">03</h1>
                    </div>
                    <div>
                      <h3 className="heading-tertiary">Receive your Impact</h3>
                    </div>
                    <div>
                      <p className="step-description">
                        Track the positive impact you're making on the
                        environment by receiving updates on your tree's growth
                        and the amount of carbon it sequesters.
                      </p>
                    </div>
                    <div style={{ alignSelf: "self-end" }}>
                      <img className="step-img" alt="" src={MakeAnImpact} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="footer">
              <div className="container grid grid--footer">
                <div className="logo-col">
                  <a href="#" className="footer-logo">
                    <img
                      className="logo"
                      alt="Omnifood logo"
                      src={Icon}
                      style={{ width: "170", height: "50" }}
                    />
                  </a>

                  <ul className="social-links">
                    <li>
                      <a className="footer-link" href="#">
                        <InstagramIcon></InstagramIcon>
                      </a>
                    </li>
                    <li>
                      <a className="footer-link" href="#">
                        <PersonPinIcon></PersonPinIcon>
                      </a>
                    </li>
                    <li>
                      <a className="footer-link" href="#">
                        <SendIcon></SendIcon>
                      </a>
                    </li>
                  </ul>

                  <p className="copyright">
                    Copyright &copy; 2023 by GrowGreen, Inc. All rights
                    reserved.
                  </p>
                </div>
                <div className="address-col">
                  <p className="footer-heading">Contact us</p>
                  <address className="contacts">
                    <p className="address">
                      623 Client St., 2nd Floor, Hyderabad, 500032
                    </p>
                    <p>
                      <a className="footer-link" href="tel:+91 8894894834">
                        +91 8894894834
                      </a>
                      <br />
                      <a
                        className="footer-link"
                        href="mailto:hello@growgreen.com"
                      >
                        hello@growgreen.com
                      </a>
                    </p>
                  </address>
                </div>
                <nav className="nav-col">
                  <p className="footer-heading">Account</p>
                  <ul className="footer-nav">
                    <li>
                      <a className="footer-link" href="#">
                        Create account
                      </a>
                    </li>
                    <li>
                      <a className="footer-link" href="#">
                        Sign in
                      </a>
                    </li>
                    <li>
                      <a className="footer-link" href="#">
                        iOS app
                      </a>
                    </li>
                    <li>
                      <a className="footer-link" href="#">
                        Android app
                      </a>
                    </li>
                  </ul>
                </nav>

                <nav className="nav-col">
                  <p className="footer-heading">Company</p>
                  <ul className="footer-nav">
                    <li>
                      <a className="footer-link" href="#">
                        About GrowGreen
                      </a>
                    </li>
                    <li>
                      <a className="footer-link" href="#">
                        For Business
                      </a>
                    </li>
                    <li>
                      <a className="footer-link" href="#">
                        Farm partners
                      </a>
                    </li>
                    <li>
                      <a className="footer-link" href="#">
                        Careers
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </footer>
          </body>         
        )}

        

        {this.state.showLoginPage && (
          <div className="LoginRect0">
            <div className="LoginRect1"></div>
            <div className="LoginRect2">
              <label className="LoginText">Welcome Back</label>

              

              <Box sx={{ width: "100%", bgcolor: "background.paper"}}>
                <Tabs
                  value={this.state.LoginType}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#2e7d32"
                    }
                  }}
                  onChange={(event: React.SyntheticEvent, newValue: number) =>
                    this.setState({ LoginType: newValue }, () =>
                      console.log(this.state.LoginType)
                    )
                  }
                  centered
                >
                  <Tab label="Login As Donor" />
                  <Tab label="Login As Planter" />
                </Tabs>
              </Box>

              <div className="LoginSection">
              <div className="combination-of-label-and-dropdown combination-of-label-and-dropdown-space-even">
                  <label className="cta-label">Phone Number</label>
                  <input className="cta-input" type="text" 
                   readOnly={
                    this.state.OTPSendForDonor || this.state.OTPSendForPlanter
                  }
                  onChange={(e) => this.setState({ PhoneNum: e.target.value })}/>

                 <PaperPlaneRight
                  style={{ fontSize: "30px", verticalAlign: "middle" }}
                  onClick={() => {
                    this.setState({
                      OTPSendForDonor: this.state.LoginType == 0,
                      OTPSendForPlanter: this.state.LoginType == 1,
                    });
                    //  axios.post("http://in-gps1571a:5001/sendOTP",{phone:this.state.PhoneNum}).then((response)=>this.setState({otpReceieved:response.data?.otp})).catch(()=>console.log("otp server down"));
                  }}
                ></PaperPlaneRight>

                </div>

                {this.state.OTPSendForDonor && (
                  <div>
                    <div className="combination-of-label-and-dropdown combination-of-label-and-dropdown-space-even">
                    <label className="cta-label otp-label">OTP</label>
                    <input
                      className="cta-input"
                      placeholder="OTP"
                      onChange={(e) => this.setState({ OTP: e.target.value })}
                    ></input>
                    </div>

                    <div className="space-around-div">
                      <Button
                        variant="contained"
                        color="success"
                        style={{ margin: "20px" }}
                        onClick={() => {
                          ActionAlerts();
                          if (true)
                            //this.state.OTP&&this.state.OTP==this.state.otpReceieved))
                            //otp is correct
                            //load data from DB and set Donor
                            // let donor=this.emptyPlanter();
                            //  donor.firstName="Pwoli";
                            this.setState(
                              {
                                PhoneNumber: this.state.PhoneNum,
                              },
                              ()=>axios.get(`http://in-gps2508a:5001/api/v1/subscriber/${this.state.PhoneNumber}`).then(response=>
                               
                                this.setState({
                                  showLoginPage: false,
                                  ShowMainPage: false,
                                  loggedInAsDonor: true,
                                  loggedInAsPlanter: false,
                                  OTPSendForPlanter: false,
                                  OTPSendForDonor: false,
                                  OTP: undefined,
                                  Donor: this.filledDonor(response),
                                })
                            ))
                        }}
                      >
                        login as Donor
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ margin: "20px" }}
                        onClick={() =>
                          this.setState({
                            showLoginPage: false,
                            ShowMainPage: true,
                            loggedInAsDonor: false,
                            PhoneNumber: "",
                            loggedInAsPlanter: false,
                            OTPSendForPlanter: false,
                            OTPSendForDonor: false,
                            OTP: undefined,
                          })
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {this.state.OTPSendForPlanter && (
                  <div>
                    <div className="combination-of-label-and-dropdown combination-of-label-and-dropdown-space-even"> 
                    <label className="cta-label otp-label">OTP</label>
                    <input
                      className="cta-input"
                      placeholder="OTP"
                      onChange={(e) => this.setState({ OTP: e.target.value })}
                    ></input>
                    </div>
                    <div className="space-around-div">
                      <Button
                        variant="contained"
                        style={{ margin: "20px" }}
                        color="success"
                        onClick={() => {
                          if (true) {
                            //this.state.OTP&&this.state.OTP==this.state.otpReceieved)
                            //otp is correct
                            //load data from DB and set Planter
                            this.setState(
                              {
                                PhoneNumber: this.state.PhoneNum,
                              },()=>axios.get(`http://in-gps2508a:5001/api/v1/plotowner/getPlotOwner/${this.state.PhoneNumber}`).then(response=>
                               
                                this.setState({
                                  showLoginPage: false,
                                  ShowMainPage: false,
                                  loggedInAsDonor: false,
                                  loggedInAsPlanter: true,
                                  OTPSendForPlanter: false,
                                  OTPSendForDonor: false,
                                  OTP: undefined,
                                  Planter: this.filledPlanter(response),
                                })
                            ))
                          } else {
                            console.log("wrong otp", this.state.OTP);
                            console.log("wrong otp", this.state.otpReceieved);
                          }
                        }}
                      >
                        login as Planter
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        style={{ margin: "20px" }}
                        onClick={() =>
                          this.setState({
                            showLoginPage: false,
                            ShowMainPage: true,
                            loggedInAsDonor: false,
                            PhoneNumber: "",
                            loggedInAsPlanter: false,
                            OTPSendForPlanter: false,
                            OTPSendForDonor: false,
                            OTP: undefined,
                          })
                        }
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {this.state.loggedInAsPlanter && (
          <PlanterPage
            Planter={this.state.Planter}
            Logout={() => {
              this.setState({
                ShowMainPage: true,
                loggedInAsPlanter: false,
                PhoneNum: "",
                loggedInAsDonor: false,
              });
            }}
          />
        )}
        {this.state.loggedInAsDonor && (
          <DonorPage
            Donor={this.state.Donor}
            Logout={() => {
              this.setState({
                ShowMainPage: true,
                loggedInAsPlanter: false,
                PhoneNum: "",
                loggedInAsDonor: false,
              });
            }}
          />
        )}
      </div>
    );
  }
}
export default MainPage;

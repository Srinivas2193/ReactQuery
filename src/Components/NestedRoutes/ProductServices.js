import React from "react";
import WebApplications from "./../ProductServices/WebApplications";
import MobileApplications from "./../ProductServices/MobileApplication";

import { Route, NavLink, Routes } from "react-router-dom";

// Services Component
function Itservices() {
  return (
    <>
      {" "}
      <div className="container-fluid py-4">
        <h2>It Services</h2>
        <p>
          Information technology service management are the activities that are
          performed by an organization to design, build, deliver, operate and
          control information technology services offered to customers.Empowered
          Teams to Deliver Great Service Experience with Jira Service
          Management™. Make ITSM Your Competitive Advantage With Jira Service
          Management. Start for Free Today! Accelerated ITSM. 25% Fewer Tickets.
          Streamline Workflows.{" "}
        </p>
        <hr style={{ backgroundColor: "red", height: "4px" }} />

        <div className="row">
          <div className="col-lg-3 p-2 text-center">
            <ul className="list-group">
              <li className="list-group-item">
                <NavLink to="product-services/web-app">
                  {" "}
                  Web Application Services{" "}
                </NavLink>
              </li>

              <li className="list-group-item">
                <NavLink to="product-services/mob-app">
                  {" "}
                  Mobile Application Services{" "}
                </NavLink>
              </li>

              <li className="list-group-item">
                <NavLink to="product-services/ux-ui">
                  {" "}
                  UX- UI Design Services{" "}
                </NavLink>
              </li>

              <li className="list-group-item">
                <NavLink to="product-services/project-support">
                  {" "}
                  Project Support Services{" "}
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-9 ">
            {/* Nested Routings */}

            <Routes>
              <Route
                exact
                path="product-services"
                element={<WebApplications />}
              />
              <Route
                path="product-services/web-app"
                element={<WebApplications />}
              />
              <Route
                path="product-services/mob-app"
                element={<MobileApplications />}
              />
              <Route
                path="product-services/ux-ui"
                element={<div>"this is UX-UI application Services"</div>}
              />
              <Route
                path="product-services/project-support"
                element={<div>".... Still Page is Loading"</div>}
              />
            </Routes>

            {/* Nested Routings */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Itservices;

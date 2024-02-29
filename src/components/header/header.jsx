import React from "react";
import { useState } from "react";
//import reactLogo from "./assets/hartmann-logo.png";

function Header() {
  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="http://127.0.0.1:5500/modules/idispenser-theme/src/main/webapp/css/idispenser.css"
      />
      <script
        type="module"
        src="http://127.0.0.1:5500/modules/idispenser-theme/src/main/webapp/js/idispenser.js"
      ></script>

      <header className="lfr-layout-structure-item-afd2e854-879c-03cf-d03f-05121cb619db lfr-layout-structure-item-container ">
        <div className="lfr-layout-structure-item-29891ea2-6f98-028a-6467-bc903ff945ad lfr-layout-structure-item-container  container-fluid container-fluid-max-xl">
          <div className="lfr-layout-structure-item-basic-component-image lfr-layout-structure-item-71573b72-19c7-8dbf-6f45-3b03cd8b0941 ">
            <div id="fragment-44564747-b31e-3d12-f420-b51f9d2b0c11">
              <div className="component-image overflow-hidden">
                <img
                  className="w-0"
                  data-lfr-editable-id="image-square"
                  data-lfr-editable-type="image"
                  // src="/documents/d/guest/hartmann-logo-png?download=true"
                  src="/src/assets/hartmann-logo.png"
                  data-fileentryid="36108"
                />
              </div>
            </div>
          </div>
          <div className="lfr-layout-structure-item-com-liferay-site-navigation-menu-web-portlet-sitenavigationmenuportlet lfr-layout-structure-item-c767e03e-d483-bdb5-214a-f787c7c8804a ">
            <div id="fragment-0adea7ed-bf58-f93e-e5fc-66a3dce3e3bf">
              <div
                className="portlet-boundary portlet-boundary_com_liferay_site_navigation_menu_web_portlet_SiteNavigationMenuPortlet_  portlet-static portlet-static-end portlet-decorate portlet-navigation "
                id="p_p_id_com_liferay_site_navigation_menu_web_portlet_SiteNavigationMenuPortlet_INSTANCE_wkou_"
              >
                <span id="p_com_liferay_site_navigation_menu_web_portlet_SiteNavigationMenuPortlet_INSTANCE_wkou"></span>
                <section
                  className="portlet"
                  id="portlet_com_liferay_site_navigation_menu_web_portlet_SiteNavigationMenuPortlet_INSTANCE_wkou"
                >
                  <div className="portlet-content">
                    <div className="autofit-float autofit-row portlet-header">
                      <div className="autofit-col autofit-col-end">
                        <div className="autofit-section"></div>
                      </div>
                    </div>
                    <div className=" portlet-content-container">
                      <div className="portlet-body">
                        {/*<div id="navbar_com_liferay_site_navigation_menu_web_portlet_SiteNavigationMenuPortlet_INSTANCE_wkou">
                          <ul
                            aria-label="Site Pages"
                            className="navbar-blank navbar-nav navbar-site"
                            role="menubar"
                            id="yui_patched_v3_18_7_1_1691475375412_57"
                          >
                            <li
                              className="lfr-nav-item nav-item selected active"
                              id="layout_com_liferay_site_navigation_menu_web_portlet_SiteNavigationMenuPortlet_INSTANCE_wkou_2"
                              role="presentation"
                            >
                              <a
                                className="nav-link text-truncate"
                                href="http://localhost:8080/home"
                                role="menuitem"
                                id="yui_patched_v3_18_7_1_1691475375412_76"
                              >
                                <span className="text-truncate">Home </span>{" "}
                              </a>
                            </li>
                            <li
                              className="lfr-nav-item nav-item"
                              id="layout_com_liferay_site_navigation_menu_web_portlet_SiteNavigationMenuPortlet_INSTANCE_wkou_4"
                              role="presentation"
                            >
                              <a
                                className="nav-link text-truncate"
                                href="http://localhost:8080/test"
                                role="menuitem"
                                id="yui_patched_v3_18_7_1_1691475375412_78"
                              >
                                <span className="text-truncate">test </span>{" "}
                              </a>
                            </li>
                          </ul>
  </div>*/}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <div className="lfr-layout-structure-item-basic-component-html lfr-layout-structure-item-bc94e919-21db-f70a-c863-f796470179bf ">
            <div id="fragment-7c1c9241-890f-f56e-818f-b7bb7be923e8">
              <div
                className="component-html"
                data-lfr-editable-id="element-html"
                data-lfr-editable-type="html"
              >
                <ul className="header-nav nav">
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      {" "}
                      <span className="icon icon-profile"></span>{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      {" "}
                      <span className="icon icon-qr-code"> </span>{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      {" "}
                      <span className="icon icon-support"></span>{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      {" "}
                      <span className="icon icon-log-out"></span>{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;

import React from "react";
import Link from "next/link";

const SideNavBar = () => {
  return (
    <nav className="side-navbar">
      <div className="scroll-box">
        <ul className="scrollbox-inner">
          <li>
            <Link href="/">
              <i className="fa-solid fa-house"></i>Home
            </Link>
          </li>
          <li>
            <Link href="https://www.reddit.com/r/popular/">
              <i className="fa-solid fa-fire-flame-curved"></i>Popular
            </Link>
          </li>
          <div className="text"></div>
          <li>TOPICS</li>
          <li>
            <Link href="https://www.reddit.com/t/minecraft/">
              <i className="fa-solid fa-gamepad"></i>Gaming
            </Link>
          </li>
          <li>
            <Link href="https://www.reddit.com/t/premier_league/">
              <i className="fa-solid fa-basketball"></i>Sports
            </Link>
          </li>
          {/* Add more navigation items as needed */}
          <div className="text"></div>
          <li>RESOURCES</li>
          <li>
            <Link href="https://www.redditinc.com/">
              <i className="fa-brands fa-reddit-alien"></i>About Reddit
            </Link>
          </li>
          <li>
            <Link href="https://accounts.reddit.com/adsregister?dest=https%3A%2F%2Fads.reddit.com%2F&referrer=https%3A%2F%2Fwww.reddit.com%2F&utm_source=web3x_consumer&utm_name=left_nav_cta">
              <i className="fa-brands fa-reddit-alien"></i>Advertise
            </Link>
          </li>
          {/* Add more resources links as needed */}
          <div className="text"></div>
          <li>
            <Link href="https://www.redditinc.com/policies/content-policy">
              <i className="fa-brands fa-reddit-alien"></i>Content Policy
            </Link>
          </li>
          <li>
            <Link href="https://www.reddit.com/policies/privacy-policy">
              <i className="fa-brands fa-reddit-alien"></i>Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="https://www.redditinc.com/policies/user-agreement">
              <i className="fa-brands fa-reddit-alien"></i>User Agreement
            </Link>
          </li>
          <li style={{ fontSize: "10px", paddingTop: "10px" }}>
            Reddit, Inc. @ 2023. All rights reserved
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideNavBar;

import adept_automotive_logo from "./images/adept_automotive_logo.jpeg";
// import { useRef } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";


// #### all commented out area is attempt to use GSAP, work in progress ####

function MainPage() {

  // const box = useRef();

  // useGSAP(() => {
  //   gsap.to(box.curent, {x:360});
  // });

  return (
    <div className="mainPageBody">
      <h1 className="display-5 fw-bold"><img src={adept_automotive_logo} alt="Adept Automotive Logo" className="mainLogo" /></h1>
      <div className="col-lg-6 mx-auto">
        <p  className="mainpageParagraph">
          If you're buying a car, you want someone with talent. <br />
          <br />
          Someone, adept. <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. <br />

        </p>
      </div>
    </div>
  );
}

export default MainPage;

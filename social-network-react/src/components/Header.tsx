import React from "react";
import logo from "../img/bandatra.png";
import { Link } from "react-router-dom";

import style from "../css/mainPage.module.css";
// import authStore from "../store/UserStore";

// import { useLocation } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <img src={logo} />
    </header>
  );
};
export default Header;

// <>
//   {/* <header className='header'>
//     <div className='flex'>
//       <div></div>
//       <Link to='/' className='Logo'>
//         PAZHILIYE EVENTS
//       </Link>

//       <div className=''>
//         <div className='BurgerMenu'>
//           <div className='profileImage'>
//             <img src={logo} className='imgh' />
//           </div>
//           <div className='DropdownContent'>
//             <Link to='/Profile'>
//               <p>Profile</p>
//             </Link>

//             <div onClick={() => {}}>
//               <Link to='/login'>
//                 <p>Exit</p>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </header>
// </> */}

// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { postMethodOptions } from '../options';

// const BASE_URL = 'http://localhost:5005';

// export default () => {
//   const history = useHistory();
//   const handleLogOut = async () => {
//     postMethodOptions.headers.Authorization = localStorage.getItem('token');
//     const response = await fetch(`${BASE_URL}/admin/auth/logout`, postMethodOptions);
//     if (response.status === 200) {
//       history.replace('/login');
//     } else {
//       alert('error occured please try again');
//     }
//   };
//   return (
//     <>
//       <div className="navBar">
//         <button type="button" onClick={handleLogOut}>Add Questions</button>
//       </div>
//     </>
//   );
// };
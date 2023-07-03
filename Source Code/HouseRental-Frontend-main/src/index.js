import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


//   {
//     path:"/dashboard",
//     element:<MainDash/>,
//   },
//   {
//     path:"/signup",
//     element:<SignUp/>
//   },
//   {
//     path:"/signin",
//     element:<SignIn/>
//   },
//   {
//     path:"/signin",
//     element:<SignIn/>
//   },
//   {
//     path:"/property",
//     element:<Property />
//   },
//   {
//     path:"/complaints",
//     element:<ComplaintsPage />

//   },
//   {
//     path:"/addProperty",
//     element:<AddProperty />

//   },
//   {
//     path:"/raiseComplaint",
//     element:<RaiseComplaint />

//   },
//   // {
//   //   path:"/complaint",
//   //   element:<Complaints />

//   // },
//   {
//     path:"/addtenant",
//     element:<AddTenant />
//   }


// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
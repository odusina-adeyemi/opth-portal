// // src/hooks/useKindeAuth.ts
// import { useEffect, useState } from 'react';
// import { kinde } from 'kinde-auth-sdk';

// const useKindeAuth = () => {
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchRole = async () => {
//       const user = await kinde.getUser();
//       if (user && user.roles) {
//         setRole(user.roles.includes('optometrist') ? 'optometrist' : 'ophthalmologist');
//       }
//     };

//     fetchRole();
//   }, []);

//   return role;
// };

// export default useKindeAuth;

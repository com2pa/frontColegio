import { Route, Routes } from 'react-router-dom';
import PersistAuth from '../components/PersistAuth';
import Index from '../pages/Index';
import Degree from '../pages/Degree';
import Subjects from '../pages/Subjects';
import FormRegistrationStudent from '../pages/FormRegistrationStudent';





export const Root = () => {
  return (


    <>
    
      <Routes>
        <Route element={<PersistAuth />}>
          <Route path='/dashboard' element={<Index/>}/>
          <Route path='/grado' element={<Degree/>}/>
          <Route path='/asignaturas' element={<Subjects/>}/>
          <Route path='/StudentRegistration' element={<FormRegistrationStudent/>}/>
        
        </Route>
      </Routes>

    </>


  );

};

export default Root;
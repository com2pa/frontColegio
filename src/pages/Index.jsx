import React from 'react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import PieChart from '../components/PieChart';


export const Index = () => {
  return (
    <SidebarWithHeader>     
      <>
        <PieChart/>
      </>

    </SidebarWithHeader>
  );
};

export default Index;
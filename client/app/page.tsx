'use client';
import Table from '@/components/ui/Table';
import PatientTable from '@/components/shared/PatientTable';
import { useWeb3 } from '@/web3/web3Provider';
import { getPatientDataList } from '@/web3/web3Actions';
import { useState, useEffect } from 'react';
import AdminForm from '@/components/shared/AdminForm';

const page = () => {
  const [data, setData] = useState([]);
  const { currentAccount, isAdmin } = useWeb3();

  useEffect(() => {
    if (!currentAccount) {
      return;
    }
    getPatientDataList().then((result: any) => {
      setData(result.iterableList);
      console.log("For Patient Table:", result);
    });
  }, [currentAccount]);
  return (
    <div className='flex flex-col'>
      <Table />
      {isAdmin && <div className='flex flex-col'>
        <h1 className='font-bold text-2xl text-center mt-2 mb-2'>Admin Panel</h1>
        <PatientTable users={data} />
        <AdminForm />
      </div>}
    </div>
  );
};

export default page;

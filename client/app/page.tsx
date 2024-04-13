"use client";
import Table from '@/components/ui/Table';
import React, { FormEvent } from 'react';


async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  formData.forEach((value, key) => {
    console.log(key, value);

  });
}

const page = () => {
  return (
    <div>
      <Table />
      {/* <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input className="border border-gray-300 rounded-md p-2" type="text" id="name" name='name' />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input className="border border-gray-300 rounded-md p-2" type="text" id="age" name='age' />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <input className="border border-gray-300 rounded-md p-2" type='text' id='gender' name='gender' />
        </div>
        <div>
          <label htmlFor="vaccine_status">Vaccine Status</label>
          <input type='radio' id='vaccine_status' name='vaccine_status' value={"vaccinated"} />
          <input type='radio' id='vaccine_status' name='vaccine_status' value={"not vaccinated"} />
        </div>
        <div>
          <label htmlFor="district">District</label>
          <input className="border border-gray-300 rounded-md p-2" type='text' id='district' name='district' />
        </div>
        <div>
          <label htmlFor="symptoms_details">Symptoms Details</label>
          <input className="border border-gray-300 rounded-md p-2" type='text' id='symptoms_details' name='symptoms_details' />
        </div>
        <div>
          <label htmlFor="is_dead">Is Dead</label>
          <input type='radio' id='is_dead' name='is_dead' value={"yes"} />
          <input type='radio' id='is_dead' name='is_dead' value={"no"} />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">Submit</button>


      </form> */}
    </div>
  )
}

export default page
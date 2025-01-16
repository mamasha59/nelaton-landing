import CheckedIcon from '@/IconsComponent/CheckedIcon';

export default function BenefitsCatheterInventory() {
  return (
    <div className="bg-white flex flex-row justify-between p-9 rounded-xl flex-wrap gap-6 shadow-md">
        <div className='flex max-w-[344px] flex-col items-start'>
            <CheckedIcon fill={'#0090F3'} size={42}/>
            <h5 className="text-black font-semibold text-2xl mb-2 mt-7">Inventory Management</h5>
            <p className="text-black text-xl leading-[26px font-normal]">Automatic deduction of catheters after each use.</p>
        </div>      
        <div className='flex max-w-[344px] flex-col items-start'>
            <CheckedIcon fill={'#0090F3'} size={42}/>
            <h5 className="text-black font-semibold text-2xl mb-2 mt-7">Plan Ahead</h5>
            <p className="text-black text-xl leading-[26px font-normal]">Calculate how many catheters you&#39;ll need for a trip or vacation.</p>
        </div>      
        <div className='flex max-w-[344px] flex-col items-start'>
            <CheckedIcon fill={'#0090F3'} size={42}/>
            <h5 className="text-black font-semibold text-2xl mb-2 mt-7">Reminders</h5>
            <p className="text-black text-xl leading-[26px font-normal]">Avoid running out of catheters at the wrong time.</p>
        </div>      
    </div>
)}
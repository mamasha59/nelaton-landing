import CheckedIcon from '@/IconsComponent/CheckedIcon';
import { useTranslations } from 'next-intl';

export default function BenefitsCatheterInventory() {
    const t = useTranslations('HomePage');
    
  return (
    <div className="bg-white flex flex-row justify-between p-9 rounded-xl flex-wrap gap-6 shadow-md">
        <div className='flex max-w-[344px] flex-col items-start'>
            <CheckedIcon fill={'#0090F3'} size={42}/>
            <h3 className="text-black font-semibold text-2xl mb-2 mt-7">{t("inventory_tracking.list.1.inventory_management")}</h3>
            <p className="text-black text-xl leading-[26px font-normal]">{t("inventory_tracking.list.1.automatic_deduction_of_catheters_after_each_use")}</p>
        </div>      
        <div className='flex max-w-[344px] flex-col items-start'>
            <CheckedIcon fill={'#0090F3'} size={42}/>
            <h3 className="text-black font-semibold text-2xl mb-2 mt-7">{t("inventory_tracking.list.2.plan_ahead")}</h3>
            <p className="text-black text-xl leading-[26px font-normal]">{t("inventory_tracking.list.2.calculate_how_many_catheters")}</p>
        </div>      
        <div className='flex max-w-[344px] flex-col items-start'>
            <CheckedIcon fill={'#0090F3'} size={42}/>
            <h3 className="text-black font-semibold text-2xl mb-2 mt-7">{t("inventory_tracking.list.3.reminders")}</h3>
            <p className="text-black text-xl leading-[26px font-normal]">{t("inventory_tracking.list.3.notifications")}</p>
        </div>      
    </div>
)}
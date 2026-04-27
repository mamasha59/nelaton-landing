// Real data structures from the app
export interface iTimerPartTime {
  firstPartTime: boolean;
  secondPartTime: boolean;
  thirdPartTime: boolean;
}

export interface iUnits {
  title: string;
  id: string;
}

export interface iUrineColor {
  color: string;
  title: string;
}

export interface Urine {
  catheterType: string;
  amountOfReleasedUrine?: number;
  urineSymptom?: string;
  urineColor?: iUrineColor;
  unit?: iUnits;
}

export interface iLeakageReason {
  reason: string;
  value: string;
}

export interface iNaturalUrination {
  urineColor?: iUrineColor;
  releasedUrine?: number;
  painVote?: number | string;
  urgeVote?: number | string;
  unit: iUnits;
}

export interface iUrineUrge {
  urgeType?: string;
  intensity?: number;
  accompanySensations?: string[];
  leakage?: string;
  selectedUrge?: number;
  selectedSensations?: string;
}

export interface CatheterizationRecord {
  user_id: string;
  id: string;
  timeStamp: string;
  created_at: string;
  updated_at: string;
  partTime?: iTimerPartTime;
  amountOfDrankFluids?: {
    value: number;
    drinkName?: string;
    unit: iUnits;
  } | null;
  urine?: Urine | null;
  leakageReason?: iLeakageReason | null;
  naturalUrination?: iNaturalUrination | null;
  urineUrge?: iUrineUrge | null;
  isMissedRecord?: boolean;
  wasMadeAfterNightMode?: boolean;
  interval_used_seconds?: number;
  predicted_volume?: number | null;
  surveyAnswers?: any;
  surveyInputs?: any;
  surveyTitle?: string | null;
  lastDateOfCompletion?: string | null;
}

export interface IntervalRecord {
  id: string;
  start_time: string; // "HH:MM:SS"
  end_time: string; // "HH:MM:SS"
  interval_hours: number;
  is_night: boolean;
  created_at: string;
}

export interface JournalData {
  patient_name: string;
  catheterization_data: CatheterizationRecord[];
  intervals_data: IntervalRecord[];
  access_info?: {
    view_count: number;
    expires_at: string | null;
    granted_at: string;
  };
}

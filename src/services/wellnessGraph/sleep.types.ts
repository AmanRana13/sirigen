export interface ISleepParam {
  start_timestamp: any;
  end_timestamp: any;
  senior_id: any;
  account_id: any;
}

export interface ISleepGraphParam {
  sleep_cycle: any;
  senior_id: any;
  account_id: any;
}

export interface ISleepResponse {
  [key: number]: ISleepResponseCycle;
  average_hr: number;
  average_sleep_score: number;
  average_total_sleep_time: number;
  average_total_timeinbed: number;
  sleep_latency: number;
}

export interface ISleepResponseDetail {
  interruptions: number;
  sleep_latency: number;
  sleep_score: number;
  average_hr: number;
  summary_cycle: any;
  time_to_get_up: number;
  total_sleep_time: number;
  total_timeinbed: number;
  wakeupduration: number;
}

export interface ISleepResponseSummary {
  end_timestamp: number;
  hr_average: number;
  interruptions: number;
  senior_day: any;
  sleep_latency: number;
  sleep_score: number;
  time: number;
  time_to_get_up: number;
  timezone: string;
  total_sleep_time: number;
  total_timeinbed: number;
  wakeupduration: number;
}

export interface ISleepSummary {
  daySummary: IDaySummary;
  averageSleepScore: number;
  averageSleepTime: number;
  averageSleepTimeInBed: number;
  summary: ISleepResponseDetail[];
  summaryList: ISleepResponseSummary[];
}

interface ISleepResponseCycle {
  detail: ISleepResponseDetail;
  summary: [key: ISleepResponseSummary];
  average_hr: number;
  average_sleep_score: number;
  average_total_sleep_time: number;
  average_total_timeinbed: number;
  sleep_latency: number;
}

interface IDaySummary {
  sleepScoreAvg: number;
  totalSleepTime: number;
  interruptions: number;
  sleepLatency: number;
  timeToGetUp: number;
  heartRateAvg: number;
  summaryCycle: any;
}

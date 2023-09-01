/* eslint-disable max-len */
export const mockProviderInfo = {
  providerInfo: {
    dentist: [
      {
        id: '77e7dfabdc7148a498db19d95107a5f3',
        name: {
          firstName: 'test',
          middleName: null,
          lastName: 'ss',
        },
        contactPhone: '2222222222',
        providerName: 'Doctor 2',
        speciality: 'Geriatric Dentistry/Geriodontics',
      },
    ],
    doctor: [
      {
        id: '0f3963207cb24096b84c5560b20ce765',
        name: {
          firstName: 'Saquib',
          middleName: null,
          lastName: 'Ajaz',
        },
        contactPhone: '8719282929',
        providerName: 'Doc 2',
        speciality: 'Neonatologist',
      },
      {
        id: '90f00b64f17d4fc6949f7a376644204e',
        name: {
          firstName: 'test',
          middleName: null,
          lastName: 'as',
        },
        contactPhone: '0321456789',
        providerName: 'Doctor 1',
        speciality: 'Anesthesiologist',
      },
    ],
  },
};

export const mockCaregiverInfo = {
  careGiverInfo: [
    {
      id: 'caregiver-ad6b8ea3db6d4ffe8518a8f399bf11fc',
      name: {
        firstName: 'jok',
        middleName: null,
        lastName: 'test',
      },
      caregiverType: 'primary',
      emergencyContact: true,
      mobileNumber: '3222323332',
      alternateNumber: null,
      relationship: 'Son',
    },
  ],
};

export const mockSeniorData = {
  seniorDetail: {
    minimalInfo: {
      name: {
        first_name: 'Kaptan',
        last_name: 'SleepMat',
        middle_name: 'Singh',
      },
      mobile_number: '9999999999',
      gender: 'Male',
      dob: '1979-06-11T18:30:00+00:00',
      user_id: 'senior-042ec8bb092f4442b65fb8705f82f324',
      account_id: '1fc17069353f4da7b15f632748b429ed',
      created_date: '2021-08-04T06:53:21.268517+00:00',
      email: 'kaptan.singh@clearcaptions.com',
      address: {
        state: 'LA',
        city: 'My City',
        street: 'My Street',
        zipcode: '90001',
        timezone: 'America/Los_Angeles',
      },
    },
    basicInfo: {
      user_id: 'senior-042ec8bb092f4442b65fb8705f82f324',
      height: {
        feet: '5.0',
        inch: '11.0',
      },
      weight: '178.0',
      academic_level: 'Masters Degree',
      career: 'My Career',
      primary_spoken_language: 'English',
      other_spoken_language: null,
      preferred_name: 'Kaptan Singh',
      home_phone: '9999999999',
      emergency_phone: '8888888888',
      email: null,
      faith: 'Hindu',
      other_faith: null,
      home_technology: null,
      home_gate_code: null,
      race: null,
      other_race: null,
      pets: ['dogs', 'cats'],
      other_pets: null,
      social_media_links: [null],
      life_event: null,
      lock_box_code: null,
      created_date: '2021-08-04T06:59:46.893378+00:00',
    },
    isLoading: false,
  },
  profilePic: {
    format: 'jpeg',
    image:
      // eslint-disable-next-line max-len
      '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',
  },
  seniorLocation: {
    atHome: 0,
    currentCoordinates: {
      latitude: null,
      longitude: null,
    },
    timeAwayFromHome: 0,
    historyData: [],
  },
};

export const mockApplicationState = {
  auth: {
    username: '',
    isAuthenticated: true,
    loading: false,
    sessionInterval: null,
    isTimeoutModel: false,
    email: 'srijan-dev@srijan.net',
    accessToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6ImNhcmVhZ2VudCIsInNlbmlvcl9xdWVyeV9pbmZvIjp7fSwiaXNfc2VuaW9yIjpmYWxzZSwiaXNfcmVzZXRfbmVlZGVkIjpmYWxzZSwiaXNzIjoidmltaWVudC1hdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwiYXVkIjoidmltaWVudC1wb3J0YWwiLCJqd3RfdmVyc2lvbiI6IjIiLCJ1c2VyX2lkIjoiY2FyZWFnZW50LWZiMjM4MmFhY2QzNTQ1Y2NiMTRjOWRmNWRjODgyOTYzLXNyaWphbi1kZXYtdGVhbSIsInByaW1hcnlfY2FyZWdpdmVyIjpbXSwic2Vjb25kYXJ5X2NhcmVnaXZlciI6W10sImV4cCI6MTY0NTY4NjYxOSwiaWF0IjoxNjQ1Njc1ODE5fQ._uEYXJXgGYdduJOZnhZmXxsACqI7ll5M2qM3lZNMrAM',
    refreshToken:
      'ff77757159ab48d8b7795b5fccd1696ab47a259bf0714210bf84ee2d624b29ef$EZYPW6PQB76EK9YO5W43RSBDNS9UC',
    userName: {middle_name: 'Dev', first_name: 'Srijan', last_name: 'Team'},
    userId: 'careagent-fb2382aacd3545ccb14c9df5dc882963-srijan-dev-team',
  },
  router: {
    location: {
      pathname:
        '/senior/senior-042ec8bb092f4442b65fb8705f82f324/1fc17069353f4da7b15f632748b429ed/America-Los_Angeles/care-insights/message-manager',
      search: '',
      hash: '',
      key: 'kqegmf',
      query: {},
    },
    action: 'POP',
  },
  applicationLoader: {show: false, text: '', loadingApp: false},
  toast: {type: 'success', message: '', duration: 4000, open: false},
  callEntry: {callEntryData: []},
  common: {
    currentTableData: {data: [], lastEvaluatedKey: '', loadingStatus: 0},
    dialog: {isOpen: false, type: '', isFailButton: true, data: {}},
    seniorDetail: {
      basicInfo: {
        user_id: '',
        height: {feet: '', inch: ''},
        weight: '',
        address: {state: '', city: '', street: '', zipcode: '', timezone: ''},
        academic_level: '',
        career: '',
        primary_spoken_language: '',
        other_spoken_language: '',
        preferred_name: '',
        home_phone: '',
        emergency_phone: null,
        email: '',
        faith: '',
        other_faith: null,
        home_technology: '',
        home_gate_code: '',
        race: '',
        other_race: null,
        pets: [],
        other_pets: '',
        social_media_links: [],
        life_event: '',
        lock_box_code: '',
        created_date: '',
      },
      minimalInfo: {
        name: {first_name: '', last_name: '', middle_name: ''},
        mobile_number: '',
        gender: '',
        dob: '',
        user_id: '',
        account_id: '',
        created_date: '',
        email: '',
      },
      isLoading: true,
    },
    profilePic: {format: '', image: ''},
  },
  wellnessDashboard: {
    currentState: 'day',
    startTime: '',
    endTime: '',
    reRender: false,
    sleepStartTime: null,
    sleepEndTime: null,
  },
  seniorCallScheduler: {checkCallScheduledMessage: ''},
  seniorDashboard: {
    wellnessSurvey: {
      allSurveys: [],
      surveyHeaders: [],
      loading: 0,
      fromDate: '',
      toDate: '2022-02-24T06:51:13.430Z',
      isDateError: false,
      totalRows: 0,
      lastEvaluatedKey: '',
      currentPage: 1,
    },
    careInsightHistory: {data: [], loading: false},
  },
  profileInfo: {
    isEmailExists: null,
    isPhoneExists: null,
    errorEmailMessage: '',
    errorNumberMessage: '',
  },
  seniorCareInsights: {
    thresholds: {vitals: {active: [], inactive: []}, selectedVital: null},
  },
  events: {summary: {}, alert: {}, sos: {}, fallDetection: {}},
  messageManager: {
    careInsightHistory: [],
    careInsightSubHistory: {},
    isPaginate: true,
  },
};

export const commonStateData = {
  seniorDetail: {
    basicInfo: {
      user_id: 'senior-33246c5ba7234859a52006df7e0a4645',
      height: {
        feet: '4.0',
        inch: '10.0',
      },
      weight: '137.0',
      address: {
        state: 'GA',
        city: 'Sacramento',
        street: 'None',
        zipcode: '94203',
        timezone: 'America/Los_Angeles',
        radius: {
          value: '670.0',
          radius_measurement: 'feet',
        },
        coordinates: {
          latitude: '-40.7013287',
          longitude: '-121.0813535',
        },
      },
      academic_level: 'Bachelor Degree',
      career: 'engineer',
      primary_spoken_language: 'Hindi',
      other_spoken_language: 'English',
      preferred_name: 'Tannu',
      home_phone: null,
      emergency_phone: '1111111111',
      email: null,
      faith: 'Hindu',
      other_faith: null,
      home_technology: 'Unknown',
      home_gate_code: '543423',
      race: null,
      other_race: 'Indian',
      pets: [{0: 'Dogs'}],
      other_pets: null,
      social_media_links: [{0: 'insta.com'}, {1: 'www.google.com'}],
      life_event: 'SomeEvent',
      lock_box_code: null,
      created_date: '2021-05-05T16:29:09.640906+00:00',
    },
    minimalInfo: {
      name: {
        first_name: 'Jeff',
        last_name: 'Barbieri',
        middle_name: null,
      },
      mobile_number: '8966894974',
      gender: 'Female',
      dob: '1997-08-11T00:00:00+00:00',
      user_id: 'senior-33246c5ba7234859a52006df7e0a4645',
      account_id: '0b0bdebe65c34269915d61bde3486267',
      created_date: '2021-05-06T21:26:47.166113+00:00',
      email: 'senior-33246c5ba7234859a52006df7e0a4645-fake.senior.vimient.com',
      address: {
        state: 'GA',
        city: 'Sacramento',
        street: 'None',
        zipcode: '94203',
        timezone: 'America/Los_Angeles',
        radius: {
          value: '670.0',
          radius_measurement: 'feet',
        },
        coordinates: {
          latitude: '-40.7013287',
          longitude: '-121.0813535',
        },
      },
    },
    isLoading: false,
    nameInitials: 'J B',
  },
  profilePic: {
    format: 'jpeg',
    image:
      // eslint-disable-next-line max-len
      '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',
  },
  seniorLocation: {
    atHome: 0,
    currentCoordinates: {
      latitude: null,
      longitude: null,
    },
    timeAwayFromHome: 0,
    historyData: [],
  },
};

export const seniorDashboardStateData = {
  wellnessSurvey: {
    allSurveys: [
      {
        survey_id: 'ea89400872f646bb9eebeaf4540e0a5d',
        account_id: '0b0bdebe65c34269915d61bde3486267',
        senior_id: 'senior-33246c5ba7234859a52006df7e0a4645',
        careagent_id: 'careagent-929eb5d99fa24eeabe2b4b2fddede5f9',
        survey_date: '2022-02-01T00:00:00-08:00',
        survey_date_timezone: '-08:00',
        form_version: 'v1',
        answer: {
          engagement: {
            measurement_name: 'Busy/Engaged',
            value: 'low',
            comment: 'Sed iste et et voluptatem commodi.',
          },
          happiness: {
            measurement_name: 'Sad/Depressed',
            value: 'low',
            comment: 'Wyman - Kuphal',
          },
          purpose: {
            measurement_name: 'Sense of Purpose',
            value: 'low',
            comment: 'McDermott - Stamm',
          },
          social: {
            measurement_name: 'Socially Active/Fulfilled',
            value: 'low',
            comment:
              'Ea labore quam animi. Consectetur et et inventore eveniet quod quaerat. Sed omnis quam animi perferendis commodi assumenda. Et temporibus quia.',
          },
          relax: {
            measurement_name: 'Relaxed/Calm',
            value: 'low',
            comment:
              'Id sed non et at suscipit magni corporis quo. Quo sed doloremque laborum doloribus ducimus. Sit cumque et. Facilis dolore odio nemo harum ab sunt accusamus aliquam.',
          },
          comfort: {
            measurement_name: 'Feeling Good/Content',
            value: 'low',
            comment:
              'Assumenda ad magnam voluptates iste sint consequuntur consequatur facere. Non eum nobis sunt voluptas aperiam eos. Unde aut provident omnis nam consequuntur. Laborum qui quis et natus accusantium sed nostrum. Enim est voluptas perferendis assumenda quo qui a eos. Repellat maiores maiores qui temporibus adipisci.',
          },
          energy: {
            measurement_name: 'Tired/Fatigued',
            value: 'medium',
            comment: 'Non maxime vel esse exercitationem adipisci cum commodi.',
          },
        },
        created_date: '2022-02-01T09:35:31.762599+00:00',
        modification_date: '2022-06-22T08:34:55.518549+00:00',
        is_survey_completed: true,
        score: 5,
        scoreLimit: 7,
      },
    ],
    surveyHeaders: [],
    loading: 2,
    fromDate: '2021-05-07T00:00:00+05:30',
    toDate: '2022-06-22T08:34:53.439Z',
    isDateError: false,
    totalRows: -2,
    lastEvaluatedKey: null,
    currentPage: 1,
  },
  careInsightHistory: {},
};

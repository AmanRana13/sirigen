import {useState, useEffect} from 'react';
import {useAppDispatch} from 'hooks/reduxHooks';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment-timezone';

import {getCurrentSenior} from 'globals/global.functions';

import HeartRate from './components/HeartRate';
import Sleep from './components/Sleep';
import Activity from './components/Activity';
import BodyHealth from './components/BodyHealth';
import {SET_CURRENT_STATE, RE_RENDER_GRAPH} from './WellnessDashboard.types';
import {wellnessDashboardStyle} from './WellnessDashboard.style';
import {useLocation} from 'react-router-dom';
import {FacilityThemeProvider} from 'themes';

const WellnessDashboard = (props: any) => {
  const location = useLocation();
  const {classes} = wellnessDashboardStyle();
  const dispatch: any = useAppDispatch();
  const [expanded, setExpanded] = useState('');

  if (expanded === 'sleep') {
    const seniorInfo = {...getCurrentSenior()};
    moment.tz.setDefault(seniorInfo.timezone);
  } else {
    moment.tz.setDefault(moment.tz.guess());
  }

  useEffect(() => {
    const initialExpanded = getQueryParam('initialExpand') || '';
    setExpanded(initialExpanded);
    return () => {
      moment.tz.setDefault(moment.tz.guess());
      dispatch({type: SET_CURRENT_STATE, currentState: 'day'});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (panel: any) => () => {
    if (expanded !== panel) {
      dispatch({type: RE_RENDER_GRAPH, value: false});
      dispatch({type: SET_CURRENT_STATE, currentState: 'day'});
      setExpanded(panel);
    } else {
      setExpanded('');
    }
  };

  const getQueryParam = (param: any) => {
    const query = new URLSearchParams(location.search);
    return query.get(param);
  };

  const wellnessComponent = [
    {
      id: 'heart_rate',
      title: 'Wellness Sign',
      component: <HeartRate />,
    },
    {
      id: 'body_health',
      title: 'Body Health',
      component: <BodyHealth />,
    },
    {
      id: 'activity',
      title: 'Activity',
      component: <Activity />,
    },
    {
      id: 'sleep',
      title: 'Sleep',
      component: <Sleep />,
    },
  ];
  return (
    <FacilityThemeProvider>
      {wellnessComponent.map((data) => (
        <Accordion
          key={data.title}
          className={classes.accordianRoot}
          expanded={expanded === data.id}
          onChange={handleChange(data.id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel1a-content-${data.id}`}
            id={`panel-header-${data.id}`}>
            <Typography className={classes.title}>{data.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {expanded === data.id && data.component}
          </AccordionDetails>
        </Accordion>
      ))}
    </FacilityThemeProvider>
  );
};

export default WellnessDashboard;

import React, {useEffect, useState} from 'react';
import {Box, Tooltip, useTheme} from '@mui/material';
import {withStyles} from 'tss-react/mui';
import moment from 'moment-timezone';

const SleepCycle = ({graphData}: any) => {
  const theme: any = useTheme();
  const [dataPoints, setDataPoints] = useState<any>();
  const [shownTooltips, setShownTooltips] = useState<any>({});
  const [sleepPhaseDuration, setSleepPhaseDuration] = useState<any>('');

  useEffect(() => {
    setDataPoints(createGraph(graphData));
  }, [graphData]);

  const createGraph = (data: any) => {
    const sleepPhasesRawData = data;
    let phases = [
      {
        name: 'awake',
        count: 1,
        height: 88,
      },
      {
        name: 'light',
        count: 1,
        height: 36,
      },
      {
        name: 'deep',
        count: 1,
        height: 16,
      },
      {
        name: 'rem',
        count: 1,
        height: 64,
      },
      {
        name: 'no_reading',
        count: 1,
        height: 88,
      },
      {
        name: 'cycle_break',
        count: 1,
        height: 0,
      },
    ];
    let sleepPhases: any = {};
    let allSleepPhasesObj: any = {};
    Object.entries(sleepPhasesRawData).forEach(
      ([key, value]: any, index: any) => {
        const sleepCycle = value.measurement;
        if (index > 0) {
          //Subtracting 1 minute from start time
          const cycleBreakTime: any = key - (1 * 60 * 1000) / 0.000001;
          //Adding Cycle Break
          allSleepPhasesObj[cycleBreakTime] = {
            time: parseInt(cycleBreakTime),
            phase: 5,
          };
        }
        sleepCycle.forEach((sleepPhaseData: any) => {
          sleepPhaseData.measurements.forEach((measurement: any) => {
            allSleepPhasesObj[measurement.time] = measurement;
          });
        });
      },
    );
    let sleepPhasesObj: any = {};
    let currentPhaseKey: any = null;
    let currentPhase: any = null;
    let previousPhase: any = null;

    const allSleepPhasesArray = Object.keys(allSleepPhasesObj);
    const sleepStartTimestamp = parseInt(allSleepPhasesArray[0]);
    const sleepEndTimestamp = parseInt(
      allSleepPhasesArray[allSleepPhasesArray.length - 1],
    );

    const startTime = moment(sleepStartTimestamp * 0.000001);
    const endTime = moment(sleepEndTimestamp * 0.000001);

    while (endTime.diff(startTime, 'minutes') >= 0) {
      const timestamp = (startTime.valueOf() * 1000000).toString();

      let currentSleepReading = null;
      if (timestamp in allSleepPhasesObj) {
        currentSleepReading = allSleepPhasesObj[timestamp];
        currentPhase = currentSleepReading.phase;
      } else {
        currentPhase = 4;
        currentSleepReading = {
          time: parseInt(timestamp),
          phase: 4,
        };
      }

      if (null === previousPhase) {
        previousPhase = currentPhase;
      }

      currentPhaseKey = `${phases[currentPhase].name}${phases[currentPhase].count}`;

      if (currentPhase !== previousPhase) {
        phases[currentPhase].count = phases[currentPhase].count + 1;
        currentPhaseKey = `${phases[currentPhase].name}${phases[currentPhase].count}`;
      }

      if (sleepPhasesObj[currentPhaseKey]) {
        sleepPhasesObj[currentPhaseKey].push(currentSleepReading);
      } else {
        sleepPhasesObj[currentPhaseKey] = [currentSleepReading];
      }

      previousPhase = currentPhase;
      startTime.add(1, 'minutes');
    }

    let readingX = 0;
    sleepPhases.data = Object.keys(sleepPhasesObj).map((key) => {
      const sleepPhasesArray = sleepPhasesObj[key];

      const startTimeSleepPhase = sleepPhasesArray[0].time * 0.000001;
      const endTimeSleepPhase =
        sleepPhasesArray[sleepPhasesArray.length - 1].time * 0.000001;

      const duration = moment.duration(
        moment(endTimeSleepPhase).diff(moment(startTimeSleepPhase)),
      );

      const sleepPhaseIndex = sleepPhasesArray[0].phase;

      let sleepPhaseObj = {
        sleepPhase: key,
        sleepPhaseIndex,
        startTime: startTimeSleepPhase,
        endTime: endTimeSleepPhase,
        readingX,
        sleepPhaseDuration: duration.asMinutes(),
        barWidth: sleepPhasesArray.length,
        barHeight: phases[sleepPhaseIndex].height,
      };
      readingX = readingX + sleepPhasesArray.length + 1;
      return sleepPhaseObj;
    });

    let sleepStartBarIndex = 0;
    sleepPhases.data.find((sleepPhase: any, index: any) => {
      sleepStartBarIndex = index;
      return sleepPhase.sleepPhaseIndex === 0;
    });

    let sleepEndBarIndex = 0;
    const lastSleepPhase = sleepPhases.data
      .slice()
      .reverse()
      .find((sleepPhase: any, index: any) => {
        sleepEndBarIndex = index;
        return (
          sleepPhase.sleepPhaseIndex !== 0 && sleepPhase.sleepPhaseIndex !== 4
        );
      });

    sleepPhases.sleepStartBarIndex = sleepStartBarIndex;

    const lastIndex = sleepPhases.data.length - 1;
    sleepPhases.sleepEndBarIndex = lastIndex - sleepEndBarIndex;

    const startSleepPhase = sleepPhases.data.find(
      (sleepPhase: any) => sleepPhase.sleepPhaseIndex !== 0,
    );

    const sleepStart = startSleepPhase?.startTime;
    sleepPhases.sleepStart = moment(sleepStart).format('hh:mm A');

    const sleepEnd = lastSleepPhase?.endTime;
    sleepPhases.sleepEnd = moment(sleepEnd).format('hh:mm A');

    const diffDuration = moment.duration(
      moment(sleepEnd).diff(moment(sleepStart)),
    );

    const hours = Math.floor(diffDuration.asHours());
    const mins = Math.floor(diffDuration.asMinutes()) - hours * 60;
    sleepPhases.durationTotal = `${hours}h${mins}m`;

    sleepPhases.durationInMins = hours * 60 + mins;
    return sleepPhases;
  };

  const toggleTooltip = (id: any, sleepStart: any, sleepEnd: any) => {
    setShownTooltips((prevShownTooltips: any) => ({
      [id]: !prevShownTooltips[id],
    }));

    setSleepPhaseDuration(getSleepPhaseDuration(sleepStart, sleepEnd));
  };

  const getSleepPhaseDuration = (sleepStart: any, sleepEnd: any) =>
    `${moment(sleepStart).format('hh:mm A')} - ${moment(sleepEnd).format(
      'hh:mm A',
    )}`;

  const commonColors: any = {
    0: theme.palette.customColor.sleepGrey,
    1: theme.palette.customColor.remGreen,
    2: theme.palette.customColor.moderateGreen,
    3: theme.palette.customColor.intenseGreen,
  };
  const sleepPhaseColors: any = {
    ...commonColors,
    default: theme.palette.customColor.sleepGrey,
  };

  const sleepPhaseLabels: any = {
    1: 'LIGHT',
    2: 'DEEP',
    3: 'REM',
    4: 'INTERUPPTION',
    default: 'AWAKE',
  };

  const colors: any = {
    ...commonColors,
    4: (index: number, data: any) =>
      data[index + 1]?.sleepPhaseIndex == 5
        ? theme.palette.common.white
        : theme.palette.customColor.sleepGrey,
  };
  return (
    <Box
      style={{
        flex: 1,
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
      data-testid='sleep-cycle-graph'>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Box
          style={{
            color: theme.palette.customColor.info,
          }}>
          {dataPoints && dataPoints.sleepStart}
        </Box>
        <Box
          style={{
            color: theme.palette.customColor.info,
          }}>
          {dataPoints && dataPoints.sleepEnd}
        </Box>
      </Box>

      {dataPoints && dataPoints.data.length > 0 && (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingBottom: 8,
            paddingTop: 57,
          }}>
          {dataPoints.data.map((sleepPhase: any, index: any) => {
            return (
              <CustomTooltip
                key={`phase${sleepPhase.endTime}`}
                title={
                  sleepPhase.sleepPhaseIndex === 4 &&
                  dataPoints.data[index + 1]?.sleepPhaseIndex == 5 ? (
                    ''
                  ) : (
                    <Box
                      style={{
                        alignItems: 'center',
                        padding: 8,
                      }}>
                      <Box
                        style={{
                          fontSize: 12,
                          color: theme.palette.customColor.info,
                        }}>
                        {sleepPhaseDuration}
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 6,
                        }}>
                        <Box
                          style={{
                            backgroundColor:
                              sleepPhaseColors[sleepPhase.sleepPhaseIndex] ||
                              sleepPhaseColors.default,
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginRight: 4,
                          }}></Box>
                        <Box
                          style={{
                            fontSize: 12,
                            color: theme.palette.customColor.info,
                          }}>
                          {sleepPhaseLabels[sleepPhase.sleepPhaseIndex] ||
                            sleepPhaseLabels.default}
                        </Box>
                      </Box>
                    </Box>
                  )
                }
                placement='top'
                onOpen={() => {
                  toggleTooltip(
                    sleepPhase.sleepPhase,
                    sleepPhase.startTime,
                    sleepPhase.endTime,
                  );
                }}
                disableFocusListener={sleepPhase.barHeight == 0}
                disableTouchListener={sleepPhase.barHeight == 0}
                disableHoverListener={sleepPhase.barHeight == 0}
                arrow>
                <Box
                  // activeOpacity={1}
                  style={{
                    width: `${
                      (sleepPhase.sleepPhaseDuration * 100) /
                      dataPoints.durationInMins
                    }%`,
                  }}>
                  <Box
                    style={{
                      position: 'relative',
                      zIndex: 999,
                    }}>
                    <Box
                      style={{
                        height: 100 - sleepPhase.barHeight + 10,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Box
                        style={{
                          flex: 1,

                          borderRightWidth: shownTooltips[sleepPhase.sleepPhase]
                            ? 0.5
                            : 0,
                        }}></Box>
                      <Box
                        style={{
                          flex: 1,

                          borderLeftWidth: shownTooltips[sleepPhase.sleepPhase]
                            ? 0.5
                            : 0,
                        }}></Box>
                    </Box>
                    <Box
                      style={{
                        height: sleepPhase.barHeight,
                        backgroundColor:
                          typeof colors[sleepPhase.sleepPhaseIndex] ===
                          'function'
                            ? colors[sleepPhase.sleepPhaseIndex](
                                index,
                                dataPoints.data,
                              )
                            : colors[sleepPhase.sleepPhaseIndex],
                      }}></Box>
                  </Box>
                </Box>
              </CustomTooltip>
            );
          })}
        </Box>
      )}

      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <BottomLabel
          color={theme.palette.customColor.sleepGrey}
          title='Awake'
        />
        <BottomLabel color={theme.palette.customColor.remGreen} title='Rem' />
        <BottomLabel
          color={theme.palette.customColor.moderateGreen}
          title='Light Sleep'
        />
        <BottomLabel
          color={theme.palette.customColor.intenseGreen}
          title='Deep Sleep'
        />
      </Box>
    </Box>
  );
};

const BottomLabel = ({title, color}: any) => (
  <Box style={{display: 'flex', flexDirection: 'row'}}>
    <Box
      style={{
        backgroundColor: color,
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 4,
      }}></Box>
    <Box>{title}</Box>
  </Box>
);

const CustomTooltip = withStyles(Tooltip, (theme: any) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: theme.typography.toolTipFontSize,
    backgroundColor: theme.palette.common.white,
  },
  arrow: {
    '&::before': {
      backgroundColor: theme.palette.common.white,
      border: `1px solid ${theme.palette.customColor.smokeGrey}`,
    },
  },
}));
export {SleepCycle};

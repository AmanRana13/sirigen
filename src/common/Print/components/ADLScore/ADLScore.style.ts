import {makeStyles} from 'tss-react/mui';

export const adlScoreStyles = makeStyles()(() => ({
  aldScore: {},
  scoreBox: {
    padding: '30px',
    borderRadius: '10px',
    border: 'solid 1px #c9c9c9',
    backgroundColor: '#fff',
    lineHeight: 0.73,
    width: 'fit-content',
    marginBottom: '12px',
  },
  scoreLabel: {
    fontWeight: 500,
    paddingRight: '20px',
    color: '#0186a5',
  },
  scoreInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: '20px',
    lineHeight: 1.28,
  },
  '@media print': {
    adlScore: {
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
    },
  },
}));

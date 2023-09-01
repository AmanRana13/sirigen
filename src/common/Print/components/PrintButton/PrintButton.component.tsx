import {Button, ButtonProps} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import {IPrintButtonProps} from './PrintButton.types';
import {useAppSelector} from 'hooks/reduxHooks';

export const printIt = () => {
  setTimeout(() => {
    const css = `
            @page {
                size: 2480px 3508px;
                margin: 0;
            }
            html,
            body,
            table,
            tr,
            td {
                margin: 0;
                padding: 0;
                border: none;
                width: 100%;
            }

            @media print {
                body {
                    background: #fff !important;
                }
                .printHide {
                    display: none;
                }
                .page-header, .page-footer {
                    display: initial;
                }
                .page-table {
                    display: table;
                }
                thead {display: table-header-group;} 
                tfoot {display: table-footer-group;}
            }
        `;
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');

    style.media = 'print';
    style.appendChild(document.createTextNode(css));

    head.appendChild(style);
    window.print();
    head.removeChild(style);
  }, 1);
};

const DefaultButtonUI = (props: ButtonProps) => (
  <Button
    variant='contained'
    color='primary'
    sx={{
      borderRadius: '1.5rem',
      color: 'white',
      padding: '0.25rem 1rem',
      fontWeight: '700',
    }}
    {...props}
    data-testid='print-button'>
    <PrintIcon style={{marginRight: '0.75rem'}} />
    Print
  </Button>
);

const PrintButton = (props: IPrintButtonProps) => {
  // can pass Button UI component for customization.
  // can pass show key to show it independent of redux state.
  const {component: ButtonUI = DefaultButtonUI, show = false} = props;
  const showButton = useAppSelector((state: any) => state.print.showButton);
  return showButton || show ? <ButtonUI onClick={printIt} /> : <></>;
};

export default PrintButton;

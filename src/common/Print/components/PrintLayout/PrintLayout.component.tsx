import {FC, PropsWithChildren} from 'react';
import Footer from '../Footer/Footer.component';
import './PrintLayout.style.css';
import {IPrintLayoutProps} from './PrintLayout.types';

const PrintLayout: FC<PropsWithChildren<IPrintLayoutProps>> = (props) => {
  const {header: HeaderContent, children} = props;
  return (
    <>
      <div className='page-header'>{HeaderContent}</div>
      <div className='page-footer'>
        <Footer />
      </div>
      <table className='page-table'>
        <thead className='page-table-head'>
          <tr>
            <td>
              <div className='page-header-space'>{HeaderContent}</div>
            </td>
          </tr>
        </thead>
        <tbody className='page-table-body'>
          <tr>
            <td>
              <div className='page-content' data-testid='print-layout'>
                {children}
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot className='page-table-foot'>
          <tr>
            <td>
              <div className='page-footer-space'>
                <Footer />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default PrintLayout;

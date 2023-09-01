import Header from 'common/Header/Header.component';
import {Outlet} from 'react-router-dom';
import {WCThemeProvider} from 'themes';

const PublicLayout = () => {
  return (
    <WCThemeProvider>
      <Header showMenu={false} />
      <Outlet />
    </WCThemeProvider>
  );
};

export {PublicLayout};

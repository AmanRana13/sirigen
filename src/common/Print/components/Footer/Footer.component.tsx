import {footerStyles} from './Footer.style';

const Footer = () => {
  const {classes} = footerStyles();
  const year = new Date().getFullYear();
  return (
    <div className={classes.footer} data-testid='print-footer'>
      © {year} Vimient, LLC. All Rights Reserved.
    </div>
  );
};

export default Footer;

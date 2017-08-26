import VENDOR_PREFIXES from '../../constants/vendorPrefixes.js';

const VENDORS = [
  VENDOR_PREFIXES.WEBKIT,
  VENDOR_PREFIXES.MOZILLA,
  VENDOR_PREFIXES.IE,
  ''
];

class UserSelect {
  constructor(element, value = 'none') {

    VENDORS.forEach(vendor => {
      element.style[`${vendor}user-select`] = value;
    });

  }
}

export default UserSelect;



function setUserSelect(element, value) {
  VENDORS.forEach(vendor => {
    element.style[`${vendor}user-select`] = value;
  });
};